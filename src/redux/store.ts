import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { filterReducer } from "./filterSlice";
import { cartReducer } from "./cartSlice";
import { productsPageReducer } from "./productsPageSlice";

const rootReducer = combineReducers({
  filter: filterReducer,
  cart: cartReducer,
  products: productsPageReducer,
});
export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>
