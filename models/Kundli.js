const mongoose = require("mongoose");

const KundliSchema = new mongoose.Schema({
  kundliDetails: {},
});

module.exports = mongoose.model("kundli", KundliSchema);
