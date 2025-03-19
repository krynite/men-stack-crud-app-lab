const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const morgan = require("morgan");
const prompt = require("prompt-sync")();
const Dog = require("./models/Dog");
const methodOverride = require("method-override");

// Initialize Express app
const app = express();
const port = 3000;

// Middleware
app.use(morgan("dev"));
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");

// MongoDB connection
mongoose.set("debug", true);

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");
    return true;
  } catch (err) {
    console.error("MongoDB connection error:", err);
    return false;
  }
};

// adding dog with prompt
const createDog = async () => {
  const newName = prompt(`Type new dog's name here: `);
  const newBreed = prompt(`Type dog's breed here: `);

  const dogData = {
    name: newName,
    breed: newBreed,
  };

  try {
    const newDog = await Dog.create(dogData);
    console.log(`Dog created! Name: ${newName}, Breed: ${newBreed}`);
    return newDog;
  } catch (err) {
    console.error("Error creating dog:", err);
    return null;
  }
};

// Routes

// Main homepage
app.get("/", async (req, res) => {
  res.render("index");
});

app.get("/dogs", async (req, res) => {
  try {
    const allDogs = await Dog.find();
    res.render("dogs/index", { dogs: allDogs });
  } catch (err) {
    console.error("Error fetching dogs:", err);
    res.status(500).send("Server error");
  }
});

app.get("/dogs/new", (req, res) => {
  res.render("dogs/new");
});

app.get("/dogs/:id", async (req, res) => {
  try {
    const dog = await Dog.findById(req.params.id);
    if (!dog) {
      return res.status(404).send("Dog not found");
    }
    res.render("dogs/show", { dog });
  } catch (err) {
    console.error("Error fetching dog:", err);
    res.status(500).send("Server error");
  }
});

app.post("/dogs", async (req, res) => {
  try {
    await Dog.create(req.body);
    res.redirect("/dogs");
  } catch (err) {
    console.error("Error creating dog:", err);
    res.status(500).send("Server error");
  }
});

// Start server
const startServer = async () => {
  const connected = await connect();
  if (connected) {
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  }
};

startServer();
