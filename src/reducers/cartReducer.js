export const cartReducer = (state, { type, payload }) => {
  switch (type) {
    case "INITIALISE_CART":
      return {
        ...state,
        cart: payload,
      };
    case "RESET_CART":
      return {
        ...state,
        cart: [],
      };
    default:
      return state;
  }
};
