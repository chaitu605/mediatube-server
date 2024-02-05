const express = require("express");
const router = express.Router();
const likeController = require("../controllers/likeController");
const authMiddleWare = require("../middlewares/authMiddleware");

router.route("/getlikes").post(authMiddleWare, likeController.getAllLikes);

router
  .route("/getdislikes")
  .post(authMiddleWare, likeController.getAllDislikes);

router.route("/uplike").post(authMiddleWare, likeController.upLike);

router.route("/unlike").post(authMiddleWare, likeController.unLike);

router.route("/undislike").post(authMiddleWare, likeController.unDislike);

router.route("/updislike").post(authMiddleWare, likeController.upDislike);

module.exports = router;
