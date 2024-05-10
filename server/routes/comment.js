const express = require("express");
const router = express.Router();
const {
  createComment,
  updateComment,
  deleteComment,
} = require("../controllers/comment");

//@route      POST /comment/:id
//@desc       Create Comment for Blog Post
//@access     Public
router.route("/:id").post(createComment);

//@route      PUT /comment/update/:id
//@desc       Update Comment
//@access     Public
router.route("/update/:id").post(updateComment);

//@route      POST /comment/delete/:id
//@desc       Delete Comment
//@access     Public
router.route("/delete/:id").post(deleteComment);

module.exports = router;
