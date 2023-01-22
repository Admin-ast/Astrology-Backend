const Event = require("../models/Event");
const Venue = require("../models/PartyVenue");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const dotenv = require("dotenv");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Multiplefile = require("../models/Multiplefile");
dotenv.config();
// images section
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "_" + Math.round(Math.random() * 1e9);
    cb(null, file.originalname + "_" + uniqueSuffix);
  },
});
// cloudinary start here with configuration
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDNARY_CLOUD_NAME,
  api_key: process.env.CLOUDNARY_API_KEY,
  api_secret: process.env.CLOUDNARY_API_SECRET,
});

const uploads = async (file) => {
  return new Promise((resolve) => {
    cloudinary.uploader.upload(file, (err, res) => {
      if (err) return res.status(500).send("upload image error");
      resolve({
        fileName: res.original_filename,
        filePath: res?.secure_url,
        fileType: res?.format,
        cloudinary_id: res?.public_id,
      });
    });
  });
};

const upload = multer({ storage: storage });

// controller
const createEvent = async (req, res) => {
  const { product, eventCode } = req.body;
  const venueDetails = await Venue.findOne({ _id: product });
  const deals = await Event.findOne({ eventCode });

  if (!venueDetails) {
    throw new CustomError.BadRequestError("Venue not found!");
  }
  if (deals) {
    throw new CustomError.BadRequestError("Event already exist");
  }

  //   uploader
  const uploader = async (path) => await uploads(path, "Images");

  req.body.eventDate = JSON.parse(req.body.eventDate);
  req.body.timing = req.body.timing ? JSON.parse(req.body.timing) : "";
  req.body.priceRange = JSON.parse(req.body.priceRange);
  req.body.packages = JSON.parse(req.body.packages);

  let newBannerImage;
  //   let newTitleImage;

  //   banner image
  if (req.files?.bannerImage) {
    newBannerImage = await uploader(req.files?.bannerImage[0].path);
    fs.unlinkSync(req.files?.bannerImage[0].path);
  }

  let filesArray = [];
  let files = req.files?.titleImage;
  if (files) {
    for (const file of files) {
      const { path } = file;
      const newPath = await uploader(path);
      filesArray.push(newPath);
      fs.unlinkSync(path);
    }
  }

  req.body.bannerImage = newBannerImage;
  //   adding image to mongodb
  req.body.packages[0].titleImage = filesArray[0];

  for (i = 0; i < req.body.packages.length; i++) {
    for (s = 0; s < filesArray.length; s++) {
      req.body.packages[i].titleImage = filesArray[i];
    }
  }

  const event = await Event.create(req.body);
  res.status(StatusCodes.CREATED).json({
    msg: "Event has been created",
  });
};
// get all event
const getAllEvents = async (req, res) => {
  const event = await Event.find({}).populate({
    path: "product",
    select: "venueName venueCode city state",
  });
  res.status(StatusCodes.OK).json({ event, count: event.length });
};
// get single event
const getSingleEvents = async (req, res) => {
  const { eventCode } = req.params;
  const event = await Event.findOne({ eventCode });
  const venueCode = await Event.findOne({ eventCode }).populate({
    path: "product",
    select: "venueName venueCode city state",
  });
  const venueDetails = await Venue.findOne({
    venueCode: venueCode?.product?.venueCode,
  });
  const gallery = await Multiplefile.findOne({
    venueCode: venueCode?.product?.venueCode,
  });
  console.log(venueCode);
  if (!event) {
    throw new CustomError.BadRequestError("event not found!");
  }

  res.status(StatusCodes.OK).json({
    event: event,
    amenities: venueDetails?.amenities,
    bestSuitedFor: venueDetails?.bestSuitedFor,
    description: venueDetails?.description,
    typeOfCuisines: venueDetails?.typeOfCuisines,
    gallery: gallery?.files,
    venueName: venueDetails?.venueName,
    city: venueDetails?.city,
    state: venueDetails?.state,
    mapUrl: venueDetails?.mapUrl,
  });
};

//update events
const updateEvents = async (req, res) => {
  console.log("req", req.body);
  const { product, eventCode } = req.body;
  const venueDetails = await Venue.findOne({ _id: product });
  const deals = await Event.findOne({ eventCode });

  if (!venueDetails) {
    throw new CustomError.BadRequestError("Venue not found!");
  }
  if (!deals) {
    throw new CustomError.BadRequestError("Event code doesn't exist");
  }

  req.body.eventDate = JSON.parse(req.body.eventDate);
  req.body.timing = req.body.timing ? JSON.parse(req.body.timing) : "";
  req.body.priceRange = JSON.parse(req.body.priceRange);
  req.body.packages = JSON.parse(req.body.packages);

  // const images = await Multiplefile.findOne({ venueCode: venueCode });

  // const uploader = async (path) => await uploads(path, "Images");

  // let files1 = req?.files;
  // let filesArray = [];
  // console.log(files1[0]?.fieldname == "files");

  // if (files1[0]?.fieldname == "files") {
  //   for (const file of files1) {
  //     const { path } = file;
  //     const newPath = await uploader(path);
  //     filesArray.push(newPath);
  //     fs.unlinkSync(path);
  //   }
  // }

  // if (files1[0]?.fieldname == "files") {
  //   const image = await Multiplefile.findOneAndUpdate(
  //     { venueCode: venueCode },
  //     {
  //       title: req.body.title,
  //       venueCode: req.body.venueCode,
  //       files: filesArray,
  //     }
  //   );
  // }

  const updateDeal = await Event.findOneAndUpdate(
    { eventCode: eventCode },
    req.body
  );

  res
    .status(StatusCodes.CREATED)
    .json({ msg: "Events Details have been updated successfully" });
};

const deleteSingleEvents = async (req, res) => {
  const { eventCode } = req.params;
  const event = await Event.findOne({ eventCode });
  if (!event) {
    throw new CustomError.BadRequestError("event not found!");
  }

  let files = event?.bannerImage;
  if (files) {
    for (const file of files) {
      const { cloudinary_id } = file;
      console.log(path);
      await cloudinary.uploader.destroy(cloudinary_id);
    }
  }
  let titleImage = event?.packages;
  if (files) {
    for (const file of titleImage) {
      const { cloudinary_id } = file.titleImage[0];
      console.log(path);
      await cloudinary.uploader.destroy(cloudinary_id);
    }
  }

  await event.remove();
  res.status(StatusCodes.OK).json({ msg: "event has been deleted" });
};

// fetching venueName and Code
const venueNameCode = async (req, res) => {
  let venueNameCode = await Venue.find({}, { venueCode: 1, venueName: 1 });

  res.status(StatusCodes.OK).json({
    venueNameCode,
    count: venueNameCode.length,
  });
};

module.exports = {
  createEvent,
  getAllEvents,
  getSingleEvents,
  deleteSingleEvents,
  updateEvents,
  venueNameCode,
};
