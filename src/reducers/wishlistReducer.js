export const wishlistReducer = (state, { type, payload }) => {
  switch (type) {
    case "INITIALISE_WISHLIST":
      return {
        ...state,
        wishlist: payload,
      };
    case "ADD_TO_WISHLIST":
      return {
        ...state,
        wishlist: state.wishlist.find((item) => item.id === payload.id)
          ? state.wishlist.filter((item) => item.id !== payload.id)
          : [...state.wishlist, payload],
      };
    default:
      return state;
  }
};
