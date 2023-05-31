import React from "react";
import { useReducer } from "react";
import { createContext } from "react";
import { cartReducer } from "../reducers/cartReducer";
import { useContext } from "react";
import { useEffect } from "react";
import { getItemFromLocalStorage } from "../common/utils";
import { useAuth } from "./AuthProvider";

const CartContext = createContext({ cart: [] });
const CartDispatchContext = createContext(null);

const initialCartState = {
  cart: [],
};

export default function CartProvider({ children }) {
  const [cart, cartDispatch] = useReducer(cartReducer, initialCartState);
  const { user, isLoggedIn } = useAuth();

  const getCartItems = async () => {
    if (isLoggedIn) {
      try {
        const res = await fetch("/api/user/cart", {
          method: "GET",
          headers: {
            authorization: user.token,
          },
        });
        const result = await res.json();
        cartDispatch({ type: "INITIALISE_CART", payload: result.cart });
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    getCartItems();
  }, [isLoggedIn]);

  return (
    <CartDispatchContext.Provider value={cartDispatch}>
      <CartContext.Provider value={cart}>{children}</CartContext.Provider>
    </CartDispatchContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
export const useCartDispatch = () => useContext(CartDispatchContext);
