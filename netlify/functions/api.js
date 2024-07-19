//IMPORTS
const dotenv = require("dotenv").config()
const serverless = require('serverless-http');
const express = require("express")
const mongoose = require("mongoose")
const methodOverride = require("method-override")
const morgan = require("morgan")
const session = require("express-session")
const mongoStore = require("connect-mongo")
const multer = require('multer') //part of image upload stretch
const passUserToView = require("../../middleware/pass-user-to-view.js");
const IsSignedIn = require("../../middleware/is-signed-in.js");
const Mushroom = require("../../models/mushroom.js")

//CONTROLLERS
const authController = require("../../controllers/auth.js")
const mushController = require("../../controllers/mushroom.js")

//CONSTANTS
const app = express()
const port = process.env.PORT ? process.env.PORT : "3000"
const path = require('path')
const upload = multer({ dest: 'uploads/' }) //part of image upload stretch

//MIDDLEWARE
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride("_method"))
app.use(morgan("dev"))
app.use(express.static("public"));
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        store: mongoStore.create({
            mongoUrl: process.env.MONGODB_URI
        })
    })
)
app.use(passUserToView)

//ROUTES
app.get("/", async (req, res) => { //landing page
    const mushrooms = await Mushroom.find()
    res.render("index.ejs", {
        user: req.session.user,
        mushrooms: mushrooms
    })
})

app.use("/auth", authController)

app.use("/mushrooms", IsSignedIn, mushController)

app.get("/references", (req, res) => {
    res.render("references.ejs")
})

app.get("*", (req, res) => { //404 page
    res.render("404.ejs")
})

//SERVER CONNECTIONS
const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("MongoDB connected")
        module.exports.handler = serverless(app);
    } catch (err) {
        console.log(err.message)
    }
}

connect()