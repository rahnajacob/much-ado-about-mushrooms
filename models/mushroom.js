//IMPORT
const mongoose = require("mongoose")

//SCHEMA
const mushroomSchema = new mongoose.Schema({
    sciName: {
        type: String,
        required: [true, "Please enter the scientic name."]
    },
    comName: {
        type: String,
        required: [true, "Please enter the common name."]
    },
    edibility: {
        type: String,
        enum: ["edible", "selectively-edible", "inedible/toxic", "unknown"],
        required: [true, "Please select the edibility."]
    },
    image: {
        type: String, //change for image upload stretch goal
        required: [true, "Please link an image of the mushroom."]
    },
    description: {
        type: String
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    favouritedByUsers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }
    ]
})

//MODEL
const Mushroom = mongoose.model("Mushroom", mushroomSchema)

//EXPORT
module.exports = Mushroom