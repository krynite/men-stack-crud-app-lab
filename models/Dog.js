// Schema for Dogs

//imports
const mongoose = require("mongoose");

const dogSchema = new mongoose.Schema({
  name: String,
  breed: String,
});

const Dog = mongoose.model("Dog", dogSchema);

module.exports = Dog;
