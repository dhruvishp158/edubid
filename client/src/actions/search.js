import { GET_SEARCH_RESULT } from "./types";
import axios from "axios";

export const getSeacrhresults = (search) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    let res = await axios.post("/api/profile/search", search, config);
    dispatch({ type: "GET_SEARCH_RESULT", payload: res.data });
  } catch (error) {
    console.error(error);
  }
};
