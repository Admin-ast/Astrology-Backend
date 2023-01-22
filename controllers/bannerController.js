const HeroBanner = require("../models/Banner");
const { StatusCodes } = require("http-status-codes");
const Product = require("../models/Banner");
const Multiplefile = require("../models/Multiplefile");

const fs = require("fs");

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

const heroBanner = async (req, res) => {
  const uploader = async (path) => await uploads(path, "Images");

  let filesArray = [];
  let files = req.files;
  for (const file of files) {
    const { path } = file;
    const newPath = await uploader(path);
    filesArray.push(newPath);
    fs.unlinkSync(path);
  }
  req.body.image = filesArray;
  const bannerAdd = await HeroBanner.create(req.body);
  res
    .status(StatusCodes.CREATED)
    .json({ msg: "Banner has been added successfully !" });
};

const getHeroBanner = async (req, res) => {
  const heroBanner = await HeroBanner.find({ status: "active" });
  //   res.send(heroBanner);
  res.status(StatusCodes.OK).json(heroBanner);
};

const deleteHeroBanner = async (req, res) => {
  const { id } = req.params;
  const uploader = async (path) => await uploads(path, "Images");

  const product = await Product.findOne({ id });
  const images = await HeroBanner.findOne({ id });

  let files = images?.files;
  if (files) {
    for (const file of files) {
      const { cloudinary_id } = file;
      // console.log(path);
      await uploader.destroy(cloudinary_id);
    }
  }
  await images?.remove();
  if (!product) {
    throw new CustomError.NotFoundError(`No banner found`);
  }

  await product?.remove();

  res.status(StatusCodes.OK).json({ msg: "Success! Banner removed." });
};

module.exports = { getHeroBanner, heroBanner, deleteHeroBanner };
