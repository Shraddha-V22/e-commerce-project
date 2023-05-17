import React from "react";
import { useReducer } from "react";
import { createContext } from "react";
import { cartReducer } from "../reducers/cartReducer";
import { useContext } from "react";

const CartContext = createContext(null);
const CartDispatchContext = createContext(null);

const initialCartState = {
  cart: [],
};

export default function CartProvider({ children }) {
  const [cart, cartDispatch] = useReducer(cartReducer, initialCartState);
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
