const express = require("express");
const router = express.Router();

const { authenticateUser } = require("../middleware/authentication");

const {
  register,
  login,
  logout,
  verifyEmail,
  forgotPassword,
  resetPassword,
  getAllProfile,
  getProfileByEmail,
  getProfileById,
  updateProfile,
  deleteProfile,
} = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);
router.post("/logout", authenticateUser, logout);
router.post("/verify-email", verifyEmail);
router.post("/reset-password", resetPassword);
router.post("/forgot-password", forgotPassword);
router.get("/profiles", getAllProfile);
router.post("/user-profile", getProfileByEmail);
router.get("/user-profile/:id", getProfileById);
router.put("/update-profile/:id", updateProfile);
router.delete("/delete-profile/:id", deleteProfile);

module.exports = router;
