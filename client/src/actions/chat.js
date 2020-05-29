import { GET_CHATS, AFTER_POST_MESSAGE } from "./types";
import axios from "axios";

export const getChats = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/chat/getChats");
    dispatch({
      type: GET_CHATS,
      payload: res.data,
    });
  } catch (error) {
    console.error(error);
  }
};
export const afterPostMessage = (data) => async (dispatch) => {
  try {
    dispatch({
      type: AFTER_POST_MESSAGE,
      payload: data,
    });
  } catch (error) {
    console.error(error);
  }
};
