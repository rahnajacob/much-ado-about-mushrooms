//IMPORTS
const dotenv = require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const methodOverride = require("method-override")
const morgan = require("morgan")
const session = require("express-session")
const mongoStore = require("connect-mongo")
const multer = require('multer') //part of image upload stretch
const passUserToView = require("./middleware/pass-user-to-view.js");


//CONTROLLERS
const authController = require("./controllers/auth.js")
const mushController = require("./controllers/mushroom.js")

//CONSTANTS
const app = express()
const port = process.env.PORT ? process.env.PORT : "3000"
const upload = multer({ dest: 'uploads/' }) //part of image upload stretch

//MIDDLEWARE
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride("_method"))
app.use(morgan("dev"))
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
app.get("/", (req, res) => { //landing page
    res.render("index.ejs", {
        user: req.session.user
    })
})

app.use("/auth", authController)

app.use("/mushrooms", mushController)

app.get("*", (req, res) => { //404 page
    res.render("404.ejs")
})

//SERVER CONNECTIONS
const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("MongoDB connected")
        app.listen((process.env.PORT), () => {
            console.log(`Port ${port} running`)
        })
    } catch (err) {
        console.log(err.message)
    }
}

connect()