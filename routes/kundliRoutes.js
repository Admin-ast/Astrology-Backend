const express = require("express");
const router = express.Router();

const {
  newKundli,
  kundliMatching,
  getSavedKundliDetails,
} = require("../controllers/kundliController");

router.post("/new-kundli", newKundli);
router.post("/kundli-matching", kundliMatching);
router.get("/:type", getSavedKundliDetails);

module.exports = router;
