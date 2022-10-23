import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { filterReducer } from "./filterSlice";
import { cartReducer } from "./cartSlice";
import { productsPageReducer } from "./productsPageSlice";
import { useDispatch } from "react-redux";

const rootReducer = combineReducers({
  filter: filterReducer,
  cart: cartReducer,
  products: productsPageReducer,
});
export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>

type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
