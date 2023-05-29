import React from "react";
import { useReducer } from "react";
import { createContext } from "react";
import { useContext } from "react";
import { wishlistReducer } from "../reducers/wishlistReducer";
import { getItemFromLocalStorage } from "../common/utils";
import { useEffect } from "react";
import { useAuth } from "./AuthProvider";

const WishlistContext = createContext({ wishlist: [] });
const WishlistDispatchContext = createContext(null);

const initialWishlistState = {
  wishlist: [],
};

export default function WishlistProvider({ children }) {
  const [wishlist, wishlistDispatch] = useReducer(
    wishlistReducer,
    initialWishlistState
  );
  const { user, isLoggedIn } = useAuth();

  const getWishlistItems = async () => {
    if (isLoggedIn) {
      try {
        const res = await fetch("/api/user/wishlist", {
          method: "GET",
          headers: {
            authorization: user.token,
          },
        });
        const result = await res.json();
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
    <WishlistDispatchContext.Provider value={wishlistDispatch}>
      <WishlistContext.Provider value={wishlist}>
        {children}
      </WishlistContext.Provider>
    </WishlistDispatchContext.Provider>
  );
}

export const useWishlist = () => useContext(WishlistContext);
export const useWishlistDispatch = () => useContext(WishlistDispatchContext);
