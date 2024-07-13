//IMPORT
const mongoose = require("mongoose")

//SCHEMA
const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please enter a username."]
    },
    password: {
        type: String,
        required: [true, "Please enter a password."],
        minLength: [6, "Minimun length is 6 characters."]
    }
})

//MODEL
const User = mongoose.model("User", userSchema)

//EXPORT
module.exports = User