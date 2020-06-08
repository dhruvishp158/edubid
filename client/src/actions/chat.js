import { GET_CHATS, AFTER_POST_MESSAGE } from "./types";
import axios from "axios";

export const getChats = (toId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/chat/${toId}`);

    if (res.data) {
      res.data.sort((a, b) => {
        return new Date(a.date) - new Date(b.date);
      });
    }

    dispatch({
      type: GET_CHATS,
      payload: res.data,
    });
  } catch (error) {
    console.error(error);
  }
};
export const afterPostMessage = (data, toId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/chat/${toId}`);

    if (res.data) {
      res.data.sort((a, b) => {
        return new Date(a.date) - new Date(b.date);
      });
    }
    dispatch({
      type: GET_CHATS,
      payload: res.data,
    });
  } catch (error) {
    console.error(error);
  }
};
