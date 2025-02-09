// Schema for Dogs

//imports
const mongoose = require("mongoose")

const dogSchema = new mongoose.Schema({
    name: String,
    breed: String,
    // gender: Boolean,        // true === male, false === female
    // petPeevs: String,    // test with subPetPeeves or habbits

})

const Dog = mongoose.model("Dog", dogSchema)

module.exports = Dog;