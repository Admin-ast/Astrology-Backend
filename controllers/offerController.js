const { Candidate } = require('../models/Candidate');
const {Offer} = require('../models/offer');
const {getastrologerid} = require('../utils/jwt');

const getOffers = async(req,res) => {
    const offerList = await Offer.find().sort({'dateOrdered': -1});

    const astrologerid =  "6525357030f1240ebc979f10";   //getastrologerid(req);

    const activatedOffers = await Candidate.findById(astrologerid).select('offers');
    

    if(offerList.length <= 0){
         res.status(500).json({status:false, message: "No Orders"});
    }

    
    
    res.status(200).json({
        status:true, res: offerList, activatedOffers:activatedOffers});

        
}

const getOffer = async(req,res) => {
    const offer = await Offer.findById(req.params.id);

    if(!offer){
         res.status(500).json({status:false, message: "No Offers"});
    }
    
    res.status(200).json({status:true,res:offer});
}

const setOffer = async(req,res) => {
        const astrologerid =  getastrologerid(req);
        var offers = await Candidate.findById(astrologerid).select('offers');
        var get = offers.offers;
        console.log(offers.offers);
        get.push(req.body.offer);
        
        await Candidate.findByIdAndUpdate(astrologerid,{
            'offers':get
        });

        return res.status(200).json({status:true,message:"Successfully added offer"});
}

const removeOffer = async(req,res) => {
        const astrologerid = getastrologerid(req);
        var offers = await Candidate.findById(astrologerid).select('offers');
        var get = offers.offers;
        const index = get.indexOf(req.body.offer);

        if(index > -1){
            get.splice(index,1);
        }
        
        await Candidate.findByIdAndUpdate(astrologerid,{
            'offers':get
        });

        return res.status(200).json({status:true, message:"Successfully removed offer"});
}

const addOffer = async(req,res) => {
//     let user = "";
//     try {
        
//   if(req.body.user){
//     user = req.body.user;
//   }
//   else{
//     let token;
//     const authHeader = req.headers.authorization;
//     if (authHeader && authHeader.startsWith('Bearer')) {
//         token = authHeader.split(' ')[1];
//       }
//       // check cookies
//       else if (req.signedCookies.accessTokenAdmin) {
//         token = req.signedCookies.accessTokenAdmin;
//       }
//     user = getuserid(token);
      
//   }
// } catch (error) {
//     res.status(400).json(error);
// }
          
       try{

    let offersave = new Offer({
         offerType: req.body.offerType,
         offerName: req.body.offerName,
         displayName: req.body.displayName,
         userType: req.body.userType,
         country: req.body.country,
         myShare: req.body.myShare,
         atShare: req.body.atShare,
         customerPays: req.body.customerPays,
         status: req.body.status

         
    });

    

    offersave = await offersave.save();
    if(!offer){
     return res.status(404).json({status:false, message : "Offer can not be created"});
    }
    
}
catch(error){
    console.log(error);
}
    res.status(200).json({status:true, message:"Offer Successfully Placed"});
}

module.exports = {
  getOffers,
  getOffer,
  addOffer,
  setOffer,
  removeOffer
}
