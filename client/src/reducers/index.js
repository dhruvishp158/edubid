import { combineReducers } from "redux";
import alert from "../reducers/alert";
import auth from "./auth";
import profile from "./profile";
import post from "./post";
import chat from "./chat";
import search from "./search";
export default combineReducers({ alert, auth, profile, post, chat, search });
