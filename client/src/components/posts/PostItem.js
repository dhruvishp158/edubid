import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { addLike, removeLike, deletePost } from "../../actions/post";
const PostItem = ({
  auth,
  addLike,
  removeLike,
  deletePost,
  post: { _id, text, name, user, likes, comments, date, profilePicture, img },
  showActions,
}) => {
  return (
    <div className='postBody'>
      <div className='BodyWidth'>
        <a href={`/profile/${user}`} className='postHover'>
          <div className='postGrid1'>
            <div style={{ textAlign: "center" }}>
              <img
                className='round-img'
                src={`http://localhost:3000/${profilePicture}`}
                style={{
                  width: "55px",
                  height: "55px",
                  borderRadius: "50%",
                  textAlign: "center",
                }}
                alt=''
              />
            </div>
            <h3 style={{ margin: "0", marginLeft: "1rem", color: "white" }}>
              {name}
            </h3>
          </div>
        </a>

        <div>
          <p
            style={{
              color: "#c0bcbc",
              padding: "1rem",
              borderTop: "1px solid  #c0bcbc",
              marginTop: "2rem",
            }}
          >
            {text}
          </p>
          {img.length === 0 ? null : (
            <div
              className='postImageCenter'
              style={{
                display: "block",
                height: "500px",
                width: "520px",
                margin: "0 auto",
              }}
            >
              <img
                className='round-img postImage'
                src={`http://localhost:3000/${img}`}
                alt=''
              />
            </div>
          )}

          <p
            className='post-date'
            style={{
              color: "#c0bcbc",
              padding: "1rem",
              marginTop: "2rem",
            }}
          >
            Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
          </p>
          {showActions && (
            <Fragment>
              <button
                onClick={(e) => addLike(_id)}
                type='button'
                className='btn btn-light'
                style={{
                  borderRadius: "1rem",
                  margin: "1rem",
                }}
              >
                <i className='fas fa-thumbs-up'></i>{" "}
                <span>{likes.length > 0 && <span>{likes.length}</span>}</span>
              </button>
              <button
                type='button'
                style={{
                  borderRadius: "1rem",
                  margin: "1rem",
                }}
                className='btn btn-light'
                onClick={(e) => removeLike(_id)}
              >
                <i className='fas fa-thumbs-down'></i>
              </button>
              <Link
                to={`/posts/${_id}`}
                className='btn btn-primary'
                style={{
                  borderRadius: "1rem",
                  margin: "1rem",
                }}
              >
                Comments{" "}
                {comments.length > 0 && (
                  <span className='comment-count'>{comments.length}</span>
                )}
              </Link>
              {!auth.loading && user === auth.user._id && (
                <button
                  type='button'
                  className='btn btn-danger'
                  style={{
                    borderRadius: "1rem",
                    margin: "1rem",
                    background: "red",
                  }}
                  onClick={(e) => deletePost(_id)}
                >
                  <i className='fas fa-times'></i>
                </button>
              )}
            </Fragment>
          )}
        </div>
      </div>
    </div>
  );
};

PostItem.defaultProps = {
  showActions: true,
};
PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { addLike, removeLike, deletePost })(
  PostItem
);
