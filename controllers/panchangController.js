const { StatusCodes } = require("http-status-codes");
const { useFetcher } = require("../services/useFetcher");

const basicPanchang = async (req, res) => {
  const bodyData = req.body;
  console.log("req", req.body);
  const url = "/basic_panchang";
  const response = await useFetcher(url, bodyData);
  return res.status(StatusCodes.OK).json({ msg: "Success!", response });
};
const ashubhaMuhurat = async (req, res) => {
  const bodyData = req.body;
  console.log("req", req.body);
  const url = "/advanced_panchang/sunrise";
  const response = await useFetcher(url, bodyData);
  return res.status(StatusCodes.OK).json({ msg: "Success!", response });
};

module.exports = { basicPanchang, ashubhaMuhurat };
