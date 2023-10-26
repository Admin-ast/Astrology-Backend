const {Address} = require('../models/address');
const {getuserid} = require('../utils/jwt');

const saveAddress = async(req,res) => {
  
    try {
        let user = "";
  if(req.body.user){
    user = req.body.user;
  }
  else{
    
    user = getuserid(req);

  } 
      

        req.body.user = user;
        let address = new Address({
          user:user,
          name:req.body.name,
          mobileno:req.body.mobileno,
          alternative:req.body.alternative,
          email:req.body.email,
          flatno:req.body.flatno,
          locality:req.body.locality,
          city:req.body.city,
          state:req.body.state,
          country:req.body.country,
          pincode:req.body.pin,
          landmark:req.body.landmark
        });

        address = await address.save();
       // const address = await Address.create(req.body);
        res.status(201).json({status:true, res:address});
    } catch (error) {
        res.status(400).json(error);
    }
}

const getAddress = async(req,res) => {
  let user = "";
  if(req.body.user){
    user = req.body.user;
  }
  else{
    
    user = getuserid(req);
    console.log(user);
  }
  if(user == "" || user == undefined){
   return res.status(404).json({message:"Login"});
  }
  const address = await Address.find({user:user});
  console.log(address);
  if(!address || address.length == 0){
    res.status(404).json({status:false, message:"Address not found"});
  }
  else{
    res.status(200).json({status:true, res:address});
  }
}
  const editAddress = async(req,res) => {
    let user = "";
  if(req.body.user){
    user = req.body.user;
  }
  else{
    
    
    user = getuserid(req);
  }

  }

  const deleteAddress = async(req,res) => {
    let user = "";
  if(req.body.user){
    user = req.body.user;
  }
  else{
    
    user = getuserid(req);
  }



  }

  module.exports = {
    saveAddress,
    getAddress,
    editAddress,
    deleteAddress
  }
