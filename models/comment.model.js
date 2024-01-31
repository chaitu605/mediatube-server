const mongoose = require("mongoose");

const commentSchema = mongoose.Schema(
  {
    writer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    postId: { type: mongoose.Schema.Types.ObjectId, ref: "Video" },
    responseTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    comment: { type: String, required: true },
  },
  { timestamps: true }
);

// schema.method("toJSON", function () {
//   const { __v, _id, ...object } = this.toObject();
//   object.id = _id;
//   return object;
// });

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
