const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

const addMoney = async (req, res) => {
  const { id, amount } = req.body;
  const user = await User.findById(id);

  if (!user) {
    throw new CustomError.NotFoundError(`Astrologer not found`);
  }

  if (user.isPromoted) {
    user.wallet.totalAmount = user.wallet?.totalAmount + amount;
    user.wallet.selfAmount = user.wallet.selfAmount + amount * 0.9;
  } else {
    user.wallet.totalAmount = user.wallet?.totalAmount + amount;
    user.wallet.selfAmount = user.wallet.selfAmount + amount * 0.95;
  }

  await User.findOneAndUpdate({ _id: id }, user, {
    new: true,
    runValidators: true,
  });

  res.status(StatusCodes.OK).json({ msg: "Success!" });
};

module.exports = {
  addMoney,
};
