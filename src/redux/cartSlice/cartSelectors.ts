import { RootState } from "../store";

const getCartSlice = (state: RootState) => state.cart;

export const getItems = (state: RootState) => getCartSlice(state).items;
export const getTotalPrice = (state: RootState) => getCartSlice(state).totalPrice;

export const getCartItemsById = (id: string) => (state: RootState) =>
  getItems(state).find((obj) => obj.id === id);
