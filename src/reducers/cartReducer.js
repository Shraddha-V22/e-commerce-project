export const cartReducer = (state, { type, payload }) => {
  switch (type) {
    case "INITIALISE_CART":
      return {
        ...state,
        cart: payload,
      };
    default:
      return state;
  }
};
