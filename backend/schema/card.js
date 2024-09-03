const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cardSchema = new Schema({
  collection_name: {
    type: String,
  },
  description: {
    type: String,
  },
  image_url: {
    type: String,
  },
  number_of_cards: {
    type: Number,
  },
  start_date: {
    type: Date,
  },
  end_date: {
    type: Date,
  },
});

const Card = mongoose.model("card", cardSchema);

module.exports = Card;
