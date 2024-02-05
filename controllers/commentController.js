const Comment = require("../models/comment.model");

const saveComment = async (req, res) => {
  try {
    const { comment, postId, writer } = req.body;

    if (!comment) {
      return res
        .status(400)
        .json({ success: false, message: "Please add comment" });
    }
    const newComment = new Comment({ comment, postId, writer });
    await newComment.save();
    const result = await Comment.findById(newComment._id).populate(
      "writer",
      "-password"
    );
    res.status(200).json({ success: true, message: "Commented", data: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const getComment = async (req, res) => {
  try {
    const { videoId } = req.body;

    if (!videoId) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide a videoId" });
    }

    const comments = await Comment.find({ postId: videoId }).populate(
      "writer",
      "-password"
    );
    res
      .status(200)
      .json({ success: true, message: "Comments found", data: comments });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = {
  saveComment,
  getComment,
};
