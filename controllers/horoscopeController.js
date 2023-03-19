const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

var btoa = require("btoa");

const horoscope = async (req, res) => {
  //   if (!user) {
  //     throw new CustomError.NotFoundError(`Astrologer not found`);
  //   }
  const { zodiacName } = req.params;
  if (zodiacName) {
    await fetch(
      `https://json.astrologyapi.com/v1/sun_sign_prediction/daily/${zodiacName}`,
      {
        method: "POST",
        headers: {
          Authorization:
            "Basic " + btoa("622630:d32276c1ff63c7f01a41816f4dabbdd3"),
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
};
