const {Review} = require('../models/review');
const {Candidate} = require('../models/Candidate');
const {getastrologerid, getuserid} = require('../utils/jwt');

const getReviews = async(req,res) => {
        const astrologerid = "6525357030f1240ebc979f10";  // getastrologerid(req);

        const reviews = await Review.find({astrologer:astrologerid});

        if(reviews.length < 1){
            return res.status(200).json({status:false, message:"No reviews"});
        }

        res.status(200).json({status:true, res:reviews});
}

const addReview = async(req,res) => {
            const userid = getuserid(req);
            const astrologerid = req.body.astrologer;
            const rating = req.body.rating;
            let review = new Review({
                user:userid,
                astrologer:astrologerid,
                orderId:req.body.orderId,
                name:req.body.name,
                service:req.body.service,
                rating:req.body.rating,
                review:req.body.review
            });
              
            review = await review.save();

            
            
            //update astrolger total review 
            const astrolger = await Candidate.findById(astrologerid);
            let totalrating = astrolger.totalRating + rating;
            let userrating = astrolger.userRating;
            let averagerating =  userrating/ totalrating;

            await Candidate.findByIdAndUpdate(astrologerid, {
                    totalRating:totalrating,
                    userRating:userrating,
                    averageRating:averagerating
            });
            res.status(201).json({status:true, message:"Successfully added review"});

}

module.exports = {
    getReviews,
    addReview
}


