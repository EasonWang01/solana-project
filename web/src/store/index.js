import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import user from "./user";
import peers from "./peers";

const reducer = combineReducers({
  user,
  peers,
});
const store = configureStore({
  reducer,
});
export default store;
