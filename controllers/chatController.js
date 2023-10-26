const { User } = require('../models/User');
const {Chat} = require('../models/chat');
const { Candidate } = require('../models/Candidate');
const {getuserid, getastrologerid} = require('../utils/jwt');


const chatHistory = async(req,res) => {
    const chatList = await Chat.find().sort({'dateOrdered': -1});

    if(chatList.length < 1){
         res.status(404).json({status:false, message: "No Calls"});
    }
    
    res.status(200).json({status:true, res: chatList});
}

const chatHistoryUser = async(req,res) => {
    const chatList = await Chat.find({user:req.params.id}).populate('user').sort({'dateOrdered': -1});

    if(!chatList){
         res.status(404).json({status:false, message: "No Calls"});
    }
    
    res.status(200).json({status:true, res: chatList});
}

const chatHistoryWaitingAstrologer = async(req,res) => {
        const astrologerid = getastrologerid(req);

        var chatList = await Chat.find({astrologer:astrologerid,status:'waiting'}).sort({'waitingStart': -1});

        if(chatList.length < 1){
            res.status(404).json({status:false, message:"No waiting calls"});
        }
        
        //add duration in calllist
        for (let index = 0; index < chatList.length; index++) {
           
            const d1 = new Date(chatList[index].waitingStart);
        const d2 = new Date();
        const time = d2 - d1;
        const total = (time/60)/1000;
        
        
            var diff = Math.round(((total + Number.EPSILON)*100)/100);
            console.log(diff);
            chatList[index].duration = diff;

        }
        res.status(200).json({status:true, res:chatList});
}
const chatHistoryAstrologer = async(req,res) => {

    const astrologerid = getastrologerid(req);

    const chatList = await Chat.find({astrologer:astrologerid,status:'completed'}).sort({'dateOrdered': -1});

    if(chatList.length < 1){
        res.status(404).json({status:false, message:"No Calls"});
    }

    
    res.status(200).json({status:true, res: chatList})
}

const getChatDetail = async(req,res) => {
    const chat = await Chat.findById(req.params.id).populate('user');

    if(!chat){
         res.status(404).json({status:false, message: "No Call"});
    }
    
    res.status(200).json({status:true, res:chat});
}

const addChat = async(req,res) => {
    let user = "";
     user =  req.body.user;  //getuserid(req);
        //console.log(user);
     //check balance of user
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
     let chatCharges = 0;
     if(candidate){
            chatCharges = candidate.chatCharges;
     }
     else{
        return res.status(500).json({status:false, message:"No Astrologer"});
     }
       try{
        let status = "waiting";
        let message = "Astrology is on another chat, will shortly receive your chat";
        let chat = "";
        console.log(candidate.status);
        if(candidate.status === "online"){
            status = "on chat";
            message = "Chat Successfully Placed";

        }
        
        //check if user applied offer
        let offer = "";
        
        if(req.body.offer){
            offer = req.body.offer;
        }
        
        if(status == "waiting"){
         chat = new Chat({
         user: user,
         astrologer: req.body.astrologer,
         offer:offer,
         name:req.body.name,
         gender:req.body.gender,
         dateofbirth:req.body.dateofbirth,
         timeofbirth:req.body.timeofbirth,
         birthplace:req.body.birthplace,
         country:req.body.country,
         status:status,
         waitingStart: new Date()
         
         
        });
        }
        else{
            chat = new Chat({
                user:user,
                astrologer:req.body.astrologer,
                offer:offer,
                name:req.body.name,
                gender:req.body.gender,
                dateofbirth:req.body.dateofbirth,
                timeofbirth:req.body.timeofbirth,
                birthplace:req.body.birthplace,
                country:req.body.country,
                status:status,
                start: new Date()
            })
        }




    chat = await chat.save();

    //update status of astrologer
    await Candidate.findByIdAndUpdate(req.body.astrologer,{
        "status":"on chat"
    })

    if(!chat){
     return res.status(404).json({status:false, message : "Chat can not be created"});
    }
    res.status(200).json({status:true, message:message, walletBalance:getuser.walletBalance, chatId:chat._id});
}
catch(error){
    console.log(error);
}

}
const timdifference = async(req,res) => {
    const chat = await Chat.findById(req.params.id);
    console.log("ok");
    const d1 = new Date(chat.start);
    const d2 = new Date(chat.end);
    const time = d2 - d1;
    console.log(d1);
    console.log(d2);
    console.log((time/60)/1000);
}
const receiveChat = async(req, res) => {
         await Call.findByIdAndUpdate(req.params.id,{status:"running", waitingEnd: new Date, start:new Date},{new : true});
         await Candidate.findByIdAndUpdate(req.body.astrologer,{status:"on chat"});
            
            return res.status(200).json({status:true, message:"Chat Started"});
}

const endChat = async(req,res) => {

     let user = "";
      user =  req.body.user;       //getuserid(req);
    // console.log(user);
    //  //check balance of user
        //check if call status has waiting and disconnect it make it cancelled
        const chat = Chat.findById(req.body.chatid);
        if(chat){
            if(chat.status === "waiting"){
            await  Chat.findByIdAndUpdate(req.body.chatid,{
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
      let chatCharges = 0;
      
      if(candidate){
             chatCharges = candidate.chatCharges;
             
      }
      else{
         return res.status(500).json({status:false, message:"No Astrologer"});
      }
      //check if astrologer has any offer
      let offer = req.body.offer;
      let astrologerCharges = chatCharges;
      console.log(offer);
        if(offer != undefined){
            const getoffer = await Offer.findById(offer);
            callCharges = getoffer.customerPays;
            astrologerCharges = getoffer.atShare;
        }        
     //calculate duration of chat
        const chatduration = await Chat.findById(req.body.chatid);
        
        let enddate = new Date();
        const d1 = new Date(chatduration.start);
    const d2 = new Date();
    const time = d2 - d1;
    const total = (time/60)/1000;
    
    
        var diff = Math.round(((total + Number.EPSILON)*100)/100);
        
        let totalcharges = chatCharges * diff;
        let totalAstrologerCharges = astrologerCharges * diff;
        
        let pgcharge = totalcharges * 2/100;
                        
        let balance = getuser.walletBalance - totalcharges;
        let astrologerBalance = (candidate.walletBalance + totalAstrologerCharges)-pgcharge;
        
        
        try{
            
            //update user balance
         await  User.findByIdAndUpdate(user, {
                "walletBalance":balance
            });
        await   Chat.findByIdAndUpdate(req.body.chatid,{
                status:"completed",
                rate:callCharges,
                amount:totalcharges,
                duration:diff,
                end:enddate
            });

            //update astrologer balance and status
            let totalchattime = candidate.chatmin + diff;           
           await Candidate.findByIdAndUpdate(req.body.astrologer, {
                "walletBalance":astrologerBalance,
                "status":"online",
                "chatmin":totalchattime
            });

     
 }
 catch(error){
     console.log(error);
 }
     res.status(200).json({status:true, message:"Chat Successfully Ended", walletBalance:balance});
}

const remove = async(req,res) => {
     await  Chat.findByIdAndRemove(req.params.id).then(chat => {
        res.status(200).json({status:true,message:"Successfully removed", res:chat});
     });
     
        
}
module.exports = {
    chatHistory,
    getChatDetail,
    addChat,
    receiveChat,
    endChat,
    chatHistoryUser,
    chatHistoryAstrologer,
    remove,
    timdifference,
    chatHistoryWaitingAstrologer
}

