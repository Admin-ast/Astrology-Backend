const express = require("express");
const router = express.Router();

const { horoscope } = require("../controllers/horoscopeController");

router.get("/:zodiacName", horoscope);

module.exports = router;
