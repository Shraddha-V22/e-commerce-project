import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { createContext } from "react";
import { toast } from "react-toastify";
import { getItemFromLocalStorage } from "../common/utils";

const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(
    () => JSON.parse(getItemFromLocalStorage("user")) || {}
  );

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
          toast.error("Email Already Exists!", {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      } else {
        setUser({
          firstName: res.createdUser.firstName,
          lastName: res.createdUser.lastName,
          addresses: [],
        });
        localStorage.setItem(
          "user",
          JSON.stringify({
            firstName: res.createdUser.firstName,
            lastName: res.createdUser.lastName,
            addresses: [],
          })
        );
        localStorage.setItem("token", res.encodedToken);
        toast.success("Registered Successfully!", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!", {
        position: toast.POSITION.TOP_CENTER,
      });
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
          toast.error("Email entered is not registered!", {
            position: toast.POSITION.TOP_CENTER,
          });
        } else if (res.errors[0] === 401) {
          toast.error("Invalid Email or Password!", {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      } else {
        setUser({
          firstName: res.foundUser.firstName,
          lastName: res.foundUser.lastName,
          addresses: [],
        });
        localStorage.setItem(
          "user",
          JSON.stringify({
            firstName: res.foundUser.firstName,
            lastName: res.foundUser.lastName,
            addresses: [],
          })
        );
        localStorage.setItem("token", res.encodedToken);
        toast.success("Logged In Successfully!", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  const signOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, setUser, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
