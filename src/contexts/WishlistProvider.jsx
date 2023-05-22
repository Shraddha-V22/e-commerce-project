import React from "react";
import { useReducer } from "react";
import { createContext } from "react";
import { useContext } from "react";
import { wishlistReducer } from "../reducers/wishlistReducer";
import { getItemFromLocalStorage } from "../common/utils";
import { useEffect } from "react";

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
  const token = getItemFromLocalStorage("token");

  const getWishlistItems = async () => {
    if (token) {
      try {
        const res = await fetch("/api/user/wishlist", {
          method: "GET",
          headers: {
            authorization: token,
          },
        });
        const result = await res.json();
        console.log(result);
        wishlistDispatch({ type: "INITIALISE_CART", payload: result.wishlist });
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    getWishlistItems();
  }, []);

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
