import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { createContext } from "react";
import { toast } from "react-toastify";
import { getItemFromLocalStorage } from "../common/utils";

const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState({ userDetails: {}, token: "" });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const signUp = async (creds) => {
    try {
      const request = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(creds),
      });

      const res = await request.json();

      if (res.errors) {
        if (res.errors[0] === 422) {
          toast.error("Email Already Exists!");
        }
      } else {
        setUser({
          userDetails: res.createdUser,
          token: res.encodedToken,
        });
        if (res.encodedToken != "undefinded") setIsLoggedIn(true);
        toast.success("Registered Successfully!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    }
  };
  const signIn = async (creds) => {
    try {
      const request = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(creds),
      });

      const res = await request.json();
      if (res.errors) {
        if (res.errors[0] === 404) {
          toast.error("Email entered is not registered!");
        } else if (res.errors[0] === 401) {
          toast.error("Invalid Email or Password!");
        }
      } else {
        setUser({
          userDetails: res.foundUser,
          token: res.encodedToken,
        });
        if (res.encodedToken != "undefinded") setIsLoggedIn(true);
        toast.success("Logged In Successfully!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    }
  };

  const signOut = () => {
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{ user, isLoggedIn, setUser, signUp, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
