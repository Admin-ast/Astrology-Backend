const mongoose = require("mongoose");

const connectDb = (url) => {
  mongoose.set("strictQuery", true);
  mongoose.connect(url);
};

module.exports = connectDb;
