const multer = require("multer");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const ImageModel = require("../models/Image");

//storage
const Storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const uploads = multer({
  storage: Storage,
}).single("testImage");

const uploadController = (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.render("index", {
        msg: err,
      });
    } else {
      if (req.file == undefined) {
        res.render("index", {
          msg: "Error: No File Selected!",
        });
      } else {
        res.render("index", {
          msg: "File Uploaded!",
          file: `uploads/${req.file.filename}`,
        });
      }
    }
  });
};
module.exports = {
  uploads,
  uploadController,
};
