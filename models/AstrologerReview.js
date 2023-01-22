const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  eventDate: {
    startDate: { type: String, required: true, trim: true },
    endDate: { type: String, required: true, trim: true },
  },
  venueCode: { type: String, required: true, trim: true },
  eventCode: { type: String, required: true, unique: true, trim: true },
  bannerImage: { type: [Object], required: true },
  timing: {
    from: { type: String, required: true, trim: true },
    to: { type: String, required: true, trim: true },
  },
  priceRange: {
    min: { type: String, required: true, trim: true },
    max: { type: String, required: true, trim: true },
  },
  status: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  packages: [
    {
      packageName: { type: String, required: true, trim: true },
      price: { type: String, required: true, trim: true },
      titleImage: { type: [Object], required: true },
      packageDescription: { type: String, required: true, trim: true },
    },
  ],
  product: {
    type: mongoose.Schema.ObjectId,
    ref: "Venue",
  },
});

module.exports = mongoose.model("Event", EventSchema);
