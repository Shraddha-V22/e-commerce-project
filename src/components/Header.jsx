import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
  return (
    <header className="fixed top-0 flex w-full items-center justify-between gap-4 bg-white p-4">
      <h1>
        <Link to="/">Shop-On</Link>
      </h1>
      <p className="mr-auto">Categories</p>
      <ul className="flex gap-4">
        <li>
          <FontAwesomeIcon icon={faSearch} />
        </li>
        <li>
          <Link to="/cart">
            <FontAwesomeIcon icon={faCartShopping} />
          </Link>
        </li>
        <li>
          <Link to="/wishlist">
            <FontAwesomeIcon icon={faHeart} />
          </Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </ul>
    </header>
  );
}
