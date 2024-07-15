//IMPORTS
const mongoose = require("mongoose")
const dotenv = require("dotenv").config()

//MODELS
const User = require("../models/user.js")
const Mushroom = require("../models/mushroom.js")

//DATA
const userData = require("./data/users.js")
const mushroomData = require("./data/mushrooms.js")

const seedDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        const deletedUsers = await User.deleteMany()
        const deletedMushrooms = await Mushroom.deleteMany()
    } catch (error) {
        console.log(error.message)
    }
}

seedDatabase()