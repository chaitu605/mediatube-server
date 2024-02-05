const Like = require("../models/like.model");
const Dislike = require("../models/dislike.model");

const getAllLikes = async (req, res) => {
  try {
    const { videoId } = req.body;

    if (!videoId) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide a videoId" });
    }

    const likes = await Like.find({ videoId }).exec();
    res
      .status(200)
      .json({ success: true, message: "Likes found", data: likes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const getAllDislikes = async (req, res) => {
  try {
    const { videoId } = req.body;

    if (!videoId) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide a videoId" });
    }
    const dislikes = await Dislike.find({ videoId }).exec();
    res
      .status(200)
      .json({ success: true, message: "Dislike found", data: dislikes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const upLike = async (req, res) => {
  try {
    const { videoId, userId } = req.body;

    const like = new Like({ videoId, userId });
    await like.save();

    // In case Dislike Button is already clicked, need to decrease the dislike by 1
    const disLikeResult = await Dislike.findOneAndDelete({
      videoId,
      userId,
    }).exec();

    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const unLike = async (req, res) => {
  try {
    const { videoId, userId } = req.body;

    const result = await Like.findOneAndDelete({ videoId, userId }).exec();

    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const unDislike = async (req, res) => {
  try {
    const { videoId, userId } = req.body;

    const result = await Dislike.findOneAndDelete({ videoId, userId }).exec();

    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const upDislike = async (req, res) => {
  try {
    const { videoId, userId } = req.body;

    const disLike = new Dislike({ videoId, userId });
    await disLike.save();

    // In case Like Button is already clicked, need to decrease the like by 1
    const likeResult = await Like.findOneAndDelete({ videoId, userId }).exec();

    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = {
  getAllLikes,
  getAllDislikes,
  upLike,
  unLike,
  unDislike,
  upDislike,
};
