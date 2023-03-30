const express = require("express");

const router = express.Router();
const { userLogin, userUpdate } = require("../controllers/userAuthController");

router.post("/sign-in", userLogin);
router.put("/profile-update", userUpdate);

module.exports = router;
