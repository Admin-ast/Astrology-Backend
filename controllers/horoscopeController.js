const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

var btoa = require("btoa");

const horoscope = async (req, res) => {
  await fetch(`https://json.astrologyapi.com/v1/sun_sign_prediction/`, {
    method: "POST",
    headers: {
      Authorization:
        "Basic " + btoa(`${process.env.USER_ID}:${process.env.ACCESS_ID}`),
    },
  })
    .then((data) => data.json())
    .then((data) => res.status(StatusCodes.OK).json({ msg: "Success!", data }))
    .catch((err) =>
      res.status(StatusCodes.BAD_GATEWAY).json({ msg: "facing some issues!" })
    );
};
const getAllHoroscopeDetails = async (req, res) => {
  const { type } = req.params;
  if (type) {
    await fetch(
      `https://json.astrologyapi.com/v1/sun_sign_prediction/${type}`,
      {
        method: "POST",
        headers: {
          Authorization:
            "Basic " + btoa(`${process.env.USER_ID}:${process.env.ACCESS_ID}`),
        },
      }
    )
      .then((data) => data.json())
      .then((data) =>
        res.status(StatusCodes.OK).json({ msg: "Success!", data })
      )
      .catch((err) =>
        res.status(StatusCodes.BAD_GATEWAY).json({ msg: "facing some issues!" })
      );
  }
};
const getSingleHoroscopeSignDetails = async (req, res) => {
  const { zodiacName, type } = req.params;
  if (zodiacName && type) {
    await fetch(
      `https://json.astrologyapi.com/v1/sun_sign_prediction/${type}/${zodiacName}`,
      {
        method: "POST",
        headers: {
          Authorization:
            "Basic " + btoa(`${process.env.USER_ID}:${process.env.ACCESS_ID}`),
        },
      }
    )
      .then((data) => data.json())
      .then((data) =>
        res.status(StatusCodes.OK).json({ msg: "Success!", data })
      )
      .catch((err) =>
        res.status(StatusCodes.BAD_GATEWAY).json({ msg: "facing some issues!" })
      );
  }
};

module.exports = {
  horoscope,
  getAllHoroscopeDetails,
  getSingleHoroscopeSignDetails,
};
