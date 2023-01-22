const mongoose = require("mongoose");

const HeroBanner = mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  position: {
    type: Number,
    required: true,
    trim: true,
  },
  status: {
    type: String,
    trim: true,
    enum: ["active", "inactive"],
    default: "active",
  },
  image: {
    type: [Object],
    // required: true,
  },
});

module.exports = mongoose.model("HeroBanner", HeroBanner);
