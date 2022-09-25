import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { filterReducer } from "./filterSlice";

const rootReducer = combineReducers({
  filter: filterReducer,
});
export const store = configureStore({
  reducer: rootReducer,
});
