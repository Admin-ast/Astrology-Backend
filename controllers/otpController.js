const { response } = require("express");
const {
  verifyOtpService,
  createOtpService,
} = require("../services/otp-service");

const createOtp = async (req, res) => {
  console.log(req.body);
  const { mobileNumber } = req.body;
   createOtpService(mobileNumber);
  res
    .status(201)
    .json({ msg: "Otp has been sent successfully on your mobile number" });
};

const verifyOtp = async (req, res) => {
  const { otp, mobileNumber } = req.body;
  const response = await verifyOtpService(mobileNumber, otp);

  console.log("hello", response);
  response = "approved"
  const result =  response === "approved"
  
  res.status(200).json({otpVerified: result})
};

module.exports = { createOtp, verifyOtp };
