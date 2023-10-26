const {Candidate} = require('../models/Candidate');
const {Review} = require('../models/review');
const {TimeTable} = require('../models/timetable');
const {Offer} = require('../models/offer');
const {CeoMessage} = require('../models/ceomessage');
const JWToken = require("../utils/jwt");


const createCandidate = async (req, res) => {
  
  const { mobileNumber } = req.body;
  
  const existingCandidate = await Candidate.findOne({mobileNumber});// Candidate.find({ mobileNumber : mobileNumber });
  
  
  if (existingCandidate) {
    const candidate = await Candidate.findOneAndUpdate(
      { mobileNumber },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    return res.status(201).json({status:true,
      msg: "added successfully",
      res: candidate,
    });
  }
  
  req.body.autoBoost = [{"call":false},{"chat":false},{"report":false}];
  let candidate = Candidate.create(req.body);

 // candidate = await candidate.save();
  
  const payload = {
     name : candidate.name,
     _id : candidate.id
  }
  
  const token = JWToken.createJWT({payload});

  JWToken.attachCookiesToResponseAstrologer({
    res,
    payload: { payload: payload },
  });
  return res
    .status(201)
    .json({ status:true, message: "Registered Successfully",  token:token });
  
  res.status(201).json({
    status:true,
    msg: "added successfully",
    "astrologer": candidate,
    "token": token
  });
};


const login = async(req, res) => {

     const {emailId, password} = req.body;

     const candidate = await Candidate.find({ emailId: emailId, password:password });
     
     if(candidate.length > 0){
      const payload = {
        name : candidate[0]?.name,
        _id : candidate[0]?.id
     }

     JWToken.attachCookiesToResponseAstrologer({
      res,
      payload: { payload: payload },
    });
      return res.status(200).json({status:true,message:"Login Successfully"});
     }
     else{
      return res.status(400).json({status:false,message:"email and password not matched"});
     }

}

const bearertoken = async(req,res) => {
    console.log(req.headers.authorization);
    const token =  JWToken.getuserid(req);
    console.log(token);
    res.send(token);
}
const getOffers = async(req,res) => {

}

const setOffers = async(req,res) => {
      const astrologerid = JWToken.getastrologerid(req);

      const astrologer = await Candidate.findById(astrologerid);
      if(astrologer){
        let offers = astrologer.orders;
        
      }
}
const getallCandidate = async(req, res) => {
     const allcandates = await Candidate.find();

     if(!allcandates){
       return res.status(400).json({status:false, message:"not found"});
     }

     return res.status(200).json({status:true, res:allcandates});
}

const getliveCandidate = async(req,res) => {
     const allCandidates = await Candidate.find({status:"live"});

     if(!allCandidates){
      return res.status(400).json({status:false, message:"No Astrologery live"});
     }
     else{
      return res.status(200).json({status:true, res:allCandidates});
     }
}

const updateStatus = async(req,res) => {
      const candidate = await Candidate.findByIdAndUpdate(req.body.id,{
        status:req.body.status
      },
      { new : true });

      if(candidate){
        return res.status(200).json({status:true,message:"Successfully updated status"});
      }

}

const getCandidate = async(req,res) => {
      try{
      const candidate = await Candidate.findById(req.params.id);


      if(!candidate){
        return res.status(500).json({status:false, message:"No Astrologer Found"});
      }

      const reviews = await Review.find({astrologer:req.params.id}).limit(3).sort({'reviewDate':-1});

      const similarastrologers = await Candidate.find().limit(3).sort({'registrationDate':-1});  

      const result = {"astrologer":candidate, "reviews":reviews, "similarastrologers":similarastrologers};
      res.status(200).json({status:true, res:result});
    }
    catch(error){
      console.log(error);
    }
}

const updateTimeTable = async(req, res) => {
      const astrologerid = "6525357030f1240ebc979f10";  // JWToken.getastrologerid(req);
      
      let timetable = new TimeTable({
          astrologer:astrologerid,
          timetable:req.body.timetable
      });
      
      timetable = await timetable.save();

      return res.status(200).json({status:true, message:"Successfully updated"});

}

const autoBoost = async(req, res) => {
  
        const astrologerid =  "6525357030f1240ebc979f10";   //JWToken.getastrologerid(req);
         const element = req.body.autoBoost;
       
         let autoboost = await Candidate.findById(astrologerid).select('autoBoost');  
         let autoboostelemts = autoboost.autoBoost;
        
        if(element.call === true || element.call === false){
          
          autoboostelemts[0] = element;
        }
        if(element.chat === true || element.chat === false){
          
          autoboostelemts[1] = element;
        }
        if(element.report === true || element.report === false){
          
          autoboostelemts[2] = element;
        }


                    await Candidate.findByIdAndUpdate(astrologerid,{
                autoBoost:autoboostelemts
          });

         res.status(200).json({status:true, message:"Successfully updated"});
}


const getautoBoost = async(req,res) => {
      const astrologerid = "6525357030f1240ebc979f10"; //JWToken.getastrologerid(req);

      const autoboost = await Candidate.findById(astrologerid).select('autoBoost');

      const boost = autoboost.autoBoost;
      
       res.status(200).json({status:true, res:boost, message:"Successfully"});
}


const getAdmin = async(req, res) => {
      const astrologerid = JWToken.getastrologerid(req);

      
}
const updaterate = async(req,res) => {
    await Candidate.findByIdAndUpdate(req.body.id,{
          callCharges:req.body.callCharges
    });

    return res.status(200).json({status:true,message:"Successfully updated rate"});
}

const uploadImage = async(req,res) => {
      console.log(req.files[0].filename);
      const filename = req.files[0].filename;
      const astrologerid = JWToken.getastrologerid(req);

      try{
      await Candidate.findByIdAndUpdate(astrologerid,{
            image:filename
      });
    }
    catch(error){
      console.log(error);
    }

      return res.status(200).json({status:true, message:"Successfully", data:"uploaded"});
}

const uploadGalleryImage = async(req,res) => {
      console.log(req.files[0].filename);
      const filename = req.files[0].filename;
      const astrologerid = JWToken.getastrologerid(req);

      try{
          
      }
      catch(error){
        console.log(error);
      }

      return res.status(200).json({status:true, message:"Successfully", data:"uploaded"});
}

const dpImage = async(req,res) => {
      console.log(req.files[0].filename);

      return res.status(200).json({status:true, message:"Successfully", data:"uploaded"});
}

const ceomessage = async(req,res) => {

      astrologerid = JWToken.getastrologerid(req);

      let message = new CeoMessage({
            astrologer:astrologerid,
            message:req.body.message
      });

      message = await message.save();

      res.status(200).json({status:true, message:"Your message is sent successfully to Ceo"});

      
}



 
const deleteCandidate = async(req,res) => {
     Candidate.findByIdAndDelete(req.params.id).then(async candidate => {
            if(candidate){
              return res.status(200).json({status:true, message:"Astrologer successfully removed"});
            }
            else{
              return res.status(400).json({status:false, message:"Astrologer not found"});
            }
    }).catch( err => {
      return res.status(500).json({success:false, error:err});
    }

    );
}

module.exports = { createCandidate, login, bearertoken, getallCandidate, getliveCandidate, getCandidate, updateStatus, updateTimeTable,  uploadImage, uploadGalleryImage, dpImage,  deleteCandidate, updaterate, getautoBoost, autoBoost,ceomessage };
