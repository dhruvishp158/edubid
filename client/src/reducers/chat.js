import { GET_CHATS, AFTER_POST_MESSAGE } from "../actions/types";

export default function (state = {}, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_CHATS:
      return {
        ...state,
        chats: payload,
      };
    case AFTER_POST_MESSAGE:
      return {
        ...state,
        chats: state.chats.concat(payload),
      };

    default:
      return state;
  }
}