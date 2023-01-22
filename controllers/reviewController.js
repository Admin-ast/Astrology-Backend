const Review = require("../models/Review");
const Product = require("../models/PartyVenue");
const Users = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const { checkPermissions } = require("../utils");

const createReview = async (req, res) => {
  const {
    venueId,
    userId,
    ambienceRating,
    cleanlinessRating,
    comment,
    foodRating,
    overallRating,
    serviceRating,
    title,
    valueRating,
  } = req.body;

  const isValidProduct = await Product.findOne({ _id: venueId });
  if (!isValidProduct) {
    throw new CustomError.NotFoundError(`No venue found`);
  }
  // const alreadySubmitted = await Review.findOne({
  //   product: venueId,
  //   user: userId,
  // });
  // if (alreadySubmitted) {
  //   throw new CustomError.BadRequestError(
  //     "Already submitted review for this product"
  //   );
  // }
  req.body.user = userId;
  req.body.product = venueId;
  const insertionObject = {
    foodRating: foodRating,
    cleanlinessRating: cleanlinessRating,
    ambienceRating: ambienceRating,
    serviceRating: serviceRating,
    valueRating: valueRating,
    overallRating: overallRating,
    title: title,
    comment: comment,
    user: userId,
    product: venueId,
  };
  const review = await Review.create(insertionObject);
  res.status(StatusCodes.CREATED).json({ review });
};
const getAllReviews = async (req, res) => {
  const reviews = await Review.find({}).populate({
    path: "product",
    select: "name company price",
  });

  const user = await Review.find({}).populate({
    path: "user",
    select: "firstName lastName email",
  });

  res.status(StatusCodes.OK).json({ reviews, user, count: reviews.length });
};
const getSingleReview = async (req, res) => {
  const { id: venueCode } = req.params;

  const review = await Review.findOne({ venueCode: venueCode }).populate({
    path: "user",
    select: "firstName lastName email",
  });

  if (!review) {
    throw new CustomError.NotFoundError(`No review found`);
  }

  res.status(StatusCodes.OK).json({ review });
};
const updateReview = async (req, res) => {
  const {
    venueId,
    userId,
    ambienceRating,
    cleanlinessRating,
    comment,
    foodRating,
    overallRating,
    serviceRating,
    title,
    valueRating,
  } = req.body;
  const insertionObject = {
    foodRating: foodRating,
    cleanlinessRating: cleanlinessRating,
    ambienceRating: ambienceRating,
    serviceRating: serviceRating,
    valueRating: valueRating,
    overallRating: overallRating,
    title: title,
    comment: comment,
    user: userId,
    product: venueId,
  };
  const review = await Review.findOneAndUpdate(
    {
      user: userId,
      product: venueId,
    },
    insertionObject,
    { new: true }
  );
  if (!review) {
    throw new CustomError.NotFoundError(`No review found`);
  }

  // checkPermissions(req.user, review.user);

  // review.rating = rating;
  // review.title = title;
  // review.comment = comment;

  // await review.save();
  res.status(StatusCodes.OK).json({ review });
};
const deleteReview = async (req, res) => {
  const { id: reviewId } = req.params;
  const review = await Review.findOne({ _id: reviewId });
  // console.log(review);

  if (!review) {
    throw new CustomError.NotFoundError(`No review found`);
  }

  // checkPermissions(req.user, review.user);
  await review.remove();
  res.status(StatusCodes.OK).json({ msg: "Success! Review removed" });
};
const calculateSum = (arr) => {
  return arr.reduce((total, current) => {
    return total + current;
  }, 0);
};

const getSingleVenueReviews = async (req, res) => {
  const { id: venueCode } = req.params;
  // console.log(venueCode);
  const product = await Product.find({ venueCode: venueCode });
  const productCode = product[0].id;
  // console.log("review controller", product[0].id);

  const reviews = await Review.find({ product: productCode }).populate({
    path: "user",
    select: "firstName lastName email",
  });
  // const findUserName = await Users.find
  const foodArray = reviews.map((item) => item?.foodRating);
  const cleanlinessArray = reviews.map((item) => item?.cleanlinessRating);
  const ambienceArray = reviews.map((item) => item.ambienceRating);
  const serviceArray = reviews.map((item) => item.serviceRating);
  const valueArray = reviews.map((item) => item.valueRating);
  const overallArray = reviews.map((item) => item.overallRating);
  const foodAverage = calculateSum(foodArray) / reviews.length ?? 0;
  const cleanlinessAverage =
    calculateSum(cleanlinessArray) / reviews.length ?? 0;
  const ambienceAverage = calculateSum(ambienceArray) / reviews.length ?? 0;
  const serviceAverage = calculateSum(serviceArray) / reviews.length ?? 0;
  const valueAverage = calculateSum(valueArray) / reviews.length ?? 0;
  const overallAverage = calculateSum(overallArray) / reviews.length ?? 0;
  res.status(StatusCodes.OK).json({
    reviews,
    count: reviews.length,
    foodAverage,
    cleanlinessAverage,
    ambienceAverage,
    serviceAverage,
    valueAverage,
    overallAverage,
  });
};

const getReviewByUser = async (req, res) => {
  const { userId, venueCode } = req.body;
  // console.log(userId, venueCode);
  const review = await Review.findOne({ user: userId, product: venueCode });
  res.status(StatusCodes.OK).json({ review });
};

module.exports = {
  createReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
  getSingleVenueReviews,
  getReviewByUser,
};
