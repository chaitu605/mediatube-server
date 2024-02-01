const mongoose = require("mongoose");

const videoSchema = mongoose.Schema(
  {
    uploader: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
    genre: { type: String, required: true },
    videoId: { type: String, required: true },
    duration: { type: String },
    thumbnail: { type: String },
  },
  { timestamps: true }
);

// schema.method("toJSON", function () {
//   const { __v, _id, ...object } = this.toObject();
//   object.id = _id;
//   return object;
// });

const Video = mongoose.model("Video", videoSchema);

module.exports = Video;
