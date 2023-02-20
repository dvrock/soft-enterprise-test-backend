const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  model: {
    type: String,
  },
  price: {
    type: Number,
  },
  phone: {
    type: Number,
  },
  city: {
    type: String,
  },
  options: {
    type: Number,
  },
  pictures: [
    {
      type: String,
    },
  ],
});

module.exports = mongoose.model("Car", carSchema);
