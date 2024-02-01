const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const authMiddleWare = async (req, res, next) => {
  const token = req.header("Authorization");

  if (token) {
    try {
      // Removing Bearer String frm token
      const jwtToken = token.replace("Bearer", "").trim();
      const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET);
      const userData = await User.findOne({ email: isVerified.email }).select(
        "-password"
      );
      req.user = userData;
      req.token = token;
      req.userID = userData._id;
      next();
    } catch (error) {
      return res.status(401).json({ message: "Unauthorized, Invalid Token" });
    }
  } else {
    return res.status(401).json({ message: "Unauthorized, Token not provded" });
  }
};

module.exports = authMiddleWare;
