const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "User",
  },
  mobileNumber: {
    type: Number,
    required: true,
    minLength: 10,
    maxLength: 10,
  },
  dateOfBirth: {
    type: Date,
  },
  timeOfBirth: {
    type: String,
  },
  placeOfBirth: {
    type: String,
  },
  currentAddress: {
    type: String,
  },
  city: {
    type: String,
  },
  pinCode: {
    type: Number,
    minLength: 6,
    maxLength: 6,
  },
});

module.exports = mongoose.model("User", UserSchema);
