const express = require("express");
const router = express.Router();

const { createCandidate } = require("../controllers/candidateController");

router.post("/register", createCandidate);

module.exports = router;
