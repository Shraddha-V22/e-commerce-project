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
      setUser(res.createdUser);
      localStorage.setItem("encodedToken", res.encodedToken);
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
      setUser(res.foundUser);
      localStorage.setItem("encodedToken", res.encodedToken);
      alert("Login successful!");
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <AuthContext.Provider value={{ user, signUp, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
