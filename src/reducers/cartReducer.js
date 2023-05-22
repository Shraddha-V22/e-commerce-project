export const cartReducer = (state, { type, payload }) => {
  switch (type) {
    case "ADD_TO_CART":
      payload.qty = 1;
      return {
        ...state,
        cart: state.cart.every((item) => item.id !== payload.id)
          ? [...state.cart, payload]
          : state.cart,
      };
    case "CHANGE_QTY":
      console.log(payload.value);
      let tempCart =
        payload.value !== 0
          ? state.cart.map((item) =>
              item.id === payload.id ? { ...item, qty: payload.value } : item
            )
          : state.cart.filter(({ id }) => id !== payload.id);
      return {
        ...state,
        cart: tempCart,
      };
    default:
      return state;
  }
};
