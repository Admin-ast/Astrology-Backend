const {TimeTable} = require('../models/timetable');
const {getastrologerid} = require('../utils/jwt');

const getSchedule = async(req,res) => {
        const astrologerid = "6525357030f1240ebc979f10";    // getastrologerid(req);

        const schedule = await TimeTable.find({astrologer:astrologerid});

        if(schedule.length < 1){
            return res.status(500).json({status:false, message:"No Schedule found"});
        }

        res.status(200).json({status:true, res:schedule});
        
}

module.exports  = {
        getSchedule
}