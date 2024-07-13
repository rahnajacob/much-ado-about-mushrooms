//IMPORTS
const express = require("express")
const bcryptjs = require("bcryptjs")
const router = express.Router()

//MODEL
const User = require("../models/user.js")

//ROUTES

//Sign Up (Form + Post)
router.get("/sign-up", (req, res) => {
res.render("auth/sign-up.ejs")
})

router.post("/sign-up", async (req, res) => {
    try { 
        const userInDataBase = await User.findOne({username: req.body.username})
        if (userInDataBase) {
            return res.send("Username already taken!")
        }
        if (req.body.password !== req.body.confirmPassword) {
            return res.send("Passwords must match.")
        }

        const hashedPassword = bcryptjs.hashSync(req.body.password, 12)
        req.body.password = hashedPassword

        await User.create(req.body)

        res.redirect("/auth/sign-in")
    } catch (error) {
        console.log(error.message)
        res.redirect("/")
    }
})



















//EXPORT
module.exports = router