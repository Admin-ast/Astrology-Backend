const { StatusCodes } = require("http-status-codes");
const Kundli = require("../models/Kundli");
const { useFetcher } = require("../services/useFetcher");

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

const getPlanetDetails = async (req, res) => {
  const bodyData = req.body;
  const url = "/planets";
  const response = await useFetcher(url, bodyData);
  return res.status(StatusCodes.OK).json({ msg: "Success!", response });
};

const getKPPlanetDetails = async (req, res) => {
  const bodyData = req.body;
  const url = "/kp_planets";
  const response = await useFetcher(url, bodyData);
  return res.status(StatusCodes.OK).json({ msg: "Success!", response });
};

const getKPHouseCuspsDetails = async (req, res) => {
  const bodyData = req.body;
  const url = "/kp_house_cusps";
  const response = await useFetcher(url, bodyData);
  return res.status(StatusCodes.OK).json({ msg: "Success!", response });
};

const getAvakhadaDetails = async (req, res) => {
  const bodyData = req.body;
  const url = "/astro_details";
  const response = await useFetcher(url, bodyData);
  return res.status(StatusCodes.OK).json({ msg: "Success!", response });
};

const getBirthDetails = async (req, res) => {
  const bodyData = req.body;
  const url = "/birth_details";
  const response = await useFetcher(url, bodyData);
  return res.status(StatusCodes.OK).json({ msg: "Success!", response });
};

module.exports = {
  newKundli,
  kundliMatching,
  getSavedKundliDetails,
  getPlanetDetails,
  getKPPlanetDetails,
  getKPHouseCuspsDetails,
  getAvakhadaDetails,
  getBirthDetails,
};
