import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";
import { useNavigate } from "react-router-dom";
import { getItemFromLocalStorage } from "../common/utils";

export default function Login() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [loginCreds, setLoginCreds] = useState({ email: "", password: "" });
  // const token = getItemFromLocalStorage("token");

  const handleLoginCreds = (e) => {
    const { name, value } = e.target;
    setLoginCreds((prev) => ({ ...prev, [name]: value }));
  };

  const loginHandler = (creds) => {
    signIn(creds);
    navigate("/");
  };

  // const loginAsGuest = (creds) => {

  // }

  return (
    <section className="grid h-[100vh] w-full place-items-center">
      <article className="flex max-w-[350px] flex-col gap-8 rounded-md border-[1px] border-[#2C74B3]/20 p-8">
        <h1 className="text-center capitalize">Sign in</h1>
        <div className="flex flex-col gap-6">
          <input
            className="rounded-md border-[1px] border-[#2C74B3]/20 p-2 outline-none"
            type="email"
            placeholder="Email"
            name="email"
            onChange={handleLoginCreds}
          />
          <input
            className="rounded-md border-[1px] border-[#2C74B3]/20 p-2 outline-none"
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleLoginCreds}
          />
          <button
            onClick={() => loginHandler(loginCreds)}
            className="rounded-md border-[1px] border-[#2C74B3]/20 p-2"
          >
            Sign in
          </button>
          <button
            onClick={() =>
              loginHandler({
                email: "adarshbalika@gmail.com",
                password: "adarshbalika",
              })
            }
            className="rounded-md border-[1px] border-[#2C74B3]/20 p-2"
          >
            Sign in as Guest
          </button>
        </div>
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
