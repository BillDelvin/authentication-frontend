import { combineReducers } from "@reduxjs/toolkit";
import auth from "./slicers/auth";

export const reducer = combineReducers({
  auth,
});
