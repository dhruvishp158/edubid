import { GET_SEARCH_RESULT } from "../actions/types";

export default function (state = {}, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_SEARCH_RESULT:
      return {
        ...state,
        found: payload,
      };

    default:
      return state;
  }
}
