import React from "react";
import { getItemFromLocalStorage } from "../common/utils";
import { Navigate } from "react-router-dom";

export default function RequiredAuth({ children }) {
  const token = getItemFromLocalStorage("token");
  return !token ? <Navigate to="/login" /> : children;
}
