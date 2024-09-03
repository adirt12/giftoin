const express = require("express");
const cors = require("cors");
const Card = require("../schema/card.js");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT;

const mongoose = require("mongoose");

const uri = process.env.URI;
mongoose
  .connect(uri)
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log("error: " + err);
  });

app.use(cors());
app.use(express.json());

app.post("/addCard", async (req, res) => {
  try {
    const {
      collection_name,
      description,
      image_url,
      number_of_cards,
      start_date,
      end_date,
    } = req.body;
    const newCard = new Card({
      collection_name,
      description,
      image_url,
      number_of_cards,
      start_date,
      end_date,
    });
    await newCard.save().then(() => console.log("Data saved"));
    res.status(201).send("Calorie consumption item added");
  } catch (err) {
    res.status(400).send(err.message);
  }
});

app.get("/collections", async (req, res) => {
  try {
    const collections = await Card.find();
    res.json(collections);
  } catch (error) {
    res.status(500).json({ message: "Error fetching collections" });
  }
});

app.delete("/deleteCard/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Card.findByIdAndDelete(id);
    res.status(200).json({ message: "Collection deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting collection" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
