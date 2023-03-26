const mongoose = require("mongoose");
const validator = require("validator");

const KundliSchema = new mongoose.Schema({
  kundliDetails: {},
});

module.exports = mongoose.model("kundli", KundliSchema);
