const express = require("express");
const router = express.Router();

const { horoscope } = require("../controllers/horoscopeController");

router.get("/:zodiacName", horoscope);
router.get("/", (req, res) => {
  res.json({ msg: "working" });
});

module.exports = router;
