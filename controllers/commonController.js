const { StatusCodes } = require("http-status-codes");
const Kundli = require("../models/Kundli");
const { useFetcher } = require("../services/useFetcher");
const fetch = require("cross-fetch");
var btoa = require("btoa");

// const commontRouting = async (url, bodyData) => {
//   // const url = "/planets";
//   const response = await useFetcher(url, bodyData);
//   return response;
// };

const getGhatChakra = async (req, res) => {
  const bodyData = req.body;
  const url = "/ghat_chakra";
  const response = await useFetcher(url, bodyData);
  if (response.status === 200) {
    return res
      .status(response.status)
      .json({ status: true, res: JSON.parse(response.res) });
  } else {
    return res.status(response.status).json(JSON.parse(response.res));
  }
};

const getHoroChart = async (req, res) => {
  const bodyData = req.body;
  const url = "/horo_chart/:chartId";
  const response = await useFetcher(url, bodyData);
  if (response.status === 200) {
    return res
      .status(response.status)
      .json({ status: true, res: JSON.parse(response.res) });
  } else {
    return res.status(response.status).json(JSON.parse(response.res));
  }
};

const getHoroChartImage = async (req, res) => {
  const bodyData = req.body;
  const url = req.url;
  const response = await useFetcher(url, bodyData);
  if (response.status === 200) {
    return res
      .status(response.status)
      .json({ status: true, res: JSON.parse(response.res) });
  } else {
    return res.status(response.status).json(JSON.parse(response.res));
  }
};

const getBhavMadhya = async (req, res) => {
  const bodyData = req.body;
  const url = "/bhav_madhya";
  const response = await useFetcher(url, bodyData);
  if (response.status === 200) {
    return res
      .status(response.status)
      .json({ status: true, res: JSON.parse(response.res) });
  } else {
    return res.status(response.status).json(JSON.parse(response.res));
  }
};

const getCurrentVdasha = async (req, res) => {
  const bodyData = req.body;
  const url = "/current_vdasha";
  const response = await useFetcher(url, bodyData);
  if (response.status === 200) {
    return res
      .status(response.status)
      .json({ status: true, res: JSON.parse(response.res) });
  } else {
    return res.status(response.status).json(JSON.parse(response.res));
  }
};

const getMajorVdasha = async (req, res) => {
  const bodyData = req.body;
  const url = "/major_vdasha";
  const response = await useFetcher(url, bodyData);
  if (response.status === 200) {
    return res
      .status(response.status)
      .json({ status: true, res: JSON.parse(response.res) });
  } else {
    return res.status(response.status).json(JSON.parse(response.res));
  }
};

const getCurrentVdashaDate = async (req, res) => {
  const bodyData = req.body;
  const url = "/current_vdasha_date";
  const response = await useFetcher(url, bodyData);
  if (response.status === 200) {
    return res
      .status(response.status)
      .json({ status: true, res: JSON.parse(response.res) });
  } else {
    return res.status(response.status).json(JSON.parse(response.res));
  }
};

const getSubVdasha = async (req, res) => {
  const bodyData = req.body;
  const originalUrl = req.originalUrl;
  

  const url = originalUrl.slice(7);
  const response = await useFetcher(url, bodyData);
  if (response.status === 200) {
    return res
      .status(response.status)
      .json({ status: true, res: JSON.parse(response.res) });
  } else {
    return res.status(response.status).json(JSON.parse(response.res));
  }
};

const getSubSubVdasha = async (req, res) => {
  const bodyData = req.body;
  const originalUrl = req.originalUrl;
  const url = originalUrl.slice(7);
  const response = await useFetcher(url, bodyData);
  if (response.status === 200) {
    return res
      .status(response.status)
      .json({ status: true, res: JSON.parse(response.res) });
  } else {
    return res.status(response.status).json(JSON.parse(response.res));
  }
};

const getSubSubSubDasha = async (req, res) => {
  const bodyData = req.body;
  const originalUrl = req.originalUrl;
  const url = originalUrl.slice(7);
  const response = await useFetcher(url, bodyData);
  if (response.status === 200) {
    return res
      .status(response.status)
      .json({ status: true, res: JSON.parse(response.res) });
  } else {
    return res.status(response.status).json(JSON.parse(response.res));
  }
};

const getSubSubSubSubVdasha = async (req, res) => {
  const bodyData = req.body;
  const originalUrl = req.originalUrl;
  const url = originalUrl.slice(7);
  const response = await useFetcher(url, bodyData);
  if (response.status === 200) {
    return res
      .status(response.status)
      .json({ status: true, res:JSON.parse(response.res) });
  } else {
    return res.status(response.status).json(JSON.parse(response.res));
  }
};

const getCurrentVdashaAll = async (req, res) => {
  const bodyData = req.body;
  const url = "/current_vdasha_all";
  const response = await useFetcher(url, bodyData);
  if (response.status === 200) {
    return res
      .status(response.status)
      .json({ status: true, res:JSON.parse(response.res) });
  } else {
    return res.status(response.status).json(JSON.parse(response.res));
  }
};

const getCurrentCharDasha = async (req, res) => {
  const bodyData = req.body;
  const url = "/current_chardasha";
  const response = await useFetcher(url, bodyData);
  if (response.status === 200) {
    return res
      .status(response.status)
      .json({ status: true, res: JSON.parse(response.res) });
  } else {
    return res.status(response.status).json(JSON.parse(response.res));
  }
};

const getCurrentYoginiVdasha = async (req, res) => {
  const bodyData = req.body;
  const url = "/current_yogini_dasha";
  const response = await useFetcher(url, bodyData);
  if (response.status === 200) {
    return res
      .status(response.status)
      .json({ status: true, res: JSON.parse(response.res) });
  } else {
    return res.status(response.status).json(JSON.parse(response.res));
  }
};

const getMajorCharVdasha = async (req, res) => {
  const bodyData = req.body;
  const url = "/major_chardasha";
  const response = await useFetcher(url, bodyData);
  if (response.status === 200) {
    return res
      .status(response.status)
      .json({ status: true, res: JSON.parse(response.res) });
  } else {
    return res.status(response.status).json(JSON.parse(response.res));
  }
};

const getMajorYoginiVdasha = async (req, res) => {
  const bodyData = req.body;
  const url = "/major_yogini_dasha";
  const response = await useFetcher(url, bodyData);
  if (response.status === 200) {
    return res
      .status(response.status)
      .json({ status: true, res: JSON.parse(response.res) });
  } else {
    return res.status(response.status).json(JSON.parse(response.res));
  }
};

const getSubCharVdasha = async (req, res) => {
  const bodyData = req.body;
  const url = "/sub_chardasha";
  const response = await useFetcher(url, bodyData);
  if (response.status === 200) {
    return res
      .status(response.status)
      .json({ status: true, res: JSON.parse(response.res) });
  } else {
    return res.status(response.status).json(JSON.parse(response.res));
  }
};

const getSubSubCharVdasha = async (req, res) => {
  const bodyData = req.body;
  const url = "/sub_sub_chardasha";
  const response = await useFetcher(url, bodyData);
  if (response.status === 200) {
    return res
      .status(response.status)
      .json({ status: true, res: JSON.parse(response.res) });
  } else {
    return res.status(response.status).json(JSON.parse(response.res));
  }
};

const getSubYoginiVdasha = async (req, res) => {
  const bodyData = req.body;
  console.log(req.url);
  console.log(req.body);
  const response = await useFetcher(req.url, bodyData);
  if (response.status === 200) {
    return res
      .status(response.status)
      .json({ status: true, res: JSON.parse(response.res) });
  } else {
    return res.status(response.status).json(JSON.parse(response.res));
  }
};

const getSarvasthak = async (req, res) => {
  const bodyData = req.body;
  const url = "/sarvashtak";
  const response = await useFetcher(url, bodyData);
  if (response.status === 200) {
    return res
      .status(response.status)
      .json({ status: true, res: JSON.parse(response.res) });
  } else {
    return res.status(response.status).json(JSON.parse(response.res));
  }
};

const getPlanetAstak = async (req, res) => {
  const bodyData = req.body;
  const url = "/planet_ashtak";
  const response = await useFetcher(url, bodyData);
  if (response.status === 200) {
    return res
      .status(response.status)
      .json({ status: true, res: JSON.parse(response.res) });
  } else {
    return res.status(response.status).json(JSON.parse(response.res));
  }
};

const getKalpsarpaDetails = async (req, res) => {
  const bodyData = req.body;
  const url = "/kalsarpa_details";
  const response = await useFetcher(url, bodyData);
  if (response.status === 200) {
    return res
      .status(response.status)
      .json({ status: true, res: JSON.parse(response.res) });
  } else {
    return res.status(response.status).json(JSON.parse(response.res));
  }
};

const getManglik = async (req, res) => {
  const bodyData = req.body;
  const url = "/manglik";
  const response = await useFetcher(url, bodyData);
  if (response.status === 200) {
    return res
      .status(response.status)
      .json({ status: true, res: JSON.parse(response.res) });
  } else {
    return res.status(response.status).json(JSON.parse(response.res));
  }
};

const getPitraDoshaReport = async (req, res) => {
  const bodyData = req.body;
  const url = "/pitra_dosha_report";
  const response = await useFetcher(url, bodyData);
  if (response.status === 200) {
    return res
      .status(response.status)
      .json({ status: true, res: JSON.parse(response.res) });
  } else {
    return res.status(response.status).json(JSON.parse(response.res));
  }
};

const getSadhesatiCurrentStatus = async (req, res) => {
  const bodyData = req.body;
  const url = "/sadhesati_current_status";
  const response = await useFetcher(url, bodyData);
  if (response.status === 200) {
    return res
      .status(response.status)
      .json({ status: true, res: JSON.parse(response.res) });
  } else {
    return res.status(response.status).json(JSON.parse(response.res));
  }
};

const getSadhesatiLifeDetails = async (req, res) => {
  const bodyData = req.body;
  const url = "/sadhesati_life_details";
  const response = await useFetcher(url, bodyData);
  if (response.status === 200) {
    return res
      .status(response.status)
      .json({ status: true, res: JSON.parse(response.res) });
  } else {
    return res.status(response.status).json(JSON.parse(response.res));
  }
};

const getSadhesatiRemedies = async (req, res) => {
  const bodyData = req.body;
  const url = "/sadhesati_remedies";
  const response = await useFetcher(url, bodyData);
  if (response.status === 200) {
    return res
      .status(response.status)
      .json({ status: true, res: JSON.parse(response.res) });
  } else {
    return res.status(response.status).json(JSON.parse(response.res));
  }
};

const getBasicGemSuggestion = async (req, res) => {
  const bodyData = req.body;
  const url = "/basic_gem_suggestion";
  const response = await useFetcher(url, bodyData);
  if (response.status === 200) {
    return res
      .status(response.status)
      .json({ status: true, res: JSON.parse(response.res) });
  } else {
    return res.status(response.status).json(JSON.parse(response.res));
  }
};

const getRudrakshSuggestion = async (req, res) => {
  const bodyData = req.body;
  const url = "/rudraksha_suggestion";
  const response = await useFetcher(url, bodyData);
  if (response.status === 200) {
    return res
      .status(response.status)
      .json({ status: true, res: JSON.parse(response.res) });
  } else {
    return res.status(response.status).json(JSON.parse(response.res));
  }
};

const getGeneralHouseReport = async (req, res) => {
  const bodyData = req.body;
  const url = "/general_house_report";
  const response = await useFetcher(url, bodyData);
  if (response.status === 200) {
    return res
      .status(response.status)
      .json({ status: true, res: JSON.parse(response.res) });
  } else {
    return res.status(response.status).json(JSON.parse(response.res));
  }
};

const getGeneralRashiReport = async (req, res) => {
  const bodyData = req.body;
  const url = "/general_rashi_report";
  const response = await useFetcher(url, bodyData);
  if (response.status === 200) {
    return res
      .status(response.status)
      .json({ status: true, res: JSON.parse(response.res) });
  } else {
    return res.status(response.status).json(JSON.parse(response.res));
  }
};

const getGeneralAscendantReport = async (req, res) => {
  const bodyData = req.body;
  const url = "/general_ascendant_report";
  const response = await useFetcher(url, bodyData);
  if (response.status === 200) {
    return res
      .status(response.status)
      .json({ status: true, res: JSON.parse(response.res) });
  } else {
    return res.status(response.status).json(JSON.parse(response.res));
  }
};

const getDailyNakshatraPrediction = async (req, res) => {
  const bodyData = req.body;
  const url = "/daily_nakshatra_prediction";
  const response = await useFetcher(url, bodyData);
  if (response.status === 200) {
    return res
      .status(response.status)
      .json({ status: true, res: JSON.parse(response.res) });
  } else {
    return res.status(response.status).json(JSON.parse(response.res));
  }
};

const getNumeraTable = async (req, res) => {
  const bodyData = req.body;
  const url = "/numero_table";
  const response = await useFetcher(url, bodyData);
  if (response.status === 200) {
    return res
      .status(response.status)
      .json({ status: true, res: JSON.parse(response.res) });
  } else {
    return res.status(response.status).json(JSON.parse(response.res));
  }
};

const getNumeraReport = async (req, res) => {
  const bodyData = req.body;
  const url = "/numero_report";
  const response = await useFetcher(url, bodyData);
  if (response.status === 200) {
    return res
      .status(response.status)
      .json({ status: true, res: JSON.parse(response.res) });
  } else {
    return res.status(response.status).json(JSON.parse(response.res));
  }
};

const getNumeraFavTime = async (req, res) => {
  const bodyData = req.body;
  const url = "/numero_fav_time";
  const response = await useFetcher(url, bodyData);
  if (response.status === 200) {
    return res
      .status(response.status)
      .json({ status: true, res: JSON.parse(response.res) });
  } else {
    return res.status(response.status).json(JSON.parse(response.res));
  }
};

const getNumeroPlaceVastu = async (req, res) => {
  const bodyData = req.body;
  const url = "/numero_place_vastu";
  const response = await useFetcher(url, bodyData);
  if (response.status === 200) {
    return res
      .status(response.status)
      .json({ status: true, res: JSON.parse(response.res) });
  } else {
    return res.status(response.status).json(JSON.parse(response.res));
  }
};

const getNumeroFastsReport = async (req, res) => {
  const bodyData = req.body;
  const url = "/numero_fasts_report";
  const response = await useFetcher(url, bodyData);
  if (response.status === 200) {
    return res
      .status(response.status)
      .json({ status: true, res: JSON.parse(response.res) });
  } else {
    return res.status(response.status).json(JSON.parse(response.res));
  }
};

const getNumeroFavLord = async (req, res) => {
  const bodyData = req.body;
  const url = "/numero_fav_lord";
  const response = await useFetcher(url, bodyData);
  if (response.status === 200) {
    return res
      .status(response.status)
      .json({ status: true, res: JSON.parse(response.res) });
  } else {
    return res.status(response.status).json(JSON.parse(response.res));
  }
};

const getNumeroFavMantra = async (req, res) => {
  const bodyData = req.body;
  const url = "/numero_fav_mantra";
  const response = await useFetcher(url, bodyData);
  if (response.status === 200) {
    return res
      .status(response.status)
      .json({ status: true, res: JSON.parse(response.res) });
  } else {
    return res.status(response.status).json(JSON.parse(response.res));
  }
};

const getChaughadiyaMuhurta = async (req, res) => {
  const bodyData = req.body;
  const url = "/chaughadiya_muhurta";
  const response = await useFetcher(url, bodyData);
  if (response.status === 200) {
    return res
      .status(response.status)
      .json({ status: true, res: JSON.parse(response.res) });
  } else {
    return res.status(response.status).json(JSON.parse(response.res));
  }
};

const getHoraMuhurta = async (req, res) => {
  const bodyData = req.body;
  const url = "/hora_muhurta";
  const response = await useFetcher(url, bodyData);
  if (response.status === 200) {
    return res
      .status(response.status)
      .json({ status: true, res: JSON.parse(response.res) });
  } else {
    return res.status(response.status).json(JSON.parse(response.res));
  }
};

const getMatchBirthDetails = async (req, res) => {
  const bodyData = req.body;
  const url = "/match_birth_details";
  const response = await useFetcher(url, bodyData);
  if (response.status === 200) {
    return res
      .status(response.status)
      .json({ status: true, res: JSON.parse(response.res) });
  } else {
    return res.status(response.status).json(JSON.parse(response.res));
  }
};

const getMatchAstroDetails = async (req, res) => {
  const bodyData = req.body;
  const url = "/match_astro_details";
  const response = await useFetcher(url, bodyData);
  if (response.status === 200) {
    return res
      .status(response.status)
      .json({ status: true, res: JSON.parse(response.res) });
  } else {
    return res.status(response.status).json(JSON.parse(response.res));
  }
};

const getMatchPlanetDetails = async (req, res) => {
  const bodyData = req.body;
  const url = "/match_planet_details";
  const response = await useFetcher(url, bodyData);
  if (response.status === 200) {
    return res
      .status(response.status)
      .json({ status: true, res: JSON.parse(response.res) });
  } else {
    return res.status(response.status).json(JSON.parse(response.res));
  }
};

const getMatchManglikReport = async (req, res) => {
  const bodyData = req.body;
  const url = "/match_manglik_report";
  const response = await useFetcher(url, bodyData);
  if (response.status === 200) {
    return res
      .status(response.status)
      .json({ status: true, res: JSON.parse(response.res) });
  } else {
    return res.status(response.status).json(JSON.parse(response.res));
  }
};

const getMatchObstructions = async (req, res) => {
  const bodyData = req.body;
  const url = "/match_obstructions";
  const response = await useFetcher(url, bodyData);
  if (response.status === 200) {
    return res
      .status(response.status)
      .json({ status: true, res: JSON.parse(response.res) });
  } else {
    return res.status(response.status).json(JSON.parse(response.res));
  }
};

const getMatchAshtakootPoints = async (req, res) => {
  const bodyData = req.body;
  const url = "/match_ashtakoot_points";
  const response = await useFetcher(url, bodyData);
  if (response.status === 200) {
    return res
      .status(response.status)
      .json({ status: true, res: JSON.parse(response.res) });
  } else {
    return res.status(response.status).json(JSON.parse(response.res));
  }
};

const getMatchDashakootPoints = async (req, res) => {
  const bodyData = req.body;
  const url = "/match_dashakoot_points";
  const response = await useFetcher(url, bodyData);
  if (response.status === 200) {
    return res
      .status(response.status)
      .json({ status: true, res: JSON.parse(response.res) });
  } else {
    return res.status(response.status).json(JSON.parse(response.res));
  }
};

const getMatchRajjuDosha = async (req, res) => {
  const bodyData = req.body;
  const url = "/match_rajju_dosha";
  const response = await useFetcher(url, bodyData);
  if (response.status === 200) {
    return res
      .status(response.status)
      .json({ status: true, res: JSON.parse(response.res) });
  } else {
    return res.status(response.status).json(JSON.parse(response.res));
  }
};

const getPanchadhaMaitri = async (req, res) => {
  const bodyData = req.body;
  const url = "/panchadha_maitri";
  const response = await useFetcher(url, bodyData);
  if (response.status === 200) {
    return res
      .status(response.status)
      .json({ status: true, res: JSON.parse(response.res) });
  } else {
    return res.status(response.status).json(JSON.parse(response.res));
  }
};

const getMoonSignReport = async (req, res) => {
  const bodyData = req.body;
  const url = "/moon_sign_report";
  const response = await useFetcher(url, bodyData);
  if (response.status === 200) {
    return res
      .status(response.status)
      .json({ status: true, res: JSON.parse(response.res) });
  } else {
    return res.status(response.status).json(JSON.parse(response.res));
  }
};

const getGeoDetails = async (req, res) => {
  const bodyData = req.body;
  const url = "/geo_details";
  const response = await useFetcher(url, bodyData);
  if (response.status === 200) {
    return res
      .status(response.status)
      .json({ status: true, res: JSON.parse(response.res) });
  } else {
    return res.status(response.status).json(JSON.parse(response.res));
  }
};

const getTimezoneWithDst = async (req, res) => {
  const bodyData = req.body;
  const url = "/timezone_with_dst";
  const response = await useFetcher(url, bodyData);
  if (response.status === 200) {
    return res
      .status(response.status)
      .json({ status: true, res: JSON.parse(response.res) });
  } else {
    return res.status(response.status).json(JSON.parse(response.res));
  }
};

const getTimezone = async (req, res) => {
  const bodyData = req.body;
  const url = "/timezone";
  const response = await useFetcher(url, bodyData);
  if (response.status === 200) {
    return res
      .status(response.status)
      .json({ status: true, res: JSON.parse(response.res) });
  } else {
    return res.status(response.status).json(JSON.parse(response.res));
  }
};

const getBiorhythm = async (req, res) => {
  const bodyData = req.body;
  const url = "/biorhythm";
  const response = await useFetcher(url, bodyData);
  if (response.status === 200) {
    return res
      .status(response.status)
      .json({ status: true, res: JSON.parse(response.res) });
  } else {
    return res.status(response.status).json(JSON.parse(response.res));
  }
};

const getGeneralNakshatraReport = async (req, res) => {
  const bodyData = req.body;
  const url = "/general_nakshatra_report";
  const response = await useFetcher(url, bodyData);
  if (response.status === 200) {
    return res
      .status(response.status)
      .json({ status: true, res: JSON.parse(response.res) });
  } else {
    return res.status(response.status).json(JSON.parse(response.res));
  }
};

const getMoonBiorhythm = async (req, res) => {
  const bodyData = req.body;
  const url = "/moon_biorhythm";
  const response = await useFetcher(url, bodyData);
  if (response.status === 200) {
    return res
      .status(response.status)
      .json({ status: true, res: JSON.parse(response.res) });
  } else {
    return res.status(response.status).json(JSON.parse(response.res));
  }
};

const getKPBirthVhart = async (req, res) => {
  const bodyData = req.body;
  const url = "/kp_birth_chart";
  const response = await useFetcher(url, bodyData);
  if (response.status === 200) {
    return res
      .status(response.status)
      .json({ status: true, res: JSON.parse(response.res) });
  } else {
    return res.status(response.status).json(JSON.parse(response.res));
  }
};

const getKPHouseSignificator = async (req, res) => {
  const bodyData = req.body;
  const url = "/kp_house_significator";
  const response = await useFetcher(url, bodyData);
  if (response.status === 200) {
    return res
      .status(response.status)
      .json({ status: true, res: JSON.parse(response.res) });
  } else {
    return res.status(response.status).json(JSON.parse(response.res));
  }
};

const getKPPlanetSignificator = async (req, res) => {
  const bodyData = req.body;
  const url = "/kp_planet_significator";
  const response = await useFetcher(url, bodyData);
  if (response.status === 200) {
    return res
      .status(response.status)
      .json({ status: true, res: JSON.parse(response.res) });
  } else {
    return res.status(response.status).json(JSON.parse(response.res));
  }
};

const getKPDetails = async (req, res) => {
  const bodyData = req.body;
  const url = "/kp_details";
  const response = await useFetcher(url, bodyData);
  if (response.status === 200) {
    return res
      .status(response.status)
      .json({ status: true, res: JSON.parse(response.res) });
  } else {
    return res.status(response.status).json(JSON.parse(response.res));
  }
};

const getKPDashaRange = async (req, res) => {
  const bodyData = req.body;
  const url = "/kp_dasha_range";
  const response = await useFetcher(url, bodyData);
  if (response.status === 200) {
    return res
      .status(response.status)
      .json({ status: true, res: JSON.parse(response.res) });
  } else {
    return res.status(response.status).json(JSON.parse(response.res));
  }
};

const getJaiminiDetails = async (req, res) => {
  const bodyData = req.body;
  const url = "/jaimini_details";
  const response = await useFetcher(url, bodyData);
  if (response.status === 200) {
    return res
      .status(response.status)
      .json({ status: true, res: JSON.parse(response.res) });
  } else {
    return res.status(response.status).json(JSON.parse(response.res));
  }
};

const getLalkitabHoroscope = async (req, res) => {
  const bodyData = req.body;
  const url = "/lalkitab_horoscope";
  const response = await useFetcher(url, bodyData);
  if (response.status === 200) {
    return res
      .status(response.status)
      .json({ status: true, res: JSON.parse(response.res) });
  } else {
    return res.status(response.status).json(JSON.parse(response.res));
  }
};

const geLalkitabReports = async (req, res) => {
  const bodyData = req.body;
  const url = "/lalkitab_reports";
  const response = await useFetcher(url, bodyData);
  if (response.status === 200) {
    return res
      .status(response.status)
      .json({ status: true, res: JSON.parse(response.res) });
  } else {
    return res.status(response.status).json(JSON.parse(response.res));
  }
};

const geLalkitabDebts = async (req, res) => {
  const bodyData = req.body;
  const url = "/lalkitab_debts";
  const response = await useFetcher(url, bodyData);
  if (response.status === 200) {
    return res
      .status(response.status)
      .json({ status: true, res: JSON.parse(response.res) });
  } else {
    return res.status(response.status).json(JSON.parse(response.res));
  }
};

const getLalkitabRemedies = async (req, res) => {
  const bodyData = req.body;
  const originalUrl = req.originalUrl;
  
  const url = originalUrl.slice(7);
  const response = await useFetcher(url, bodyData);
  if (response.status === 200) {
    return res
      .status(response.status)
      .json({ status: true, res: JSON.parse(response.res) });
  } else {
    return res.status(response.status).json(JSON.parse(response.res));
  }
};

const getLalkitabHouses = async (req, res) => {
  const bodyData = req.body;
  const url = "/lalkitab_houses";
  const response = await useFetcher(url, bodyData);
  if (response.status === 200) {
    return res
      .status(response.status)
      .json({ status: true, res: JSON.parse(response.res) });
  } else {
    return res.status(response.status).json(JSON.parse(response.res));
  }
};

const getlalkitabPlanets = async (req, res) => {
  const bodyData = req.body;
  const url = "/lalkitab_planets";
  const response = await useFetcher(url, bodyData);
  if (response.status === 200) {
    return res
      .status(response.status)
      .json({ status: true, res: JSON.parse(response.res) });
  } else {
    return res.status(response.status).json(JSON.parse(response.res));
  }
};

const getPujaSuggestion = async (req, res) => {
  const bodyData = req.body;
  const url = "/puja_suggestion";
  const response = await useFetcher(url, bodyData);
  if (response.status === 200) {
    return res
      .status(response.status)
      .json({ status: true, res: JSON.parse(response.res) });
  } else {
    return res.status(response.status).json(JSON.parse(response.res));
  }
};

const getPapasamyamDetails = async (req, res) => {
  const bodyData = req.body;
  const url = "/papasamyam_details";
  const response = await useFetcher(url, bodyData);
  if (response.status === 200) {
    return res
      .status(response.status)
      .json({ status: true, res: JSON.parse(response.res) });
  } else {
    return res.status(response.status).json(JSON.parse(response.res));
  }
};

const getNumeroPredictionDaily = async (req, res) => {
  const bodyData = req.body;
  const url = "/numero_prediction/daily";
  const response = await useFetcher(url, bodyData);
  if (response.status === 200) {
    return res
      .status(response.status)
      .json({ status: true, res: JSON.parse(response.res) });
  } else {
    return res.status(response.status).json(JSON.parse(response.res));
  }
};

const getMatchMakingReport = async (req, res) => {
  const bodyData = req.body;
  const url = "/match_making_report";
  const response = await useFetcher(url, bodyData);
  if (response.status === 200) {
    return res
      .status(response.status)
      .json({ status: true, res: JSON.parse(response.res) });
  } else {
    return res.status(response.status).json(JSON.parse(response.res));
  }
};

const getSubVdashaMD = async (req, res) => {
  const bodyData = req.body;
  const originalUrl = req.originalUrl;
  
 const url =  originalUrl.slice(7);

  const response = await useFetcher(url, bodyData);
  if (response.status === 200) {
    return res
      .status(response.status)
      .json({ status: true, res: JSON.parse(response.res) });
  } else {
    return res.status(response.status).json(JSON.parse(response.res));
  }
};

const getSubSubVdashaMDAD = async (req, res) => {
  const bodyData = req.body;
  const originalUrl = req.originalUrl;
  const url = originalUrl.slice(7);
  const response = await useFetcher(url, bodyData);
  if (response.status === 200) {
    return res
      .status(response.status)
      .json({ status: true, res: JSON.parse(response.res) });
  } else {
    return res.status(response.status).json(JSON.parse(response.res));
  }
};

const getVarshaphalYearChart = async (req, res) => {
  const bodyData = req.body;
  const url = "varshaphal_year_chart";
  const response = await useFetcher(url, bodyData);
  if (response.status === 200) {
    return res
      .status(response.status)
      .json({ status: true, res: JSON.parse(response.res) });
  } else {
    return res.status(response.status).json(JSON.parse(response.res));
  }
};

const getVarshaphalMonthChart = async (req, res) => {
  const bodyData = req.body;
  const url = "varshaphal_month_chart";
  const response = await useFetcher(url, bodyData);
  if (response.status === 200) {
    return res
      .status(response.status)
      .json({ status: true, res: JSON.parse(response.res) });
  } else {
    return res.status(response.status).json(JSON.parse(response.res));
  }
};

const getVarshaphalDetails = async (req, res) => {
  const bodyData = req.body;
  const url = "varshaphal_details";
  const response = await useFetcher(url, bodyData);
  if (response.status === 200) {
    return res
      .status(response.status)
      .json({ status: true, res: JSON.parse(response.res) });
  } else {
    return res.status(response.status).json(JSON.parse(response.res));
  }
};

const getVarshaphalPlanets = async (req, res) => {
  const bodyData = req.body;
  const url = "varshaphal_planets";
  const response = await useFetcher(url, bodyData);
  if (response.status === 200) {
    return res
      .status(response.status)
      .json({ status: true, res: JSON.parse(response.res) });
  } else {
    return res.status(response.status).json(JSON.parse(response.res));
  }
};

const getVarshaphalMuntha = async (req, res) => {
  const bodyData = req.body;
  const url = "varshaphal_muntha";
  const response = await useFetcher(url, bodyData);
  if (response.status === 200) {
    return res
      .status(response.status)
      .json({ status: true, res: JSON.parse(response.res) });
  } else {
    return res.status(response.status).json(JSON.parse(response.res));
  }
};

const getVarshaphalMuddaDasha = async (req, res) => {
  const bodyData = req.body;
  const url = "varshaphal_mudda_dasha";
  const response = await useFetcher(url, bodyData);
  if (response.status === 200) {
    return res
      .status(response.status)
      .json({ status: true, res: JSON.parse(response.res) });
  } else {
    return res.status(response.status).json(JSON.parse(response.res));
  }
};

const getVarshaphalPanchavargeeyaBala = async (req, res) => {
  const bodyData = req.body;
  const url = "varshaphal_panchavargeeya_bala";
  const response = await useFetcher(url, bodyData);
  if (response.status === 200) {
    return res
      .status(response.status)
      .json({ status: true, res: JSON.parse(response.res) });
  } else {
    return res.status(response.status).json(JSON.parse(response.res));
  }
};

const getVarshaphalHarshaBala = async (req, res) => {
  const bodyData = req.body;
  const url = "varshaphal_harsha_bala";
  const response = await useFetcher(url, bodyData);
  if (response.status === 200) {
    return res
      .status(response.status)
      .json({ status: true, res: JSON.parse(response.res) });
  } else {
    return res.status(response.status).json(JSON.parse(response.res));
  }
};
const getLocation = async(req,res) => {
  const bodyData = req.body;
  const url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${bodyData.text}&apiKey=fa1f97f6b30a4baa97fafa332e526154`;
  var requestOptions = {
    method: "GET",
  };

  await fetch(
    `https://api.geoapify.com/v1/geocode/autocomplete?text=${bodyData.text}&apiKey=fa1f97f6b30a4baa97fafa332e526154`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
     res.status(200).json(JSON.parse(result))
    })
    .catch((error) => console.log("error", error));
}

const getVarshaphalSahamPoints = async (req, res) => {
  const bodyData = req.body;
  const url = "varshaphal_saham_points";
  const response = await useFetcher(url, bodyData);
  if (response.status === 200) {
    return res
      .status(response.status)
      .json({ status: true, res: JSON.parse(response.res) });
  } else {
    return res.status(response.status).json(JSON.parse(response.res));
  }
};


const getVarshaphalYoga = async (req, res) => {
  const bodyData = req.body;
  const url = "varshaphal_yoga";
  const response = await useFetcher(url, bodyData);
  if (response.status === 200) {
    return res
      .status(response.status)
      .json({ status: true, res: JSON.parse(response.res) });
  } else {
    return res.status(response.status).json(JSON.parse(response.res));
  }
};

module.exports = {
  getVarshaphalYoga,
  getVarshaphalSahamPoints,
  getVarshaphalHarshaBala,
  getVarshaphalPanchavargeeyaBala,
  getVarshaphalMuddaDasha,
  getVarshaphalMuntha,
  getVarshaphalPlanets,
  getVarshaphalDetails,
  getVarshaphalMonthChart,
  getVarshaphalYearChart,
  getSubSubVdashaMDAD,
  getSubVdashaMD,
  getMatchMakingReport,
  getNumeroPredictionDaily,
  getPapasamyamDetails,
  getHoraMuhurta,
  getPujaSuggestion,
  getlalkitabPlanets,
  getLalkitabHouses,
  getLalkitabRemedies,
  geLalkitabDebts,
  geLalkitabReports,
  getLalkitabHoroscope,
  getJaiminiDetails,
  getKPDashaRange,
  getKPDetails,
  getKPPlanetSignificator,
  getKPHouseSignificator,
  getKPBirthVhart,
  getMoonBiorhythm,
  getGeneralNakshatraReport,
  getBiorhythm,
  getTimezone,
  getGeoDetails,
  getTimezoneWithDst,
  getMoonSignReport,
  getPanchadhaMaitri,
  getMatchRajjuDosha,
  getMatchDashakootPoints,
  getMatchAshtakootPoints,
  getMatchObstructions,
  getMatchManglikReport,
  getMatchPlanetDetails,
  getMatchAstroDetails,
  getMatchBirthDetails,
  getChaughadiyaMuhurta,
  getNumeroFavMantra,
  getNumeraTable,
  getNumeroFavLord,
  getNumeroFastsReport,
  getNumeroPlaceVastu,
  getNumeraFavTime,
  getNumeraReport,
  getDailyNakshatraPrediction,
  getGeneralAscendantReport,
  getGeneralRashiReport,
  getManglik,
  getGeneralHouseReport,
  getRudrakshSuggestion,
  getBasicGemSuggestion,
  getSadhesatiRemedies,
  getSadhesatiLifeDetails,
  getSadhesatiCurrentStatus,
  getPitraDoshaReport,
  getPlanetAstak,
  getKalpsarpaDetails,
  getSarvasthak,
  getSubYoginiVdasha,
  getSubSubCharVdasha,
  getGhatChakra,
  getHoroChart,
  getHoroChartImage,
  getBhavMadhya,
  getCurrentVdasha,
  getMajorVdasha,
  getCurrentVdashaDate,
  getSubVdasha,
  getSubSubVdasha,
  getSubSubSubDasha,
  getSubSubSubSubVdasha,
  getCurrentVdashaAll,
  getCurrentCharDasha,
  getLocation,
  getCurrentYoginiVdasha,
  getMajorCharVdasha,
  getMajorYoginiVdasha,
  getSubCharVdasha,
};
