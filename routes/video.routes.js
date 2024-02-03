const express = require("express");
const router = express.Router();
const videoController = require("../controllers/videoController");
const authMiddleWare = require("../middlewares/authMiddleware");
const adminMiddleWare = require("../middlewares/adminMiddleware");

router
  .route("/upload")
  .post(authMiddleWare, adminMiddleWare, videoController.add);

router.route("/all").get(authMiddleWare, videoController.findAll);

// router.route("/getvideo").post(videoController.findOne);

router.route("/get/:id").get(authMiddleWare, videoController.findById);

router.route("/:genre").get(authMiddleWare, videoController.findByGenre);

router
  .route("/update/:id")
  .put(authMiddleWare, adminMiddleWare, videoController.update);

router
  .route("/:id")
  .delete(authMiddleWare, adminMiddleWare, videoController.deleteVid);

module.exports = router;
