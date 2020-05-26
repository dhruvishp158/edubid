import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addPost } from "../../actions/post";
import UploadImg from "./UploadImg";

const PostForm = ({ addPost }) => {
  const [text, setText] = useState("");
  const [img, setImages] = useState([]);
  let formData = { text, img };
  const handleSubmit = (e) => {
    e.preventDefault();

    addPost(formData);
    setText("");
  };
  return (
    <div className='post-form'>
      <div className='postForm-1'>
        <span>
          {" "}
          <i
            className='far fa-edit'
            style={{ fontSize: "3rem", margin: "1rem" }}
          ></i>
        </span>
        <h3 style={{ display: "inline-block" }}>START A POST</h3>
      </div>

      <div className='postForm-2'>
        <form className='form my-1' onSubmit={handleSubmit}>
          <div
            className='textImage'
            style={{ marginTop: "2rem", marginBottom: "2rem" }}
          >
            <div>
              <textarea
                name='text'
                className='postTextArea'
                cols='30'
                rows='5'
                placeholder='Write somethiign here'
                onChange={(e) => setText(e.target.value)}
                style={{
                  textAlign: "center",
                  height: "match-parent",
                  height: "auto",
                  marginLeft: "1rem",
                  maxWidth: "410px",
                  color: "white",
                  borderColor: "white",
                }}
                value={text}
                required
              ></textarea>
            </div>

            <div style={{ textAlign: "center", fontSize: "3rem" }}>
              {" "}
              <UploadImg
                refreshFunction={(newImages) => setImages(newImages)}
              />
            </div>

            <div style={{ textAlign: "left" }}>
              <button
                className='btn btn-light'
                style={{ borderRadius: "1rem", margin: "1rem", width: "232px" }}
                onSubmit={(e) => handleSubmit(e)}
              >
                UPLOAD POST
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
};

export default connect(null, { addPost })(PostForm);
