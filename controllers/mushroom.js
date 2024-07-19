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
        res.render("mushrooms/index.ejs", { mushrooms: mushrooms })
    } catch (error) {
        // console.log(error)
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
        // console.log(error.message)
        res.redirect("/")
    }
})

router.post("/", async (req, res) => {
    try {
        req.body.owner = req.session.user._id
        await Mushroom.create(req.body)
        res.redirect("/mushrooms")
    } catch (error) {
        // console.log(error.message)
        res.redirect("/listings/new.ejs", { errorMessage: error.message })
    }
})

//Show route
router.get("/:mushroomId", async (req, res) => {
    try {
        const mushroomId = req.params.mushroomId
        const mushroom = await Mushroom.findById(req.params.mushroomId)
        if (!mushroom) {
            const error = new Error("Mushroom not found!")
            error.status = 404
            throw error
        }
        if (req.session.user) {
            const userHasFavourited = mushroom.favouritedByUsers.some(objectId => {
                return objectId.equals(req.session.user._id)
            })
            res.render("mushrooms/show.ejs", { mushroom: mushroom, userHasFavourited: userHasFavourited })
        } else {
            res.render("mushrooms/show.ejs", { mushroom: mushroom })
        }
    } catch (error) {
        // console.log(error.message)
        if (error.status === 404) {
            return res.render("404.ejs")
        }
        res.redirect("/")
    }
})

//Edit mushroom(form + put route)
router.get("/:mushroomId/edit", async (req, res) => {
    try {
        const mushroom = await Mushroom.findById(req.params.mushroomId)
        if (!mushroom) throw new Error("Mushroom not found!")

        if (mushroom.owner.equals(req.session.user._id)) {
            res.render("mushrooms/edit.ejs", { mushroom: mushroom })
        } else {
            res.redirect(`/mushrooms/${mushroom._id}`)
        }
    } catch (error) {
        // console.log(error.message)
        res.redirect("/mushrooms")
    }
})

router.put("/:mushroomId", async (req, res) => {
    try {
        const mushToUpdate = await Mushroom.findById(req.params.mushroomId)
        if (!mushToUpdate) throw new Error("Mushroom not found!")

        if (mushToUpdate.owner.equals(req.session.user._id)) {
            await mushToUpdate.updateOne(req.body)
            res.redirect(`/mushrooms/${mushToUpdate._id}`)
        } else {
            res.send("You do not have permission to update this!")
            res.redirect(`/mushrooms/${mushToUpdate._id}`)
        }
    } catch (error) {
        // console.log(error.message)
        res.redirect("/mushrooms")
    }
})

//Delete route
router.delete("/:mushroomId", async (req, res) => {
    try {
        const mushroomId = req.params.mushroomId
        const mushToDelete = await Mushroom.findById(mushroomId)
        if (mushToDelete.owner.equals(req.session.user._id)) {
            await mushToDelete.deleteOne()
            res.redirect("/mushrooms")
        } else {
            res.send("You do not have permission to delete this!")
            res.redirect("/mushrooms")
        }
    } catch (error) {
        // console.log(error.message)
        res.redirect("/")
    }
})

//Favourites route
router.post("/:mushroomId/favourited-by/:userId", async (req, res) => {
    if (!req.session.user) {
        return res.render(`mushrooms/${req.params.mushroomId}`)
    }
    try {
        const mushroomId = req.params.mushroomId
        const updatedMush = await Mushroom.findByIdAndUpdate(mushroomId, {
            $push: { favouritedByUsers: req.session.user._id },
        })
        res.redirect(`/mushrooms/${req.params.mushroomId}`)
    } catch (error) {
        // console.log(error);
        res.redirect('/mushrooms');
    }
});

//Unfavourite route
router.delete("/:mushroomId/favourited-by/:userId", async (req, res) => {
    try {
        const mushroomId = req.params.mushroomId
        await Mushroom.findByIdAndUpdate(mushroomId, {
            $pull: { favouritedByUsers: req.session.user._id },
        })
        res.redirect(`/mushrooms/${req.params.mushroomId}`)
    } catch (error) {
        // console.log(error.message)
        res.redirect("/mushrooms")
    }
})

//EXPORT
module.exports = router