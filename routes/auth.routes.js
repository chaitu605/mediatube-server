const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.route("/signup").post(authController.signupUser);

router.route("/signin").post(authController.signinUser);

module.exports = router;
