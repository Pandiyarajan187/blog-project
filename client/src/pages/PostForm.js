import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PostForm = () => {
  const [blogData, setBlogData] = useState({
    title: "",
    author: "",
    content: "",
    imageUrl: "",
  });
  const navigate = useNavigate();

  const handleChange = (content) => {
    setBlogData({ ...blogData, content });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await axios.post(
        `${process.env.REACT_APP_API_URL}/post/create`,
        blogData
      );
      if (res.status === 200) {
        navigate("/");
        alert("Created Successfully");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div
      className="container mt-5"
      style={{
        backgroundColor: "lightgoldenrodyellow",
        borderRadius: "5px",
        padding: "10px",
      }}
    >
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="text-center">Create your Blog</h2>
          <form onSubmit={handleSubmit} className="text-start">
            <div className="mb-3">
              <label htmlFor="title" className="form-label font-weight-bold">
                Title
              </label>
              <input
                type="text"
                className="form-control"
                id="title"
                placeholder="Title"
                name="title"
                required
                value={blogData.title}
                onChange={(e) =>
                  setBlogData({ ...blogData, title: e.target.value })
                }
              />
            </div>
            <div className="mb-3">
              <label htmlFor="author" className="form-label font-weight-bold">
                Author Name
              </label>
              <input
                type="text"
                className="form-control"
                id="author"
                placeholder="Author Name"
                name="author"
                required
                value={blogData.author}
                onChange={(e) =>
                  setBlogData({ ...blogData, author: e.target.value })
                }
              />
            </div>
            <div className="mb-3">
              <label htmlFor="content" className="form-label font-weight-bold">
                Content
              </label>
              <ReactQuill
                theme="snow"
                value={blogData.content}
                onChange={handleChange}
                required
                placeholder="Write something About your Blog..."
                className="form-control"
                style={{ minHeight: "150px" }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="imageUrl" className="form-label font-weight-bold">
                Image URL
              </label>
              <input
                type="text"
                className="form-control"
                id="imageUrl"
                placeholder="Image URL"
                name="imageUrl"
                required
                value={blogData.imageUrl}
                onChange={(e) =>
                  setBlogData({ ...blogData, imageUrl: e.target.value })
                }
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Publish
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostForm;
