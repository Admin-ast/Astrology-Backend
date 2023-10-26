const {LiveEvents} = require("../models/liveevent");
const {getastrologerid} = require("../utils/jwt");

const getliveevents = async() => {
       const astrologerid = getastrologerid(req);

       const liveenvets = await LiveEvents.find({astrologer:astrologerid});

       if(liveenvets.length < 1){
        return res.status(500).json({status:false, message:"No Events found"});
       }

        res.status(200).json({status:true, res:liveenvets});

}

const startliveevent = async(req,res) => {
        const astrologerid = getastrologerid(req);

        let startliveevet = new LiveEvents({
             astrologer:astrologerid,
             status:"running",

        });

        startliveevet = await startliveevet.save();

        res.status(200).json({status:true, message:"Successfully started live event", liveventid:startliveevet?._id});
}

const stopliveevent = async(req,res) => {
            
    const liveventid = req.body.liveventid;

        await LiveEvents.findByIdAndUpdate(liveventid, {
                status:"Finished"
        });

         res.status(200).json({stats:true, message:"Successfully stopped live event"});
}

module.exports = {
    getliveevents,
    startliveevent,
    stopliveevent
}