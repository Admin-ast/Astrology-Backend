const { User } = require('../models/User');
const {Call} = require('../models/call');
const { Candidate } = require('../models/Candidate');
const {getuserid, getastrologerid} = require('../utils/jwt');


const callHistory = async(req,res) => {
    const callList = await Call.find().sort({'dateOrdered': -1});

    if(callList.length < 1){
         res.status(404).json({status:false, message: "No Calls"});
    }
    
    res.status(200).json({status:true, res: callList});
}

const callHistoryUser = async(req,res) => {
    const callList = await Call.find({user:req.params.id}).populate('user').sort({'dateOrdered': -1});

    if(!callList){
         res.status(404).json({status:false, message: "No Calls"});
    }
    
    res.status(200).json({status:true, res: callList});
}

const callHistoryWaitingAstrologer = async(req,res) => {
        const astrologerid = getastrologerid(req);

        var callList = await Call.find({astrologer:astrologerid,status:'waiting'}).sort({'waitingStart': -1});

        if(callList.length < 1){
            res.status(404).json({status:false, message:"No waiting calls"});
        }
        
        //add duration in calllist
        for (let index = 0; index < callList.length; index++) {
           
            const d1 = new Date(callList[index].waitingStart);
        const d2 = new Date();
        const time = d2 - d1;
        const total = (time/60)/1000;
        
        
            var diff = Math.round(((total + Number.EPSILON)*100)/100);
            console.log(diff);
            callList[index].duration = diff;

        }
        res.status(200).json({status:true, res:callList});
}
const callHistoryAstrologer = async(req,res) => {

    const astrologerid = getastrologerid(req);

    const callList = await Call.find({astrologer:astrologerid,status:'completed'}).sort({'dateOrdered': -1});

    if(callList.length < 1){
        res.status(404).json({status:false, message:"No Calls"});
    }

    
    res.status(200).json({status:true, res: callList})
}

const getCallDetail = async(req,res) => {
    const call = await Call.findById(req.params.id).populate('user');

    if(!call){
         res.status(404).json({status:false, message: "No Call"});
    }
    
    res.status(200).json({status:true, res:call});
}

const addCall = async(req,res) => {
    let user = "";
     //user =  req.body.user;  //getuserid(req);
        //console.log(user);
     //check balance of user
     const getuser = getuserid(req);
     user = getuser;
     const users = User.findById(user);
     if(users){
        if(users.walletBalance < 1){
            return res.status(500).json({status:false, message:"You have low wallet balance, recharge your wallet "});

        }
     }
     else{
        return res.status(500).json({status:false, message:"No user"});
     }
       
     //get call charges
     const candidate = await Candidate.findById(req.body.astrologer);
     let callCharges = 0;
     if(candidate){
            callCharges = candidate.callCharges;
     }
     else{
        return res.status(500).json({status:false, message:"No Astrologer"});
     }
       try{
        let status = "waiting";
        let message = "Astrology is on another call, will shortly receive your call";
        let call = "";
        console.log(candidate.status);
        if(candidate.status === "online"){
            status = "on call";
            message = "Call Successfully Placed";

        }
        
        //check if user applied offer
        let offer = "";
        let country = "India";
        let calltype = "Audio";
        let name = "";
        let occupation = "";
        let dateofbirth = "";
        let birthtime = "";
        let birthplace = "";
        let married = "";
        if(req.body.fname || req.body.lname){
            name = req.body.fname + " " + req.body.lname;
        }
        else{
            name = req.body.name;
        }
            
        if(req.body.offer){
            offer = req.body.offer;
        }
        if(req.body.country){
            country = req.body.country;
        }
        if(req.body.calltype){
            calltype = req.body.calltype;
        }
        if(req.body.dob){
            dateofbirth = req.body.dob;
        }
        else{
            dateofbirth = req.body.dateofbirth;
        }
        if(req.body.tob){
            birthtime = req.body.tob;
        }
        else{
            birthtime = req.body.timeofbirth;
        }
        if(req.body.bplace){
            birthplace = req.body.bplace;
        }
        else{
            birthplace = req.body.bplace;
        }
        if(req.body.mstatus){
            married = req.body.mstatus;
        }
        else{
            married = req.body.married;
        }
        if(status == "waiting"){
         call = new Call({
         user: user,
         astrologer: req.body.astrologer,
         type:calltype,
         name:name,
         occupation:req.body.occupation,
         gender:req.body.gender,
         dateofbirth:dateofbirth,
         timeofbirth:birthtime,
         birthplace:birthplace,
         martialstatus:married,
         country:country,
         status:status,
         waitingStart: new Date()
         
         
        });
        }
        else{
            call = new Call({
                user:user,
                astrologer:req.body.astrologer,
                type:calltype,
                name:name,
                gender:req.body.gender,
                occuation:req.body.occuation,
                dateofbirth:dateofbirth,
                timeofbirth:birthtime,
                birthplace:birthplace,
                martialstatus:married,
                country:country,
                status:status,
                start: new Date()
            })
        }




    call = await call.save();

    //update status of astrologer
    await Candidate.findByIdAndUpdate(req.body.astrologer,{
        "status":"on call"
    })

    if(!call){
     return res.status(404).json({status:false, message : "Call can not be created"});
    }
    res.status(200).json({status:true, message:message, walletBalance:users.walletBalance, callId:call._id});
}
catch(error){
    console.log(error);
}

}
const timdifference = async(req,res) => {
    const call = await Call.findById(req.params.id);
    console.log("ok");
    const d1 = new Date(call.start);
    const d2 = new Date(call.end);
    const time = d2 - d1;
    console.log(d1);
    console.log(d2);
    console.log((time/60)/1000);
}
const receiveCall = async(req, res) => {
         await Call.findByIdAndUpdate(req.params.id,{status:"running", waitingEnd: new Date, start:new Date},{new : true});
         await Candidate.findByIdAndUpdate(req.body.astrologer,{status:"on call"});
            
            return res.status(200).json({status:true, message:"Call Started"});
}

const endCall = async(req,res) => {

     let user = "";
      user =  req.body.user;       //getuserid(req);
    // console.log(user);
    //  //check balance of user
        //check if call status has waiting and disconnect it make it cancelled
        const call = Call.findById(req.body.callid);
        if(call){
            if(call.status === "waiting"){
            await  Call.findByIdAndUpdate(req.body.callid,{
                    status:"cancelled"
                });
            await  Candidate.findByIdAndUpdate(req.body.astrologerid,{
                    status:"online"
                });
            }
        }
      const getuser = await User.findById(user);
      
      if(getuser){
         if(getuser.walletBalance < 1){
             return res.status(500).json({status:false, message:"You have low wallet balance, recharge your wallet "});

         }
      }
      else{ 
         return res.status(500).json({status:false, message:"No user"});
      }
       
      //get call charges
      const candidate = await Candidate.findById(req.body.astrologer);
      let callCharges = 0;
      
      if(candidate){
             callCharges = candidate.callCharges;
             
      }
      else{
         return res.status(500).json({status:false, message:"No Astrologer"});
      }
      //check if astrologer has any offer
      let offer = req.body.offer;
      let astrologerCharges = callCharges;
      console.log(offer);
        if(offer != undefined){
            const getoffer = await Offer.findById(offer);
            callCharges = getoffer.customerPays;
            astrologerCharges = getoffer.atShare;
        }        
     //calculate duration of call
        const callduration = await Call.findById(req.body.callid);
        
        let enddate = new Date();
        const d1 = new Date(callduration.start);
    const d2 = new Date();
    const time = d2 - d1;
    const total = (time/60)/1000;
    
    
        var diff = Math.round(((total + Number.EPSILON)*100)/100);
        
        let totalcharges = callCharges * diff;
        let totalAstrologerCharges = astrologerCharges * diff;
        
        let pgcharge = totalcharges * 2/100;
                        
        let balance = getuser.walletBalance - totalcharges;
        let astrologerBalance = (candidate.walletBalance + totalAstrologerCharges)-pgcharge;
        
        
        try{
            
            //update user balance
         await  User.findByIdAndUpdate(user, {
                "walletBalance":balance
            });
        await   Call.findByIdAndUpdate(req.body.callid,{
                status:"completed",
                rate:callCharges,
                amount:totalcharges,
                duration:diff,
                end:enddate
            });

            //update astrologer balance and status
            let totalcalltime = candidate.callmin + diff;           
           await Candidate.findByIdAndUpdate(req.body.astrologer, {
                "walletBalance":astrologerBalance,
                "status":"online",
                "callmin":totalcalltime
            });

     
 }
 catch(error){
     console.log(error);
 }
     res.status(200).json({status:true, message:"Call Successfully Ended", walletBalance:balance});
}

const remove = async(req,res) => {
     await  Call.findByIdAndRemove(req.params.id).then(call => {
        res.status(200).json({status:true,message:"Successfully removed", res:call});
     });
     
        
}
module.exports = {
    callHistory,
    getCallDetail,
    addCall,
    receiveCall,
    endCall,
    callHistoryUser,
    callHistoryAstrologer,
    remove,
    timdifference,
    callHistoryWaitingAstrologer
}

