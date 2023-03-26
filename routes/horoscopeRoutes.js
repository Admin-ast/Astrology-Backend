const express = require("express");
const router = express.Router();

const {
  horoscope,
  getSingleHoroscopeSignDetails,
  getAllHoroscopeDetails,
} = require("../controllers/horoscopeController");

router.get("/", horoscope);
router.get("/:type", getAllHoroscopeDetails);
router.get("/:type/:zodiacName", getSingleHoroscopeSignDetails);

module.exports = router;
