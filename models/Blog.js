const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  status: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  date: { type: Date, default: new Date() },
  categories: [
    {
      categories: {
        type: String,
        trim: true,
      },
      status: {
        type: String,
        trim: true,
        enum: ["active", "inactive"],
        default: "active",
      },
    },
  ],
  featureImage: {
    type: [Object],
    // default: "/uploads/featureImage.png",
  },
  author: { type: String, required: true, trim: true },
});

module.exports = mongoose.model("Blogs", BlogSchema);
