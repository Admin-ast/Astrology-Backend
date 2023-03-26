const express = require("express");

const router = express.Router();
const { userLogin, verifyOtp } = require("../controllers/userAuthController");

router.post("/sign-in", userLogin);
router.post("/verify-otp", verifyOtp);

module.exports = router;
