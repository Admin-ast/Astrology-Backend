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

const verifyOtp = async (mobileNumber, otp) => {
  // const { otp, mobileNumber } = req.body;
  const response = await verifyOtpService(mobileNumber, otp);

  console.log("hello", response);

  if (response === "approved") {
    return { otpVerified: true };
  } else {
    return { otpVerified: false };
  }
};

module.exports = { createOtp, verifyOtp };
