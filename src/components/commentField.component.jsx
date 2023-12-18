import React from "react";

const CommentField = ({ action, commentState }) => {
  return (
    <form onSubmit={commentState.handleSubmit}>
      <textarea
        value={commentState.values.text}
        onChange={commentState.handleChange}
        name="text"
        placeholder="Leave a comment..."
        className="input-box pl-5 placeholder:text-dark-grey resize-none h-[150px] overflow-auto"
      ></textarea>
      {
        commentState.touched.text && Boolean(commentState.errors.text) && <p className="text-red">{commentState.errors.text}</p>
      }
      <button className="btn-dark mt-5 px-5" type="submit">{"Comment"}</button>
    </form>
  );
};

export default CommentField;
