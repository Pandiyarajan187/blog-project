const Post = require("../models/post");
const Comment = require("../models/comment");
const errorMiddleware = require("../middleware/errorMiddleware");

exports.createPost = async (req, res) => {
  try {
    const savedPost = await Post.create(req.body);
    res.status(200).json(savedPost);
  } catch (err) {
    next(err);
  }
};

exports.updatePost = async (req, res) => {
  const id = req.params.id;
  try {
    const post = await Post.findById(id);
    try {
      const updatedPost = await Post.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedPost);
    } catch (err) {
      res.status(500).json(err);
    }
  } catch (err) {
    next(err);
  }
};

exports.getAllPost = async (req, res, next) => {
  try {
    let posts = await Post.find({});
    let finalResults = [];
    for (let post of posts) {
      let comments = await Comment.find({ postId: post._id });
      let dd = JSON.parse(JSON.stringify(post));
      dd.comment = comments.length > 0 ? comments : [];
      finalResults.push(dd);
    }
    res.status(200).json(finalResults);
  } catch (err) {
    next(err);
  }
};

exports.deletePost = async (req, res, next) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);
    if (!deletedPost) {
      return res.status(404).json({ error: "Post not found" });
    }
    // Delete all comments related to the post
    await Comment.deleteMany({ postId: req.params.id });

    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
