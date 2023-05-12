const express = require("express");
const router = express.Router();

const { createOtp, verifyOtp } = require("../controllers/otpController");

router.post("/generate-otp", createOtp);
// router.post("/verify-otp", verifyOtp);

module.exports = router;
