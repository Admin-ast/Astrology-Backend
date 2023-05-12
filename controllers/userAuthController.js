const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { attachCookiesToResponse } = require("../utils/jwt");
const { verifyOtp } = require("./otpController");

const userLogin = async (req, res) => {
  const { mobileNumber, otp } = req.body;
  const user = await User.findOne({ mobileNumber });
  if (!otp) {
    return res.status(401).json({ msg: "OTP is required" });
  }
  const otpVerification = await verifyOtp(mobileNumber, otp);
  console.log(otpVerification);
  if (otpVerification && otpVerification.otpVerified) {
    if (!user) {
      const user = await User.create(req.body);
      attachCookiesToResponse({
        res,
        payload: { user: user },
      });
      return res
        .status(200)
        .json({ msg: "login successfully", user, existingUser: false });
    }
    console.log(res["cookie"]);
    attachCookiesToResponse({
      res,
      payload: { user: user },
    });
    return res
      .status(201)
      .json({ msg: "login successfully", user, existingUser: true });
  }
  res.status(401).json({ msg: "OTP not verified" });
};

const userUpdate = async (req, res) => {
  const { mobileNumber } = req.body;
  const user = await User.findOneAndUpdate({ mobileNumber }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!user) {
    throw new CustomError.NotFoundError(`User not found`);
  }
  res.status(StatusCodes.OK).json({ user, msg: "updated successfully" });
};

module.exports = {
  userLogin,
  userUpdate,
};
