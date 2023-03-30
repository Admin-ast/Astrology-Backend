const {
  verifyOtpService,
  createOtpService,
} = require("../services/otp-service");

const createOtp = async (req, res) => {
  console.log(req.body, "reqq");
  const { mobileNumber } = req.body;
  console.log("here Im");
  createOtpService(mobileNumber);
  res
    .status(201)
    .json({ msg: "Otp has been sent successfully on your mobile number" });
};

const verifyOtp = async (req, res) => {
  const { otp, mobileNumber } = req.body;
  const response = await verifyOtpService(mobileNumber, otp);

  console.log("hello", response);

  if (response === "approved") {
    res.status(201).json({ msg: "Otp verified successfully" });
  } else {
    res.status(401).json({ msg: "Otp verification failed" });
  }
};

module.exports = { createOtp, verifyOtp };
