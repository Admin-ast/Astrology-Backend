const { StatusCodes } = require("http-status-codes");
const { useFetcher } = require("../services/useFetcher");

const basicPanchang = async (req, res) => {
  const bodyData = req.body;
  console.log("req", req.body);
  const url = "/advanced_panchang";
  const response = await useFetcher(url, bodyData);
  if (response.status === 200) {
    return res
      .status(response.status)
      .json({ status: true, res: JSON.parse(response.res) });
  } else {
    return res.status(response.status).json(JSON.parse(response.res));
  }
};
const ashubhaMuhurat = async (req, res) => {
  const bodyData = req.body;
  console.log("req", req.body);
  const url = "/advanced_panchang/sunrise";
  const response = await useFetcher(url, bodyData);
  if (response.status === 200) {
    return res
      .status(response.status)
      .json({ status: true, res: JSON.parse(response.res) });
  } else {
    return res.status(response.status).json(JSON.parse(response.res));
  }
};
const planetPanSunRise = async (req, res) => {
  const bodyData = req.body;
  console.log("req", req.body);
  const url = "/planet_panchang/sunrise";
  const response = await useFetcher(url, bodyData);
  if (response.status === 200) {
    return res
      .status(response.status)
      .json({ status: true, res: JSON.parse(response.res) });
  } else {
    return res.status(response.status).json(JSON.parse(response.res));
  }
};

module.exports = { basicPanchang, ashubhaMuhurat, planetPanSunRise };
