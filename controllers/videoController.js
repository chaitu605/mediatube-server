const Video = require("../models/video.model");
const cloudinary = require("../config/cloudinaryConfig");

// Find All Videos
const findAll = async (req, res) => {
  try {
    const videos = await Video.find();
    res
      .status(200)
      .json({ success: true, message: "Videos found", data: videos });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

//Find Single Video
const findById = async (req, res) => {
  try {
    const id = req.params.id;
    const video = await Video.findById(id);
    res
      .status(200)
      .json({ success: true, message: "Video found", data: video });
  } catch (error) {
    if (error.name === "CastError" && error.kind === "ObjectId") {
      res.status(400).json({ success: false, message: "Resource not found" });
    } else {
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  }
};

// FindByGenre
const findByGenre = async (req, res) => {
  try {
    const genre = req.params.genre;
    const videos = await Video.find({ genre: genre });
    res.status(200).json({
      success: true,
      message: "Videos found with genre",
      data: videos,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

//Update Video
const update = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedVideo = await Video.findByIdAndUpdate(id, req.body, {
      useFindAndModify: false,
    });
    res.status(200).json({
      success: true,
      message: "Data updated successfully",
      data: updatedVideo,
    });
  } catch (error) {
    if (error.name === "CastError" && error.kind === "ObjectId") {
      res.status(400).json({
        success: false,
        message: "Failed top update data, video not found",
      });
    } else {
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  }
};

//Add video
const add = async (req, res) => {
  try {
    const { title, description, genre, thumbnail, videoId } = req.body;

    if (!title || !description || !genre || !thumbnail || !videoId) {
      return res
        .status(400)
        .json({ success: false, message: "Please add all fields" });
    }

    const videoExists = await Video.findOne({ videoId: videoId });
    if (videoExists === undefined || videoExists === null) {
      const cloudinaryRes = await cloudinary.uploader.upload(thumbnail, {
        upload_preset: "OTTApp",
        folder: "thumbnails",
        resource_type: "image",
      });

      const newVideo = new Video({
        title: title,
        description: description,
        genre: genre,
        thumbnail: cloudinaryRes.secure_url,
        videoId: videoId,
      });

      const result = await newVideo.save();
      res.status(200).json({
        success: true,
        message: "Video added successfully",
        data: result,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "videoId already in use",
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

//Delete Video
const deleteVid = async (req, res) => {
  try {
    const { id, cloudinaryId } = req.body;

    console.log(id, cloudinaryId);

    const cloudinaryRes = await cloudinary.uploader.destroy(cloudinaryId);

    console.log("cloudinaryRes", cloudinaryRes);

    const result = await Video.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Video deleted successfully",
      data: result,
    });
  } catch (error) {
    if (error.name === "CastError" && error.kind === "ObjectId") {
      res.status(400).json({
        success: false,
        message: "Failed top delete data, video not found",
      });
    } else {
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  }
};

//Findone
// const findOne = (req, res) => {
//   try {
//     Video.findOne({ _id: req.body.videoId })
//       .populate("uploader")
//       .exec((err, video) => {
//         if (err)
//           return res
//             .status(400)
//             .json({ success: false, message: "Some Error", data: err });
//         return res.status(200).json({ success: true, data: video });
//       });
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Internal Server Error" });
//   }
// };

module.exports = {
  findAll,
  findById,
  update,
  add,
  deleteVid,
  findByGenre,
  //   findOne,
};
