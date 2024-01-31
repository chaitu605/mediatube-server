const mongoose = require("mongoose");

const likeSchema = mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    commendId: { type: mongoose.Schema.Types.ObjectId, ref: "Comment" },
    videoId: { type: mongoose.Schema.Types.ObjectId, ref: "Video" },
  },
  { timestamps: true }
);

// schema.method("toJSON", function () {
//   const { __v, _id, ...object } = this.toObject();
//   object.id = _id;
//   return object;
// });

const Like = mongoose.model("Like", likeSchema);

module.exports = Like;
