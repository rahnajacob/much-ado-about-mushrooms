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
        const users = await User.create(userData)
        const mushWithOwners = mushroomData.map(mushroom => {
            mushroom.owner = users[Math.floor(Math.random() * users.length)]._id
            mushroom.favouritedByUsers = []
            const favouritedNum = Math.floor(Math.random() * users.length)
            for (let i = 0; i < favouritedNum; i++) {
                mushroom.favouritedByUsers.push(users[Math.floor(Math.random() * users.length)]._id)
            }
            mushroom.favouritedByUsers = [...new Set(mushroom.favouritedByUsers)]
            return mushroom
        })
        console.log(`${mushWithOwners.length} mush added`)
        const mushrooms = await Mushroom.create(mushWithOwners)
        await mongoose.connection.close()
        console.log("Seed conn closed")
    } catch (error) {
        console.log(error.message)
        await mongoose.connection.close()
    }
}

seedDatabase()