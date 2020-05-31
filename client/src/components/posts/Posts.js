import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { getPost } from "../../actions/post";
import Spinner from "../layout/Spinner";
import { connect } from "react-redux";
import PostItem from "./PostItem";
import PostForm from "./PostForm";
const Posts = ({ auth, getPost, post: { posts, loading } }) => {
  useEffect(() => {
    getPost();
  }, [getPost]);
  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      {auth.user !== null && auth.user.type === "Teacher" && <PostForm />}

      {posts.map((post) => (
        <PostItem key={post._id} post={post} clg />
      ))}
    </Fragment>
  );
};

Posts.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
  auth: state.auth,
});
export default connect(mapStateToProps, { getPost })(Posts);
