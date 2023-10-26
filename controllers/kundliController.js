const { StatusCodes } = require("http-status-codes");
const Kundli = require("../models/Kundli");
const { useFetcher } = require("../services/useFetcher");
const fetch = require("cross-fetch");
const saveimage = require("./canvasImage");
var btoa = require("btoa");

const newKundli = async (req, res) => {
  await fetch(`https://json.astrologyapi.com/v1/sun_sign_prediction`, {
    method: "POST",
    headers: {
      Authorization:
        "Basic " + btoa(`${process.env.USER_ID}:${process.env.ACCESS_ID}`),
    },
    body: req,
  })
    .then((data) => data.json())
    .then((data) => {
      Kundli.create({ ...data, type: "kundli" });
      res.status(StatusCodes.OK).json({ msg: "Success!", data });
    })
    .catch((err) =>
      res.status(StatusCodes.BAD_GATEWAY).json({ msg: "facing some issues!" })
    );
    console.log("reuest : " + req);
};

const kundliMatching = async (req, res) => {
  await fetch(`https://json.astrologyapi.com/v1/sun_sign_prediction/`, {
    method: "POST",
    headers: {
      Authorization:
        "Basic " + btoa(`${process.env.USER_ID}:${process.env.ACCESS_ID}`),
    },
    body: req,
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

  if (response.status === 200) {
    return res
      .status(response.status)
      .json({ status: true, res: JSON.parse(response.res) });
  } else {
    return res.status(response.status).json(JSON.parse(response.res));
  }
};

const getKPPlanetDetails = async (req, res) => {
  const bodyData = req.body;
  const url = "/kp_planets";
  const response = await useFetcher(url, bodyData);
  if (response.status === 200) {
    return res
      .status(response.status)
      .json({ status: true, res: JSON.parse(response.res) });
  } else {
    return res.status(response.status).json(JSON.parse(response.res));
  }
};

const getKPHouseCuspsDetails = async (req, res) => {
  const bodyData = req.body;
  const url = "/kp_house_cusps";
  const response = await useFetcher(url, bodyData);
  if (response.status === 200) {
    return res
      .status(response.status)
      .json({ status: true, res: JSON.parse(response.res) });
  } else {
    return res.status(response.status).json(JSON.parse(response.res));
  }
};

const getKPBirthChartDetails = async (req, res) => {
  const bodyData = req.body;
  const url = "/kp_birth_chart";
  const imageid = "123";
  const response = await useFetcher(url,bodyData);
  if(response.status === 200){
    return res
      .status(response.status)
      .json({ status: true, res: JSON.parse(response.res) }); 
    }
else{
      return res.status(response.status).json(JSON.parse(response.res));
} 
};

const getKPHouseSignificatorDetails = async (req, res) => {
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

const getAvakhadaDetails = async (req, res) => {
  const bodyData = req.body;
  const url = "/astro_details";
  const response = await useFetcher(url, bodyData);
  if (response.status === 200) {
    return res
      .status(response.status)
      .json({ status: true, res: JSON.parse(response.res) });
  } else {
    return res.status(response.status).json(JSON.parse(response.res));
  }
};

const getBirthDetails = async (req, res) => {
  const bodyData = req.body;
  const url = "/birth_details";
  const response = await useFetcher(url, bodyData);
  if (response.status === 200) {
    return res
      .status(response.status)
      .json({ status: true, res: JSON.parse(response.res) });
  } else {
    return res.status(response.status).json(JSON.parse(response.res));
  }
};
const getCanvasimage = async(req,res) => {
   //   const bodyData = req.body;
    //  const url = "/kp_birth_detail";
    const imageid = Date.now();
     // const response = await useFetcher(url,bodyData);
     // if(response.status === 200){

      const canvasimagesave = await saveimage(imageid);
      if(canvasimagesave){
        return res.status(200).json({chartimage: imageid + ".jpg"});
      }
    //  return res.status(404).json({message:"not"});
   // }
   // else{
     //     return res.status(response.status).json(JSON.parse(response.res));
   // } 
}
const getFreeRudrakshaReport = async (req, res) => {
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

const getFreeGemReport = async (req, res) => {
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

const getFreeManglik = async (req, res) => {
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

const getFreeKalsharpa = async (req, res) => {
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

const getFreeSadhesatiCurrent = async (req, res) => {
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

const getFreeSadhesatiLife = async (req, res) => {
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

const getFreeGeneralDetails = async (req, res) => {
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

const getFreeVDashaDetails = async (req, res) => {
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

const getVDashaDetails = async (req, res) => {
  const bodyData = req.body;
  const url = "/current_vdasha_all";
  const response = await useFetcher(url,bodyData);
  if(response.status === 200){
    return res
       .status(response.status)
       .json({ status:true, res: JSON.parse(response.res)});
  }
  else{
    return res.status(response.status).json(JSON.parse(response.res));
  }
}
const getAshtakvargaDetails = async (req, res) => {
  const bodyData = req.body;
  const planet = "sav";
  const url = "/planet_ashtak/" + planet;
  const response = await useFetcher(url, bodyData);
  if (response.status === 200) {
    return res
      .status(response.status)
      .json({ status: true, res: JSON.parse(response.res) });
  } else {
    return res.status(response.status).json(JSON.parse(response.res));
  }
};

const getAshtakvarga = async (req, res) => {
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

const getFreeYogaDetails = async (req, res) => {
  const bodyData = req.body;
  const url = "/varshaphal_yoga";
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
  newKundli,
  kundliMatching,
  getSavedKundliDetails,
  getPlanetDetails,
  getKPPlanetDetails,
  getKPHouseCuspsDetails,
  getKPBirthChartDetails,
  getKPHouseSignificatorDetails,
  getKPPlanetSignificator,
  getKPDetails,
  getAvakhadaDetails,
  getBirthDetails,
  getFreeRudrakshaReport,
  getFreeGemReport,
  getFreeManglik,
  getFreeKalsharpa,
  getFreeSadhesatiCurrent,
  getFreeSadhesatiLife,
  getFreeGeneralDetails,
  getFreeVDashaDetails,
  getVDashaDetails,
  getAshtakvargaDetails,
  getAshtakvarga,
  getFreeYogaDetails,
  getCanvasimage
};
