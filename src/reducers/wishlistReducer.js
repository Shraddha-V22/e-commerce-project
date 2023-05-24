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
        wishlist: [...state.wishlist, payload],
      };
    case "REMOVE_FROM_WISHLIST":
      return {
        ...state,
        wishlist: state.wishlist.filter((item) => item.id !== payload),
      };
    default:
      return state;
  }
};
