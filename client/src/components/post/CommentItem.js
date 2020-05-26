import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { deleteComment } from "../../actions/post";
const CommentItem = ({
  postId,
  comment: { _id, text, name, avatar, user, date, profilePicture },
  auth,
  deleteComment,
}) => {
  return (
    <div style={{ background: "#c0bcbc", margin: "1rem 0", padding: "1rem" }}>
      <div>
        <Link to={`/profile/${user}`}>
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
            <h3 style={{ margin: "0", marginLeft: "1rem", color: "black" }}>
              {name}
            </h3>
          </div>
        </Link>
      </div>
      <div>
        <p
          style={{
            padding: "2rem",
            borderTop: "1px solid black",
            marginTop: "1rem",
          }}
        >
          {text}
        </p>
        <p className='post-date'>
          Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
        </p>
        {!auth.loading && user === auth.user._id && (
          <button
            onClick={(e) => deleteComment(postId, _id)}
            type='button'
            className='btn btn-danger'
            style={{ background: "red" }}
          >
            <i className='fas fa-times'></i>
          </button>
        )}
      </div>
    </div>
  );
};

CommentItem.propTypes = {
  postId: PropTypes.string.isRequired,
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { deleteComment })(CommentItem);
