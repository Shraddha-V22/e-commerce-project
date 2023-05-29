export const wishlistReducer = (state, { type, payload }) => {
  switch (type) {
    case "INITIALISE_WISHLIST":
      return {
        ...state,
        wishlist: payload,
      };
    case "RESET_WISHLIST":
      return {
        ...state,
        wishlist: [],
      };
    default:
      return state;
  }
};
