const express = require("express");
const router = express.Router();

const {
  basicPanchang,
  ashubhaMuhurat,
} = require("../controllers/panchangController");

router.post("/basic-panchang", basicPanchang);
router.post("/ashubhaMuhurat", ashubhaMuhurat);

module.exports = router;
