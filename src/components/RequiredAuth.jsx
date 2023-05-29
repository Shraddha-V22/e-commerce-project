import React from "react";
import { getItemFromLocalStorage } from "../common/utils";
import { Navigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function RequiredAuth({ children }) {
  const location = useLocation();
  const { isLoggedIn } = useAuth();
  return !isLoggedIn ? (
    <Navigate to="/login" state={{ from: location }} />
  ) : (
    children
  );
}
