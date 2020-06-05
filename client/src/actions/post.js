import axios from "axios";
import { setAlert } from "./alert";
import {
  GET_POSTS,
  POST_ERRORS,
  UPDATE_LIKES,
  DELETE_POSTS,
  ADD_POST,
  GET_POST,
  ADD_COMMENT,
  REMOVE_COMMENT,
} from "./types";

//get posts
export const getPost = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/post");

    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: POST_ERRORS,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

//get single  post
export const getSinglePost = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/post/${id}`);

    dispatch({
      type: GET_POST,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: POST_ERRORS,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

//add like
export const addLike = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/post/likes/${id}`);
    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data },
    });
  } catch (error) {
    dispatch({
      type: POST_ERRORS,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

//remove like
export const removeLike = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/post/unlike/${id}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data },
    });
  } catch (error) {
    dispatch({
      type: POST_ERRORS,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

//Delete posts
export const deletePost = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/post/${id}`);

    dispatch({
      type: DELETE_POSTS,
      payload: id,
    });
    dispatch(setAlert("Post Removed", "success"));
  } catch (error) {
    dispatch({
      type: POST_ERRORS,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

//add posts
export const addPost = (formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };
  try {
    const res = await axios.post("/api/post", formData, config);

    dispatch({
      type: ADD_POST,
      payload: res.data,
    });
    dispatch(setAlert("Post added", "success"));
  } catch (error) {
    dispatch({
      type: POST_ERRORS,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

//add comment
export const addComment = (postId, formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };
  try {
    const res = await axios.post(
      `/api/post/comment/${postId}`,
      formData,
      config
    );

    dispatch({
      type: ADD_COMMENT,
      payload: res.data,
    });
    dispatch(setAlert("Comment added", "success"));
  } catch (error) {
    dispatch({
      type: POST_ERRORS,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

//delete comment
export const deleteComment = (postId, commentId) => async (dispatch) => {
  try {
    await axios.delete(`/api/post/comment/${postId}/${commentId}`);

    dispatch({
      type: REMOVE_COMMENT,
      payload: commentId,
    });
    dispatch(setAlert("Comment removed", "success"));
  } catch (error) {
    dispatch({
      type: POST_ERRORS,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};
