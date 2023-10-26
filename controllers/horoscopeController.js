const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const fetch = require("cross-fetch");

var btoa = require("btoa");
const { useFetcher } = require("../services/jsonFetcher");

const horoscope = async (req, res) => {
  const bodyData = req.body;
  const url = "/sun_sign_prediction/daily";
  const { zodiac } = req.query;
  const response = await useFetcher(`${url}/${zodiac}`, bodyData);
  if (response.status === 200) {
    return res
      .status(response.status)
      .json({ status: true, res: response.res });
  } else {
    console.log(response);
    return res.status(response.status).json(response.res);
  }
};

const horoscopeNext = async (req, res) => {
  const bodyData = req.body;
  const url = "/sun_sign_prediction/daily";
  const { zodiac } = req.query;
  const response = await useFetcher(`${url}/${zodiac}`, bodyData);
  if (response.status === 200) {
    return res
      .status(response.status)
      .json({ status: true, res: response.res });
  } else {
    return res.status(response.status).json(response.res);
  }
};

// const horoscopeWeekly = async (req, res) => {
//   const bodyData = req.body;
//   const url = "/horoscope_prediction/weekly/:zodiacName";
//   const response = await useFetcher(url, bodyData);
//   if (response.status === 200) {
//     return res
//       .status(response.status)
//       .json({ status: true, res: response.res });
//   } else {
//     return res.status(response.status).json(JSON.parse(response.res));
//   }
// };

const horoscopePrev = async (req, res) => {
  const bodyData = req.body;
  const url = "/sun_sign_prediction/daily";
  const { zodiac } = req.query;
  const response = await useFetcher(`${url}/${zodiac}`, bodyData);
  if (response.status === 200) {
    return res
      .status(response.status)
      .json({ status: true, res: response.res });
  } else {
    return res.status(response.status).json(response.res);
  }
};

const horoscopeMonth = async (req, res) => {
  const bodyData = req.body;
  const url = "/horoscope_prediction/monthly";
  const { zodiac } = req.query;
  const response = await useFetcher(`${url}/${zodiac}`, bodyData);
  if (response.status === 200) {
    return res
      .status(response.status)
      .json({ status: true, res: response.res });
  } else {
    return res.status(response.status).json(response.res);
  }
};

const getAllHoroscopeDetails = async (req, res) => {
  const bodyData = req.body;
  const url = "/sun_sign_prediction/daily/aries";
  const response = await useFetcher(url, bodyData);
  console.log(response);
  if (response.status === 200) {
    return res
      .status(response.status)
      .json({ status: true, res: response.res });
  } else {
    return res.status(response.status).json(JSON.parse(response.res));
  }
};

const combinedHoroCharts = async (req, res) => {
  const bodyData = req.body;
  const p1 = await useFetcher("/horo_chart_image/chalit", bodyData);
  const p2 = await useFetcher("/horo_chart_image/sun", bodyData);
  const p3 = await useFetcher("/horo_chart_image/moon", bodyData);
  const p4 = await useFetcher("/horo_chart_image/d1", bodyData);
  const p5 = await useFetcher("/horo_chart_image/d2", bodyData);
  const p6 = await useFetcher("/horo_chart_image/d3", bodyData);
  const p7 = await useFetcher("/horo_chart_image/d4", bodyData);
  const p8 = await useFetcher("/horo_chart_image/d5", bodyData);
  const p9 = await useFetcher("/horo_chart_image/d7", bodyData);
  const p10 = await useFetcher("/horo_chart_image/d8", bodyData);
  const p11 = await useFetcher("/horo_chart_image/d9", bodyData);
  const p12 = await useFetcher("/horo_chart_image/d12", bodyData);
  const p13 = await useFetcher("/horo_chart_image/d16", bodyData);
  const p14 = await useFetcher("/horo_chart_image/d20", bodyData);
  const p15 = await useFetcher("/horo_chart_image/d24", bodyData);
  const p16 = await useFetcher("/horo_chart_image/d27", bodyData);
  const p17 = await useFetcher("/horo_chart_image/d30", bodyData);
  const p18 = await useFetcher("/horo_chart_image/d40", bodyData);
  const p19 = await useFetcher("/horo_chart_image/d45", bodyData);
  const p20 = await useFetcher("/horo_chart_image/d60", bodyData);
  const p21 = await useFetcher("/horo_chart_image/d10", bodyData);
  var data = {};
  if (p1.status === 200 && p1.res) {
    data.chalit = p1.res;
  }
  if (p2.status === 200 && p2.res) {
    data.sun = p2.res;
  }
  if (p3.status === 200 && p3.res) {
    data.moon = p3.res;
  }
  if (p4.status === 200 && p4.res) {
    data.d1 = p4.res;
  }
  if (p5.status === 200 && p5.res) {
    data.d2 = p5.res;
  }
  if (p6.status === 200 && p6.res) {
    data.d3 = p6.res;
  }
  if (p7.status === 200 && p7.res) {
    data.d4 = p7.res;
  }
  if (p8.status === 200 && p8.res) {
    data.d5 = p8.res;
  }
  if (p9.status === 200 && p9.res) {
    data.d7 = p9.res;
  }
  if (p10.status === 200 && p10.res) {
    data.d8 = p10.res;
  }
  if (p11.status === 200 && p11.res) {
    data.d9 = p11.res;
  }
  if (p12.status === 200 && p12.res) {
    data.d12 = p12.res;
  }
  if (p13.status === 200 && p13.res) {
    data.d16 = p13.res;
  }
  if (p14.status === 200 && p14.res) {
    data.d20 = p14.res;
  }
  if (p15.status === 200 && p15.res) {
    data.d24 = p15.res;
  }
  if (p16.status === 200 && p16.res) {
    data.d27 = p16.res;
  }
  if (p17.status === 200 && p17.res) {
    data.d30 = p17.res;
  }
  if (p18.status === 200 && p18.res) {
    data.d40 = p18.res;
  }
  if (p19.status === 200 && p19.res) {
    data.d45 = p19.res;
  }
  if (p20.status === 200 && p20.res) {
    data.d60 = p19.res;
  }
  if (p21.status === 200 && p21.res) {
    data.d10 = p21.res;
  }

  // p2.status = 200 && (data.sun = p2);
  // Promise.all([
  //   p1,
  //   p2,
  //   p3,
  //   p4,
  //   p5,
  //   p6,
  //   p7,
  //   p8,
  //   p9,
  //   p10,
  //   p11,
  //   p12,
  //   p13,
  //   p14,
  //   p15,
  //   p16,
  //   p17,
  //   p18,
  //   p19,
  //   p20,
  //   p21,
  // ]).then((values) => {
  //   if (values) {
  //     return res.status(200).json({ status: true, res: values });
  //   }
  // });
  res.status(200).json({ state: true, res: data });
};

const horoChart = async (req, res) => {
  const bodyData = req.body;
  const p1 = await useFetcher("/horo_chart/chalit", bodyData);
  const p2 = await useFetcher("/horo_chart/sun", bodyData);
  const p3 = await useFetcher("/horo_chart/moon", bodyData);
  const p4 = await useFetcher("/horo_chart/d1", bodyData);
  const p5 = await useFetcher("/horo_chart/d2", bodyData);
  const p6 = await useFetcher("/horo_chart/d3", bodyData);
  const p7 = await useFetcher("/horo_chart/d4", bodyData);
  const p8 = await useFetcher("/horo_chart/d5", bodyData);
  const p9 = await useFetcher("/horo_chart/d7", bodyData);
  const p10 = await useFetcher("/horo_chart/d8", bodyData);
  const p11 = await useFetcher("/horo_chart/d9", bodyData);
  const p12 = await useFetcher("/horo_chart/d12", bodyData);
  const p13 = await useFetcher("/horo_chart/d16", bodyData);
  const p14 = await useFetcher("/horo_chart/d20", bodyData);
  const p15 = await useFetcher("/horo_chart/d24", bodyData);
  const p16 = await useFetcher("/horo_chart/d27", bodyData);
  const p17 = await useFetcher("/horo_chart/d30", bodyData);
  const p18 = await useFetcher("/horo_chart/d40", bodyData);
  const p19 = await useFetcher("/horo_chart/d45", bodyData);
  const p20 = await useFetcher("/horo_chart/d60", bodyData);
  const p21 = await useFetcher("/horo_chart_image/d10", bodyData);
  var data = {};
  if (p1.status === 200 && p1.res) {
    data.chalit =  p1.res;
  }
  if (p2.status === 200 && p2.res) {
    data.sun = p2.res;
  }
  if (p3.status === 200 && p3.res) {
    data.moon = p3.res;
  }
  if (p4.status === 200 && p4.res) {
    data.d1 = p4.res;
  }
  if (p5.status === 200 && p5.res) {
    data.d2 = p5.res;
  }
  if (p6.status === 200 && p6.res) {
    data.d3 = p6.res;
  }
  if (p7.status === 200 && p7.res) {
    data.d4 = p7.res;
  }
  if (p8.status === 200 && p8.res) {
    data.d5 = p8.res;
  }
  if (p9.status === 200 && p9.res) {
    data.d7 = p9.res;
  }
  if (p10.status === 200 && p10.res) {
    data.d8 = p10.res;
  }
  if (p11.status === 200 && p11.res) {
    data.d9 = p11.res;
  }
  if (p12.status === 200 && p12.res) {
    data.d12 = p12.res;
  }
  if (p13.status === 200 && p13.res) {
    data.d16 = p13.res;
  }
  if (p14.status === 200 && p14.res) {
    data.d20 = p14.res;
  }
  if (p15.status === 200 && p15.res) {
    data.d24 = p15.res;
  }
  if (p16.status === 200 && p16.res) {
    data.d27 = p16.res;
  }
  if (p17.status === 200 && p17.res) {
    data.d30 = p17.res;
  }
  if (p18.status === 200 && p18.res) {
    data.d40 = p18.res;
  }
  if (p19.status === 200 && p19.res) {
    data.d45 = p19.res;
  }
  if (p20.status === 200 && p20.res) {
    data.d60 = p19.res;
  }
  if (p21.status === 200 && p21.res) {
    data.d10 = p21.res;
  }

  // p2.status = 200 && (data.sun = p2);
  // Promise.all([
  //   p1,
  //   p2,
  //   p3,
  //   p4,
  //   p5,
  //   p6,
  //   p7,
  //   p8,
  //   p9,
  //   p10,
  //   p11,
  //   p12,
  //   p13,
  //   p14,
  //   p15,
  //   p16,
  //   p17,
  //   p18,
  //   p19,
  //   p20,
  //   p21,
  // ]).then((values) => {
  //   if (values) {
  //     return res.status(200).json({ status: true, res: values });
  //   }
  // });
  res.status(200).json({ state: true, res: data });
};

const combinedHoroPredictions = async (req, res) => {
  var { type } = req.query;
  var { day } = req.query;

  const bodyData = req.body;

  if (!type || !["daily", "monthly"].includes(type)) {
    return res.status(401).json({ message: "valid type required" });
  }
  if (type == "daily" && !["previous", "next", "today"].includes(day)) {
    return res.status(401).json({ message: "valid day required" });
  }
  if (type == "monthly") {
    day = "";
  }
  if (day == "today") {
    day = "";
  }
  const url = type == "daily" ? "sun_sign_prediction" : "horoscope_prediction";
  // console.log(`/sun_sign_prediction/${type}${day && `/${day}`}/aries`);
  var data = {};
  const p1 = await useFetcher(
    `/${url}/${type}${day && `/${day}`}/aries`,
    bodyData
  );
  console.log(p1.res);
  if (p1.status === 200 && p1.res) {
    data.aries = p1.res;
  }
  const p2 = await useFetcher(
    `/${url}/${type}${day && `/${day}`}/taurus`,
    bodyData
  );
  if (p2.status === 200 && p2.res) {
    data.taurus = p2.res;
  }
  const p3 = await useFetcher(
    `/${url}/${type}${day && `/${day}`}/gemini`,
    bodyData
  );
  if (p3.status === 200 && p3.res) {
    data.gemini = p3.res;
  }
  const p4 = await useFetcher(
    `/${url}/${type}${day && `/${day}`}/cancer`,
    bodyData
  );
  if (p4.status === 200 && p4.res) {
    data.cancer = p4.res;
  }
  const p5 = await useFetcher(
    `/${url}/${type}${day && `/${day}`}/leo`,
    bodyData
  );
  if (p5.status === 200 && p5.res) {
    data.leo = p5.res;
  }
  const p6 = await useFetcher(
    `/${url}/${type}${day && `/${day}`}/virgo`,
    bodyData
  );
  if (p6.status === 200 && p6.res) {
    data.virgo = p6.res;
  }
  const p7 = await useFetcher(
    `/${url}/${type}${day && `/${day}`}/libra`,
    bodyData
  );
  if (p7.status === 200 && p7.res) {
    data.libra = p7.res;
  }
  const p8 = await useFetcher(
    `/${url}/${type}${day && `/${day}`}/scorpio`,
    bodyData
  );
  if (p8.status === 200 && p8.res) {
    data.scorpio = p8.res;
  }
  const p9 = await useFetcher(
    `/${url}/${type}${day && `/${day}`}/sagittarius`,
    bodyData
  );
  if (p9.status === 200 && p9.res) {
    data.sagittarius = p9.res;
  }
  const p10 = await useFetcher(
    `/${url}/${type}${day && `/${day}`}/capricorn`,
    bodyData
  );
  if (p10.status === 200 && p10.res) {
    data.capricorn = p10.res;
  }
  const p11 = await useFetcher(
    `/${url}/${type}${day && `/${day}`}/aquarius`,
    bodyData
  );
  if (p11.status === 200 && p11.res) {
    data.aquarius = p11.res;
  }
  const p12 = await useFetcher(
    `/${url}/${type}${day && `/${day}`}/pisces`,
    bodyData
  );
  if (p12.status === 200 && p12.res) {
    data.pisces = p12.res;
  }
  res.status(200).json({ message: "working", res: data });
};

// const availableZodaic = [
//   "aries",
//   "taurus",
//   "gemini",
//   "cancer",
//   "leo",
//   "virgo",
//   "libra",
//   "scorpio",
//   "sagittarius",
//   "capricorn",
//   "aquarius",
//   "pisces",
// ];
module.exports = {
  horoscope,
  combinedHoroCharts,
  horoChart,
  getAllHoroscopeDetails,
  horoscopeMonth,
  horoscopePrev,
  horoscopeNext,
  combinedHoroPredictions,
  // horoscopeWeekly,
};
