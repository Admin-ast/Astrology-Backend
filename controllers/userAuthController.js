const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");

const userLogin = async (req, res) => {
  const { mobileNumber } = req.body;
  const user = await User.findOne({ mobileNumber });
  if (!user) {
    const user = await User.create(req.body);
    return res
      .status(201)
      .json({ msg: "login successfully", user, existingUser: false });
  }
  res.status(201).json({ msg: "login successfully", user, existingUser: true });
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
