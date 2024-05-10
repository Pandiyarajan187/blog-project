import moment from "moment";

const DisplayComments = ({ comments }) => {
  return (
    <div className="mt-2">
      {comments.map((comment) => (
        <div key={comment._id}>
          {comment.comment} - {moment(comment.createdAt).format("lll")}
        </div>
      ))}
    </div>
  );
};

export default DisplayComments;
