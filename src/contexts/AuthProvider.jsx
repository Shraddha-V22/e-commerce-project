import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { createContext } from "react";

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
      // console.log(res);
      localStorage.setItem("token", res.encodedToken);
      // setUser(creds.email);
      alert("Login successful!");
    } catch (error) {
      console.error(error);
      alert(error.message);
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
