import React from "react";
import { useReducer } from "react";
import { createContext } from "react";
import { cartReducer } from "../reducers/cartReducer";
import { useContext } from "react";
import { useEffect } from "react";
import { getItemFromLocalStorage } from "../common/utils";

const CartContext = createContext(null);
const CartDispatchContext = createContext(null);

const initialCartState = {
  cart: [],
};

export default function CartProvider({ children }) {
  const [cart, cartDispatch] = useReducer(cartReducer, initialCartState);
  const token = getItemFromLocalStorage("token");

  const getCartItems = async () => {
    if (token) {
      try {
        const res = await fetch("/api/user/cart", {
          method: "GET",
          headers: {
            authorization: token,
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
  }, []);

  return (
    <CartContext.Provider value={cart}>
      <CartDispatchContext.Provider value={cartDispatch}>
        {children}
      </CartDispatchContext.Provider>
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
export const useCartDispatch = () => useContext(CartDispatchContext);
