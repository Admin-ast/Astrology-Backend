const Blog = require("../models/Blog");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const dotenv = require("dotenv");
const multer = require("multer");

const crypto = require("crypto");
const fs = require("fs");
const sendWelcomeMail = require("../utils/welcomeMail");

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
dotenv.config();

//create blog
const createBlog = async (req, res) => {
  const uploader = async (path) => await uploads(path, "Images");
  let newPath;
  if (req.file) {
    newPath = await uploader(req.file?.path);
    fs.unlinkSync(req.file?.path);
  }
  req.body.featureImage = newPath;
  req.body.categories = JSON.parse(req.body.categories);
  const blog = await Blog.create(req.body);
  res.status(StatusCodes.CREATED).json({
    msg: "Blog has been successfully created",
    blog,
  });
};
// get all blog
const getAllBlogs = async (req, res) => {
  // res.send("get all blog");
  const blog = await Blog.find({});
  res.status(StatusCodes.OK).json({ blog, count: blog.length });
};

// get single blog
const getSingleBlog = async (req, res) => {
  const { id } = req.params;
  const blog = await Blog.findById(id);
  if (!blog) {
    throw new CustomError.BadRequestError("blog not found!");
  }
  res.status(StatusCodes.OK).json({ blog });
};

// update single blog
const updateBlog = async (req, res) => {
  req.body.categories = JSON.parse(req.body.categories);
  const uploader = async (path) => await uploads(path, "Images");
  // console.log(JSON.stringify(req.file));
  let newPath;
  const { id } = req.params;
  const updateInCloud = await Blog.findById(id);
  // console.log("path", updateInCloud?.featureImage[0]?.cloudinary_id);
  if (req.file && updateInCloud?.featureImage[0]?.cloudinary_id) {
    await cloudinary.uploader.destroy(
      updateInCloud?.featureImage[0]?.cloudinary_id
    );
  }
  if (req.file) {
    newPath = await uploader(req.file?.path);
    fs.unlinkSync(req.file?.path);
  }
  req.body.featureImage = newPath;
  const updatedBlog = await Blog.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!updatedBlog) {
    throw new CustomError.NotFoundError("Blog with this id is not found");
  }
  res
    .status(StatusCodes.OK)
    .json({ msg: "Blog has been updated successfully" });
  // const { id } = req.params;
  // const blog = await Blog.findById(id);
  // if (!blog) {
  //   throw new CustomError.NotFoundError("Blog with this id is not found");
  // }
  // const updatedBlog = await Blog.findOneAndUpdate({ _id: id }, req.body);
  // res.status(StatusCodes.CREATED).json({
  //   msg: "Blog has been updated successfully",
  // });
};

//delete single blog
const deleteSingleBlog = async (req, res) => {
  const { id } = req.params;
  const blog = await Blog.findById(id);
  if (!blog) {
    throw new CustomError.BadRequestError("blog not found with given Id!");
  }
  await blog.remove();
  res.status(StatusCodes.OK).json({ msg: "blog has been deleted" });
};

module.exports = {
  createBlog,
  getAllBlogs,
  getSingleBlog,
  deleteSingleBlog,
  updateBlog,
};
