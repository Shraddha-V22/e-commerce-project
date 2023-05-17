import React from "react";
import { useReducer } from "react";
import { createContext } from "react";
import { useContext } from "react";
import { wishlistReducer } from "../reducers/wishlistReducer";

const WishlistContext = createContext(null);
const WishlistDispatchContext = createContext(null);

const initialWishlistState = {
  wishlist: [],
};

export default function WishlistProvider({ children }) {
  const [wishlist, wishlistDispatch] = useReducer(
    wishlistReducer,
    initialWishlistState
  );
  return (
    <WishlistContext.Provider value={wishlist}>
      <WishlistDispatchContext.Provider value={wishlistDispatch}>
        {children}
      </WishlistDispatchContext.Provider>
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => useContext(WishlistContext);
export const useWishlistDispatch = () => useContext(WishlistDispatchContext);
