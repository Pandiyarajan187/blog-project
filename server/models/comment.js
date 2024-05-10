const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  postId: mongoose.Schema.Types.ObjectId,
  comment: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("comment", CommentSchema);
