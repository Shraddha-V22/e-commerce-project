import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";
import { useNavigate } from "react-router-dom";
import PasswordInput from "../components/PasswordInput";
import { toast } from "react-toastify";
import {
  validateEmail,
  validateName,
  validatePassword,
} from "../common/validateFunctions";

export default function Registration() {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [signUpCreds, setSignUpCreds] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSignUpCreds = (e) => {
    const { name, value } = e.target;
    if (value !== "") {
      setSignUpCreds((prev) => ({ ...prev, [name]: value }));
    }
  };

  const signUpHandler = (e, creds) => {
    e.preventDefault();
    if (!validateName(creds.firstName)) {
      toast.error("Please enter a valid firstname");
      return;
    }
    if (!validateName(creds.lastName)) {
      toast.error("Please enter a valid lastname");
      return;
    }
    if (!validateEmail(creds.email)) {
      toast.error("Please enter a vaild email");
      return;
    }
    if (!validatePassword(creds.password)) {
      toast.error(
        "Password must contain 8 characters and at least one number, one letter and one unique character such as !#$%&?"
      );
      return;
    }
    if (
      creds.password !== creds.confirmPassword ||
      creds.confirmPassword !== creds.password
    ) {
      toast.error("Password mismatch!");
      return;
    }
    signUp(creds);
    navigate("/");
  };

  return (
    <section className="mb-8 grid w-full place-items-center">
      <article className="flex w-[350px] flex-col gap-8 rounded-md bg-white p-8">
        <h1 className="text-center capitalize">Sign up</h1>
        <form className="mx-auto flex w-[250px] flex-col gap-6">
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
          <PasswordInput onChangeHandler={handleSignUpCreds} />
          <PasswordInput
            name="confirmPassword"
            placeholder="Confirm Password"
            onChangeHandler={handleSignUpCreds}
          />
          <button
            onClick={(e) => signUpHandler(e, signUpCreds)}
            className="rounded-md border-[1px] border-[#2C74B3]/20 p-2"
          >
            Sign up
          </button>
        </form>
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
