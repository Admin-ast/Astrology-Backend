const express = require("express");
const router = express.Router();

const {
  newKundli,
  kundliMatching,
  getSavedKundliDetails,
  getPlanetDetails,
  getKPPlanetDetails,
  getKPHouseCuspsDetails,
} = require("../controllers/kundliController");

router.post("/new-kundli", newKundli);
router.post("/kundli-matching", kundliMatching);
router.get("/:type", getSavedKundliDetails);
router.post("/planets", getPlanetDetails);
router.post("/kp_planets", getKPPlanetDetails);
router.post("/kp_house_cusps", getKPHouseCuspsDetails);

module.exports = router;
