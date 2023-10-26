const {Remedy} = require("../models/remedy");
const {getastrologerid} = require("../utils/jwt");

const getRemedies = async(req,res) => {
      const astrologerid = "6525357030f1240ebc979f10"; //getastrologerid(req);

      const remedies = await Remedy.find({astrologer:astrologerid}).populate('category','name').populate('product','name').populate('user','name');

      if(remedies.length < 1){
        return res.status(200).json({status:false, message:"No Remedies"});
      }

      res.status(200).json({status:true, res:remedies});
      

}

const addRemedy = async(req,res) => {
        const astrologerid = "6525357030f1240ebc979f10"; //getastrologerid(req);
        
        let remedy = new Remedy({
             user:req.body.user,
             astrologer:astrologerid,
             category:req.body.category,
             product:req.body.product,
             performedBy:req.body.performedBy,
             type:req.body.type,
             status:req.body.status,
             description:req.body.description
        });

        remedy = await remedy.save();

        if(!remedy){
            return res.status(404).json({status:false, message:"Remedy can not created"});
        }

        res.status(200).json({status:true, message:"Successfully "});
}

module.exports = {
    getRemedies,
    addRemedy
}