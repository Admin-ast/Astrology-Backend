const mongoose = require("mongoose");

const candidateSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  mobileNumber: {
    type: Number,
    minLength: 10,
    maxLength: 10,
  },
  emailId: {
    type: String,
  },
  skillDetails: {},
  otherDetails: {},
  assignmentDetail: {},
  // dateOfBirth: {
  //   type: Date,
  // },
  // gender: {
  //   type: String,
  // },
  // primarySkills: {
  //   type: Array,
  // },
  // allSkills: {
  //   type: Array,
  // },
  // language: {
  //   type: Array,
  // },
  // experience: {
  //   type: Number,
  // },
  // dailyHour: {
  //   type: Number,
  // },
  // platform: {
  //   type: String,
  // },
  // workingForOther: {
  //   type: Boolean,
  // },
});

module.exports = mongoose.model("Candidate", candidateSchema);
