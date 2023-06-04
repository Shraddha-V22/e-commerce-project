import React from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export default function PasswordInput({
  onChangeHandler,
  placeholder = "Password",
  name = "password",
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      {!showPassword ? (
        <input
          className="w-full rounded-md border-[1px] border-[#2C74B3]/20 p-2 outline-none"
          type="password"
          placeholder={placeholder}
          name={name}
          onChange={onChangeHandler}
        />
      ) : (
        <input
          className="w-full rounded-md border-[1px] border-[#2C74B3]/20 p-2 outline-none"
          type="text"
          placeholder={placeholder}
          name={name}
          onChange={onChangeHandler}
        />
      )}
      {showPassword ? (
        <button
          className="absolute right-2 top-2"
          onClick={() => setShowPassword((prev) => !prev)}
        >
          <FontAwesomeIcon icon={faEye} />
        </button>
      ) : (
        <button
          className="absolute right-2 top-2"
          onClick={() => setShowPassword((prev) => !prev)}
        >
          <FontAwesomeIcon icon={faEyeSlash} />
        </button>
      )}
    </div>
  );
}
