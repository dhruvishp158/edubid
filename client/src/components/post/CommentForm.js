import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addComment } from "../../actions/post";
const CommentForm = ({ postId, addComment }) => {
  const [text, setText] = useState("");
  return (
    <div className='post-form'>
      <div className='comment'>
        <h3>Leave a comment</h3>
      </div>
      <form
        className='form my-1'
        onSubmit={(e) => {
          e.preventDefault();

          addComment(postId, { text });
          setText("");
        }}
      >
        <textarea
          name='text'
          cols='30'
          rows='5'
          value={text}
          style={{ color: "white" }}
          placeholder='Leave comment here...'
          onChange={(e) => setText(e.target.value)}
          required
        ></textarea>

        <input
          type='submit'
          value='Submit'
          style={{ borderRadius: "1rem", margin: "1rem", width: "232px" }}
        />
      </form>
    </div>
  );
};

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
};

export default connect(null, { addComment })(CommentForm);
