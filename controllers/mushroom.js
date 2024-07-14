//IMPORTS
const express = require("express")
const router = express.Router()

//MODEL
const Mushroom = require("../models/mushroom.js")

//ROUTES
//Mushrooms index
router.get("/", async (req, res) => {
    try {
        const mushrooms = await Mushroom.find()
        res.render("mushrooms/index.ejs", {mushrooms: mushrooms})
    } catch (error) {
        console.log(error)
        res.redirect("/")
    }
})

//New mushroom (form + POST route)
router.get("/new", (req, res) => {
    if (!req.session.user) {
        return res.redirect("/auth/sign-in")
    }
    try {
        res.render("mushrooms/new.ejs")
    } catch (error) {
        console.log(error.message)
        res.redirect("/")
    }
})

router.post("/", async (req, res) => {
    try {
        req.body.owner = req.session.user._id
        await Mushroom.create(req.body)
        res.redirect("/mushrooms")
    } catch (error) {
        console.log(error.message)
        res.redirect("/listings/new.ejs", {errorMessage: error.message})
    }
})

//Show route


//Edit mushroom(form + put route)
//Delete route




//EXPORT
module.exports = router