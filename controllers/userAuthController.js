const { User } = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { attachCookiesToResponse } = require("../utils/jwt");
const { verifyOtp } = require("./otpController");
const admin = require("../config/firebaseconfig");
const JWTToken = require("../utils/jwt");

const userLogin = async (req, res) => {
  const { mobileNumber, token } = req.body;

  
  if (!token) {
    return res.status(401).json({ msg: "Not Authenticated" });
  }
  else{

      try{
      const decodeValue = await admin.auth().verifyIdToken(token);
     // console.log("decodevalue admin ", decodeValue);
      if(decodeValue){
        const user = await User.find({ mobileNumber: mobileNumber });
    
        
  if (!user) {
    const user = await User.create(req.body);
    attachCookiesToResponse({
      res,
      payload: { user: user },
    });
    const token = JWTToken.createJWT({payload:payload});
    return res
      .status(200)
      .json({ message: "Loggedin", user, existingUser: false, token:token });
  }
  
  const payload = {user : user};
  attachCookiesToResponse({
    res,
    payload: payload,
  });
  const token = JWTToken.createJWT({payload:payload});
  return res
    .status(201)
    .json({ message: "Loggedin", user, existingUser: true, token:token });
  // }
  // res.status(401).json({ msg: "OTP not verified" });
}
else {
  
  return res.json({msg:'Un authorize'});

}
}
catch(e){
  console.log(e);
  return res.json({msg: 'Internal Error'});
}
  }
}
const userUpdate = async (req, res) => {
  const { mobileNumber } = req.body;
  const user = await User.findOneAndUpdate({ mobileNumber }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!user) {
    throw new NotFoundError(`User not found`);
  }
  res.status(StatusCodes.OK).json({ user, msg: "updated successfully" });
};

module.exports = {
  userLogin,
  userUpdate,
};
