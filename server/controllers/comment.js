const Comment = require("../models/comment");

exports.createComment = async (req, res) => {
  let userComment = req.body;
  try {
    const newComment = await Comment.create({
      postId: req.params.id,
      comment: userComment.comment,
    });
    let result = [];
    result.push(newComment);
    res.status(200).json(newComment);
  } catch (err) {
    next(err);
  }
};

exports.updateComment = async (req, res) => {
  const id = req.params.id;
  const { comment } = req.body; // Assuming the field to be updated is 'comment'

  try {
    const updatedComment = await Comment.findByIdAndUpdate(
      id,
      { comment },
      { new: true }
    );

    if (!updatedComment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    res.status(200).json(updatedComment);
  } catch (err) {
    console.error("Error updating comment:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.deleteComment = async (req, res) => {
  const id = req.params.id;

  try {
    const deleteComment = await Comment.findByIdAndDelete(id, { new: true });

    if (!deleteComment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    res.status(200).json(deleteComment);
  } catch (err) {
    console.error("Error Deleting comment:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
