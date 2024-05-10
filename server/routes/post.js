const express = require("express");
const router = express.Router();
const {
  createPost,
  getAllPost,
  updatePost,
  deletePost,
} = require("../controllers/post");

//@route      POST /post/create
//@desc       Create Blog Post
//@access     Public
router.route("/create").post(createPost);

//@route      PUT /post/update/:id
//@desc       Update Blog Post
//@access     Public
router.route("/update/:id").put(updatePost);

//@route      GET /post/all-post
//@desc       Get All Blog Post
//@access     Public
router.route("/all-post").get(getAllPost);

//@route      DELETE /delete/:id
//@desc       Delete Blog Post
//@access     Public
router.route("/delete/:id").delete(deletePost);

module.exports = router;
