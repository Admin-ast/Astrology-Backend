const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const Kundli = require("../models/Kundli");

var btoa = require("btoa");

const newKundli = async (req, res) => {
  await fetch(`https://json.astrologyapi.com/v1/sun_sign_prediction/`, {
    method: "POST",
    headers: {
      Authorization:
        "Basic " + btoa(`${process.env.USER_ID}:${process.env.ACCESS_ID}`),
    },
    body: JSON.stringify(req),
  })
    .then((data) => data.json())
    .then((data) => {
      Kundli.create({ ...data, type: "kundli" });
      res.status(StatusCodes.OK).json({ msg: "Success!", data });
    })
    .catch((err) =>
      res.status(StatusCodes.BAD_GATEWAY).json({ msg: "facing some issues!" })
    );
};

const kundliMatching = async (req, res) => {
  await fetch(`https://json.astrologyapi.com/v1/sun_sign_prediction/`, {
    method: "POST",
    headers: {
      Authorization:
        "Basic " + btoa(`${process.env.USER_ID}:${process.env.ACCESS_ID}`),
    },
    body: JSON.stringify(req),
  })
    .then((data) => data.json())
    .then((data) => {
      Kundli.create({ ...data, type: "matching" });
      res.status(StatusCodes.OK).json({ msg: "Success!", data });
    })
    .catch((err) =>
      res.status(StatusCodes.BAD_GATEWAY).json({ msg: "facing some issues!" })
    );
};

const getSavedKundliDetails = async (req, res) => {
  const { type } = req.params;
  const kundliDetail = Kundli.find({ type });
  if (kundliDetail) {
    return res.status(StatusCodes.OK).json({ msg: "Success!", kundliDetail });
  }
  res.status(StatusCode.NOT_FOUND).json({ msg: "Nothing available" });
};

module.exports = {
  newKundli,
  kundliMatching,
  getSavedKundliDetails,
};
