// imports

const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const morgan = require("morgan");
const prompt = require("prompt-sync")();
const Dog = require("./models/Dog");

//configs
mongoose.set("debug", true)
// app.use(morgan("dev"))


const connect = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Connected to MongoDB");
  await runQueries();

  await mongoose.disconnect();
  console.log("Disconnected from MongoDB");
  process.exit();
};
connect();

//Query Functions

const createDog = async() => {
    const newName = prompt(`Type new dogs name here: `)
    const newBreed = prompt(`Type dogs breed here: `)

    const dogData = {
        name: newName,
        breed: newBreed,
    }

    const newDog = await Dog.create(dogData)
    console.log(`Dog's name: ${newName}, Breed: ${newBreed}`)
}




// Run Queries
const runQueries = async () => {
    console.log("running queries func")
    await createDog();



}