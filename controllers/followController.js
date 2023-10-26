const {Follower} = require("../models/follower");
const {getastrologerid, getuserid} = require("../utils/jwt");


const getallfollowers = async(req,res) => {
      const followers = await Follower.find();

      return res.status(200).json({status:true, res:followers});
}
const getfollowers = async(req,res) => {
        
      const astrologerid =  getastrologerid(req);
        
      const followers = await Follower.find({astrologer:astrologerid}).populate('user','name');

      if(followers.length < 1){
        return res.status(200).json({status:false, message:"No Followers"});
      }

        res.status(200).json({status:true, res:followers});

        
}

const follow = async(req,res) => {
        const userid = getuserid(req);
        const follow = req.body.follow;

        
      try{
        if(follow === "Follow"){
        let userfollow = new Follower({
            user:userid,
            astrologer:req.body.astrologer
        });
      
  

        userfollow = await userfollow.save();
        console.log(follow);
      
      }
      else{
         await Follower.findOneAndRemove({user:user});
        return res.status(200).json({status:false, message:"Successfully unfollowed"});
      }
    }
    catch(error){
      console.log(error);
    }
        res.status(200).json({status:true, message:"Successfully followed"});
}

module.exports = {
    getfollowers,
    follow,
    getallfollowers
}