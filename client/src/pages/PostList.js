import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import DisplayComments from "../components/DisplayComment";
import EditForm from "./EditForm";
import AddCommentForm from "../components/AddCommentForm";

const PostList = ({ posts }) => {
  const [allPost, setAllPost] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [commentInputs, setCommentInputs] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/post/all-post`
        );
        setAllPost(
          response.data.map((post) => ({ ...post, showFullText: false }))
        );
        setCommentInputs(response.data.map(() => ""));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const toggleShowFullText = (index) => {
    setAllPost((prevPosts) =>
      prevPosts.map((post, i) =>
        i === index ? { ...post, showFullText: !post.showFullText } : post
      )
    );
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    const postToEdit = allPost[index];
    setEditFormData({
      title: postToEdit.title,
      author: postToEdit.author,
      content: postToEdit.content,
      imageUrl: postToEdit.imageUrl,
    });
  };

  const handleUpdatePost = async () => {
    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/post/update/${allPost[editIndex]._id}`,
        editFormData
      );
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/post/all-post`
      );
      setAllPost(
        response.data.map((post) => ({ ...post, showFullText: false }))
      );
      setEditIndex(null);
      setEditFormData({});
      alert("Update Successfully");
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  const handleDeletePost = async () => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/post/delete/${allPost[editIndex]._id}`
      );
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/post/all-post`
      );
      setAllPost(
        response.data.map((post) => ({ ...post, showFullText: false }))
      );
      setEditIndex(null);
      setEditFormData({});
      alert("Deleted Successfully");
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  const handleAddComment = async (index, comment) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/comment/${allPost[index]._id}`,
        { comment }
      );
      const updatedAllPost = allPost.map((post, i) =>
        i === index
          ? {
              ...post,
              comment: [...post.comment, response.data],
            }
          : post
      );
      setAllPost(updatedAllPost);
      setCommentInputs((prevInputs) =>
        prevInputs.map((input, i) => (i === index ? "" : input))
      );
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleEditComment = async (index, commentId, updatedComment) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/comment/update/${commentId}`,
        { comment: updatedComment }
      );
      const updatedAllPost = allPost.map((post, i) =>
        i === index
          ? {
              ...post,
              comment: post.comment.map((c) =>
                c._id === commentId ? response.data : c
              ),
            }
          : post
      );
      setAllPost(updatedAllPost);
      setCommentInputs((prevInputs) =>
        prevInputs.map((input, i) => (i === index ? "" : input))
      );
      alert("Edited Successfully");
      window.location.reload();
    } catch (error) {
      console.error("Error editing comment:", error);
    }
  };

  // const handleDeleteComment = async (index, commentId, updatedComment) => {
  //   try {
  //     const response = await axios.post(
  //       `${process.env.REACT_APP_API_URL}/comment/delete/${commentId}`
  //     );
  //     const updatedAllPost = allPost.map((post, i) =>
  //       i === index
  //         ? {
  //             ...post,
  //             comment: post.comment.map((c) =>
  //               c._id === commentId ? response.data : c
  //             ),
  //           }
  //         : post
  //     );
  //     setAllPost(updatedAllPost);
  //     setCommentInputs((prevInputs) =>
  //       prevInputs.map((input, i) => (i === index ? "" : input))
  //     );
  //     alert("Deleted Successfully");
  //   } catch (error) {
  //     console.error("Error Deleting comment:", error);
  //   }
  // };

  const handleDeleteComment = async (index, commentId, updatedComment) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/comment/delete/${commentId}`
      );
      const updatedAllPost = allPost.map((post, i) =>
        i === index
          ? {
              ...post,
              comment: post.comment.filter((c) => c._id !== commentId),
            }
          : post
      );
      setAllPost(updatedAllPost);
      setCommentInputs((prevInputs) =>
        prevInputs.map((input, i) => (i === index ? "" : input))
      );
      alert("Deleted Successfully");
      window.location.reload();
    } catch (error) {
      console.error("Error Deleting comment:", error);
    }
  };

  return (
    <>
      {allPost.length > 0 ? (
        allPost.map((element, index) => (
          <Card key={index} className="text-center">
            <Card.Img
              variant="top"
              src={element.imageUrl}
              className="mt-3 mb-3"
              style={{ width: "200px", height: "250px", margin: "auto" }}
            />
            <Card.Body>
              <Card.Title>Title: {element.title}</Card.Title>
              <Card.Title>Description:</Card.Title>
              <Card.Text>
                {element.showFullText ? (
                  <div dangerouslySetInnerHTML={{ __html: element.content }} />
                ) : (
                  <>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: element.content.slice(0, 50),
                      }}
                    />
                    {element.content.length > 50}
                  </>
                )}
              </Card.Text>
              <Card.Title>Author Name: {element.author}</Card.Title>

              <Button
                onClick={() => toggleShowFullText(index)}
                className="btn btn-primary mr-2"
                style={{ marginRight: "10px", padding: "5px 10px" }}
              >
                {element.showFullText ? "Read Less" : "Read More"}
              </Button>
              <br></br>

              {/* Edit Form */}
              {location.pathname === "/edit-blog" && (
                <Button
                  onClick={() => handleEdit(index)}
                  className="btn btn-secondary mr-2"
                  style={{
                    marginLeft: "auto",
                    marginRight: "auto",
                    marginTop: "10px",
                    display: "block",
                  }}
                >
                  Edit
                </Button>
              )}
              {location.pathname === "/edit-blog" && editIndex === index && (
                <EditForm
                  editFormData={editFormData}
                  setEditFormData={setEditFormData}
                  handleUpdatePost={handleUpdatePost}
                  handleDeletePost={handleDeletePost}
                  comments={element.comment}
                  handleEditComment={handleEditComment}
                  handleDeleteComment={handleDeleteComment}
                />
              )}

              {/* Add Comments */}
              {location.pathname === "/" && (
                <AddCommentForm
                  index={index}
                  commentInputs={commentInputs}
                  setCommentInputs={setCommentInputs}
                  handleAddComment={handleAddComment}
                />
              )}

              {/* Display Comments */}
              {location.pathname === "/" && (
                <DisplayComments comments={element.comment || []} />
              )}
            </Card.Body>
          </Card>
        ))
      ) : (
        <>
          <Link to="/create-blog">
            <Button
              style={{ margin: "auto" }}
              className="btn btn-secondary mt-2"
            >
              Click Here to Add a Blog
            </Button>
          </Link>
        </>
      )}
    </>
  );
};
export default PostList;
