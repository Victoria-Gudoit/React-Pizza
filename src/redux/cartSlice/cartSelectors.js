const getCartSlice = (state) => state.cart;

export const getItems = (state) => getCartSlice(state).items;
export const getTotalPrice = (state) => getCartSlice(state).totalPrice;
