const { User } = require("../models/User");
const { Candidate } = require("../models/Candidate.js");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const { Wallet } = require("../models/wallet");

const addMoney = async (req, res) => {
  const { id, amount, transactionId } = req.body;
  const user = await User.findById(id);
  let wallet = 0;
  let userwallet =  user.walletBalance;
  if (!user) {
    throw new CustomError.NotFoundError(`User not found`);
  }

  if(amount>0){

    wallet = userwallet + amount;
    
    

  }
  else{
    return res.status(404).json({status:false,message:"Amount should be greater than 0"});
  }

  if(transactionId){
    const wallet = await new Wallet({
          user:id,
          service:"Add Money",
          description:"",
          orderId:"",
          amount:amount,
          type:"credit",
          transactionId:transactionId


    });
    
    wallet = wallet.save();
  }

  await User.findByIdAndUpdate(id, {
    walletBalance:wallet
  });
  res.status(StatusCodes.OK).json({status:true,  message: "Success!", balance:wallet });
};

const addMoneyAstrologer = async(req, res) => {
  const { id, amount } = req.body;
  const astrologer = await Candidate.findById(id);

  if (!astrologer) {
    throw new CustomError.NotFoundError(`Astrologer not found`);
  }

  if(amount>0){
    astrologer.walletBalance = astrologer.walletBalance + amount;
  }

  await Candidate.findOneAndUpdate({ _id: id }, astrologer, {
    new: true,
    runValidators: true,
  });

  res.status(StatusCodes.OK).json({status:true,  message: "Successfully added money to wallet" });
}


module.exports = {
  addMoney,
  addMoneyAstrologer
};
