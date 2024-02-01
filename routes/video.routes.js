const express = require("express");
const router = express.Router();
const videoController = require("../controllers/videoController");
const authMiddleWare = require("../middlewares/authMiddleware");

router.route("/upload").post(authMiddleWare, videoController.add);

router.route("/all").get(authMiddleWare, videoController.findAll);

// router.route("/getvideo").post(videoController.findOne);

router.route("/get/:id").get(authMiddleWare, videoController.findById);

router.route("/:genre").post(authMiddleWare, videoController.findByGenre);

router.route("/update/:id").put(authMiddleWare, videoController.update);

router.route("/:id").delete(authMiddleWare, videoController.deleteVid);

module.exports = router;
