import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { createContext } from "react";
import { toast } from "react-toastify";

const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState({});

  const signUp = async (creds) => {
    try {
      const request = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(creds),
      });

      const res = await request.json();
      localStorage.setItem("user", JSON.stringify(res.createdUser));
      // setUser(JSON.parse(localStorage.getItem(res.createdUser.email)));
      localStorage.setItem("token", res.encodedToken);
      alert("Registration successful!");
    } catch (error) {
      console.error(error);
      alert(error.message);
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
  };

  return (
    <AuthContext.Provider value={{ user, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
