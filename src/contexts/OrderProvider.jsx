import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";

const OrderContext = createContext(null);

export default function OrderProvider({ children }) {
  const [orders, setOrders] = useState([]);

  return (
    <OrderContext.Provider value={{ orders, setOrders }}>
      {children}
    </OrderContext.Provider>
  );
}

export const useOrders = () => useContext(OrderContext);
