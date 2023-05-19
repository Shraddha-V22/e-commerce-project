import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";
import { useNavigate } from "react-router-dom";

export default function Registration() {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [signUpCreds, setSignUpCreds] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleSignUpCreds = (e) => {
    const { name, value } = e.target;
    if (value !== "") {
      setSignUpCreds((prev) => ({ ...prev, [name]: value }));
    }
  };

  const signUpHandler = (creds) => {
    signUp(creds);
    navigate("/");
  };

  return (
    <section className="grid h-[100vh] w-full place-items-center">
      <article className="flex w-[350px] flex-col gap-8 rounded-md border-[1px] border-[#2C74B3]/20 p-8">
        <h1 className="text-center capitalize">Sign up</h1>
        <div className="mx-auto flex w-[250px] flex-col gap-6">
          <input
            className="rounded-md border-[1px] border-[#2C74B3]/20 p-2 outline-none"
            type="text"
            placeholder="Firstname"
            name="firstName"
            onChange={handleSignUpCreds}
          />
          <input
            className="rounded-md border-[1px] border-[#2C74B3]/20 p-2 outline-none"
            type="text"
            placeholder="Lastname"
            name="lastName"
            onChange={handleSignUpCreds}
          />
          <input
            className="rounded-md border-[1px] border-[#2C74B3]/20 p-2 outline-none"
            type="email"
            placeholder="Email"
            name="email"
            onChange={handleSignUpCreds}
          />
          <input
            className="rounded-md border-[1px] border-[#2C74B3]/20 p-2 outline-none"
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleSignUpCreds}
          />
          <button
            onClick={() => signUpHandler(signUpCreds)}
            className="rounded-md border-[1px] border-[#2C74B3]/20 p-2"
          >
            Sign up
          </button>
        </div>
        <div className="flex justify-center gap-1">
          <p>Already registered?</p>
          <span className="capitalize text-blue-500 hover:underline">
            <Link to="/login">Sign in</Link>
          </span>
        </div>
      </article>
    </section>
  );
}
