import { GET_CHATS, AFTER_POST_MESSAGE } from "./types";
import axios from "axios";

export const getChats = (toId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/chat/${toId}`);
    console.log(res.data);

    if (res.data.user) {
      res.data.user.messages.sort((a, b) => {
        return new Date(a.date) - new Date(b.date);
      });
    }

    if (res.data.friend) {
      res.data.friend.messages.sort((a, b) => {
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
    data = data.to.find((to) => to.id.toString() === toId);
    console.log(data);
    data.messages.sort((a, b) => {
      return new Date(a.date) - new Date(b.date);
    });

    dispatch({
      type: AFTER_POST_MESSAGE,
      payload: data,
    });
  } catch (error) {
    console.error(error);
  }
};
