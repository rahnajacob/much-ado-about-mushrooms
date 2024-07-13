//IMPORTS
const express = require("express")
const router = express.Router()
// const IsSignedIn = require("../middleware/is-signed-in.js")


//MODEL
const Mushroom = require("../models/mushroom.js")

//ROUTES
//Mushrooms index
router.get("/", async (req, res) => {
    try {
        res.render("mushrooms/index.ejs")
    } catch (error) {
        console.log(error)
        res.redirect("/")
    }
})



//EXPORT
module.exports = router