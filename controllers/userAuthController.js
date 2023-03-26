const User = require("../models/User");
const {
  createOtpService,
  verifyOtpService,
} = require("../services/otp-service");

const userLogin = async (req, res) => {
  const { mobileNumber, name } = req.body;

  console.log("mon", req.body);

  createOtpService(mobileNumber);
  res
    .status(201)
    .json({ msg: "Otp has been sent successfully on your mobile number" });
};
const verifyOtp = async (req, res) => {
  const { otp, mobileNumber, name } = req.body;
  const response = await verifyOtpService(mobileNumber, otp);

  console.log("hello", response);
  const existingUser = await User.findOne({ mobileNumber });
  let user;

  if (response === "approved") {
    if (!existingUser) {
      user = await User.create({ mobileNumber, name });
    } else {
      user = await User.find({ mobileNumber });
    }
    res.status(201).json({ msg: "Otp verified successfully", user });
  } else {
    res.status(401).json({ msg: "Otp verification failed" });
  }
};

module.exports = {
  userLogin,
  verifyOtp,
};
