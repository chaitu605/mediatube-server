const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");
const authMiddleWare = require("../middlewares/authMiddleware");

router
  .route("/savecomment")
  .post(authMiddleWare, commentController.saveComment);

router.route("/getcomment").post(authMiddleWare, commentController.getComment);

module.exports = router;
