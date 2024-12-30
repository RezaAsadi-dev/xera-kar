import { configureStore } from "@reduxjs/toolkit";

import { combineReducers } from "redux";

import  loaderSlice  from "./loaderSlice";

const reducer = combineReducers({
  loaderHandler: loaderSlice,
});
export const store = configureStore({
  reducer,
});
 