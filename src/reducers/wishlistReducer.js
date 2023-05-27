export const wishlistReducer = (state, { type, payload }) => {
  switch (type) {
    case "INITIALISE_WISHLIST":
      return {
        ...state,
        wishlist: payload,
      };
    default:
      return state;
  }
};
