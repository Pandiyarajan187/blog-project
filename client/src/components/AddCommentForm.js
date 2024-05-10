import React from "react";
import { Form, Button } from "react-bootstrap";

const AddCommentForm = ({
  index,
  commentInputs,
  setCommentInputs,
  handleAddComment,
}) => {
  return (
    <div className="d-flex justify-content-center mt-3">
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          handleAddComment(index, commentInputs[index]);
        }}
      >
        <Form.Control
          type="text"
          placeholder="Add a comment"
          name="comment"
          className="mr-2"
          required
          value={commentInputs[index]}
          onChange={(e) =>
            setCommentInputs((prevInputs) =>
              prevInputs.map((input, i) =>
                i === index ? e.target.value : input
              )
            )
          }
          style={{ marginBottom: "10px" }}
        />
        <Button type="submit" className="btn btn-secondary">
          Add Comment
        </Button>
      </Form>
    </div>
  );
};

export default AddCommentForm;
