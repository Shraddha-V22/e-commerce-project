export const cartReducer = (state, { type, payload }) => {
  switch (type) {
    case "INITIALISE_CART":
      return {
        ...state,
        cart: payload,
      };
    case "ADD_TO_CART":
      payload.qty = 1;
      return {
        ...state,
        cart: state.cart.every((item) => item.id !== payload.id)
          ? [...state.cart, payload]
          : state.cart,
      };
    case "CHANGE_QTY":
      console.log(payload);
      let tempCart =
        payload.action.type === "increment"
          ? state.cart.map((item) =>
              item.id === payload.id ? { ...item, qty: item.qty++ } : item
            )
          : state.cart.map((item) =>
              item.id === payload.id ? { ...item, qty: item.qty-- } : item
            );
      return {
        ...state,
        cart: tempCart,
      };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== payload),
      };

    default:
      return state;
  }
};
