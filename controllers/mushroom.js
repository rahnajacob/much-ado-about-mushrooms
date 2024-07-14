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
router.get("/:mushroomId", async (req, res) => {
    try {
        const mushroomId = req.params.mushroomId
        const mushroom = await Mushroom.findById(req.params.mushroomId)
        if (!mushroom){
            const error = new Error("Mushroom not found!")
            error.status = 404
            throw error
        }
        res.render("mushrooms/show.ejs", {mushroom: mushroom})
    } catch (error) {
        console.log(error.message)
        if (error.status === 404) {
            return res.render("404.ejs")
        }
        res.redirect("/")
    }
})

//Edit mushroom(form + put route)
//Delete route




//EXPORT
module.exports = router