import React, { useState } from "react";
import { Form, Row, Col, Button, Card } from "react-bootstrap";
import ReactQuill from "react-quill";
import { FaEdit } from "react-icons/fa";

const EditForm = ({
  editFormData,
  setEditFormData,
  handleUpdatePost,
  handleDeletePost,
  comments,
  handleEditComment,
  handleDeleteComment,
}) => {
  // State to manage the editing state of each comment
  const [editableComments, setEditableComments] = useState(
    comments.map(() => false)
  );
  // State to store edited comment text
  const [editedComments, setEditedComments] = useState(
    comments.map((comment) => (comment?.comment ? comment?.comment : ""))
  );

  // Function to handle editing a comment
  const handleEdit = (index) => {
    const updatedEditableComments = [...editableComments];
    updatedEditableComments[index] = true;
    setEditableComments(updatedEditableComments);
  };

  return (
    <div
      className="edit-form"
      style={{
        backgroundColor: "lightgoldenrodyellow",
        borderRadius: "5px",
        padding: "10px",
      }}
    >
      <Form className="text-start">
        <Row className="justify-content-center">
          <Col sm={6}>
            <Form.Group controlId="title">
              <Form.Label className="font-weight-bold">Title</Form.Label>
              <Form.Control
                type="text"
                value={editFormData.title || ""}
                onChange={(e) =>
                  setEditFormData({
                    ...editFormData,
                    title: e.target.value,
                  })
                }
                style={{ marginBottom: "10px" }}
              />
            </Form.Group>
            <Form.Group controlId="author">
              <Form.Label className="font-weight-bold">Author</Form.Label>
              <Form.Control
                type="text"
                value={editFormData.author || ""}
                onChange={(e) =>
                  setEditFormData({
                    ...editFormData,
                    author: e.target.value,
                  })
                }
                style={{ marginBottom: "10px" }}
              />
            </Form.Group>
            <Form.Group controlId="content">
              <Form.Label className="font-weight-bold">Content</Form.Label>
              <ReactQuill
                theme="snow"
                value={editFormData.content || ""}
                onChange={(content) =>
                  setEditFormData({
                    ...editFormData,
                    content: content,
                  })
                }
                style={{ marginBottom: "10px" }}
              />
            </Form.Group>
            <Form.Group controlId="imageUrl">
              <Form.Label className="font-weight-bold">Image URL</Form.Label>
              <Form.Control
                type="text"
                value={editFormData.imageUrl || ""}
                onChange={(e) =>
                  setEditFormData({
                    ...editFormData,
                    imageUrl: e.target.value,
                  })
                }
                style={{ marginBottom: "10px" }}
              />
            </Form.Group>
            {/* <Row className="justify-content-center">
              <Col lg={12}>
                <h6>Comments</h6>
                {comments &&
                  comments.map((comment, index) => (
                    <Card key={index} style={{ marginBottom: "10px" }}>
                      <Card.Body>
                        <Card.Text>{comment?.comment}</Card.Text>
                        <div>
                          <FaEdit
                            onClick={() =>
                              handleEditComment(index, comment?.comment)
                            }
                            style={{ cursor: "pointer", marginRight: "5px" }}
                          />
                          <FaTrash
                            onClick={() =>
                              handleDeleteComment(index, comment?.comment)
                            }
                            style={{ cursor: "pointer" }}
                          />
                        </div>
                      </Card.Body>
                    </Card>
                  ))}
              </Col>
            </Row> */}
            <Row className="justify-content-center">
              <Col lg={12}>
                {comments.length > 0 && <h6>Comments</h6>}
                {comments.map((comment, index) => (
                  <Card key={index} style={{ marginBottom: "10px" }}>
                    <Card.Body>
                      {console.log(comment)}
                      {editableComments[index] ? (
                        <Form.Group controlId={`editedComment-${index}`}>
                          <Form.Control
                            as="textarea"
                            value={editedComments[index]}
                            onChange={(e) => {
                              const updatedEditedComments = [...editedComments];
                              updatedEditedComments[index] = e.target.value;
                              setEditedComments(updatedEditedComments);
                            }}
                          />
                        </Form.Group>
                      ) : (
                        <Card.Text>{comment?.comment}</Card.Text>
                      )}
                      <div>
                        {editableComments[index] ? (
                          <>
                            <Button
                              variant="primary"
                              onClick={() => {
                                handleEditComment(
                                  index,
                                  comment._id,
                                  editedComments[index]
                                );
                              }}
                            >
                              Save
                            </Button>
                            <Button
                              variant="secondary"
                              onClick={() =>
                                handleDeleteComment(
                                  index,
                                  comment._id,
                                  editedComments[index]
                                )
                              }
                              style={{ marginLeft: "10px" }}
                            >
                              Delete
                            </Button>
                          </>
                        ) : (
                          <>
                            <FaEdit
                              onClick={() => handleEdit(index)}
                              style={{ cursor: "pointer", marginRight: "5px" }}
                            />
                          </>
                        )}
                      </div>
                    </Card.Body>
                  </Card>
                ))}
              </Col>
            </Row>
            <Button variant="primary" onClick={handleUpdatePost}>
              Update Post
            </Button>
            <Button
              variant="danger"
              onClick={handleDeletePost}
              style={{ marginLeft: "10px" }}
            >
              Delete Post
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default EditForm;
