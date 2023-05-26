import React from "react";
import { getItemFromLocalStorage } from "../common/utils";
import { Navigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function RequiredAuth({ children }) {
  const location = useLocation();
  const token = getItemFromLocalStorage("token");
  console.log(location);
  return !token ? (
    <Navigate to="/login" state={{ from: location }} />
  ) : (
    children
  );
}
