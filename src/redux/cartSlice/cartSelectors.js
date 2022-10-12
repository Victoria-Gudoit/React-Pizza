const getCartSlice = (state) => state.cart;

export const getItems = (state) => getCartSlice(state).items;
export const getTotalPrice = (state) => getCartSlice(state).totalPrice;

export const getCartItemsById = (id) => (state) =>
  getItems(state).find((obj) => obj.id === id);
