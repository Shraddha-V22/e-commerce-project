import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";
import { useNavigate } from "react-router-dom";
import PasswordInput from "../components/PasswordInput";
import { toast } from "react-toastify";

export default function Login() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [loginCreds, setLoginCreds] = useState({ email: "", password: "" });

  const handleLoginCreds = (e) => {
    const { name, value } = e.target;
    setLoginCreds((prev) => ({ ...prev, [name]: value }));
  };

  const loginHandler = (e, creds) => {
    e.preventDefault();
    if (creds.email.length === 0) {
      toast.error("Please enter a valid email");
      return;
    }
    if (creds.password.length === 0) {
      toast.error("Please enter a valid password");
      return;
    }
    signIn(creds);
    navigate("/");
  };

  return (
    <section className="mb-8 grid w-full place-items-center">
      <article className="flex max-w-[350px] flex-col gap-8 rounded-md bg-white p-8">
        <h1 className="text-center capitalize">Sign in</h1>
        <form className="flex flex-col gap-6">
          <input
            className="rounded-md border-[1px] border-[#2C74B3]/20 p-2 outline-none"
            type="email"
            placeholder="Email"
            name="email"
            onChange={handleLoginCreds}
          />
          <PasswordInput onChangeHandler={handleLoginCreds} />
          <button
            onClick={(e) => loginHandler(e, loginCreds)}
            className="rounded-md border-[1px] border-[#2C74B3]/20 p-2"
          >
            Sign in
          </button>
          <button
            onClick={(e) =>
              loginHandler(e, {
                email: "adarshbalika@gmail.com",
                password: "adarshbalika",
              })
            }
            className="rounded-md border-[1px] border-[#2C74B3]/20 p-2"
          >
            Sign in as Guest
          </button>
        </form>
        <div className="flex gap-1">
          <p>Haven't registered yet?</p>
          <span className="capitalize text-blue-500 hover:underline">
            <Link to="/registration">Sign up</Link>
          </span>
        </div>
      </article>
    </section>
  );
}
