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

    // if (res.data.friend) {
    //   res.data.friend.messages.sort((a, b) => {
    //     return new Date(a.date) - new Date(b.date);
    //   });
    // }
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
    // data = data.to.find((to) => to.id.toString() === toId);
    // console.log(data);
    // data.messages.sort((a, b) => {
    //   return new Date(a.date) - new Date(b.date);
    // });
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
    // dispatch({
    //   type: AFTER_POST_MESSAGE,
    //   // payload: data,
    //   payload: data,
    // });
  } catch (error) {
    console.error(error);
  }
};
