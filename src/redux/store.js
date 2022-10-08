import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { filterReducer } from "./filterSlice";
import { cartReducer } from "./cartSlice";

const rootReducer = combineReducers({
  filter: filterReducer,
  cart: cartReducer,
});
export const store = configureStore({
  reducer: rootReducer,
});
