import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { getImgUrl } from "../common/utils";
import { useCart } from "../contexts/CartProvider";
import { useProducts, useProductsDispatch } from "../contexts/ProductProvider";

export default function Header() {
  const { cart } = useCart();
  const {
    products: { categories },
  } = useProducts();
  const [showCategories, setShowCategories] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);
  const productDispatch = useProductsDispatch();
  const categoryRef = useRef(null);
  const timerId = useRef(null);

  const handleMouseEnter = () => {
    if (timerId.current) {
      clearTimeout(timerId);
    }
    setShowCategories(true);
  };

  const handleMouseLeave = () => {
    timerId.current = setTimeout(() => setShowCategories(false), 300);
  };

  useEffect(() => {
    categoryRef.current?.addEventListener("mouseenter", handleMouseEnter);
    categoryRef.current?.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      categoryRef.current?.removeEventListener("mouseenter", handleMouseEnter);
      categoryRef.current?.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <header className="fixed top-0 z-10 flex w-full items-center justify-between gap-4 bg-white p-4 pt-2">
      <h1 className="font-bold">
        <Link to="/">Shop-On</Link>
      </h1>
      <section className="mr-auto" ref={categoryRef}>
        <p className="cursor-pointer">Categories</p>
        {showCategories ? (
          <article
            className={`absolute left-0 right-0 top-[40px] grid h-[fit-content] w-[100vw] grid-cols-3 bg-white p-8`}
          >
            {categories.map(({ categoryName }) => (
              <div className="flex items-start gap-4">
                <h1 className="capitalize">{categoryName}</h1>
                <img
                  className="h-[100px] w-[100px] rounded-lg object-cover"
                  src={getImgUrl(categoryName)}
                  alt=""
                />
              </div>
            ))}
          </article>
        ) : null}
      </section>
      <ul className="flex items-center gap-4">
        <li className="flex items-center gap-2 rounded-md border-[1px] border-[#2C74B3]/20 p-2">
          <button onClick={() => setShowSearchInput((prev) => !prev)}>
            <FontAwesomeIcon icon={faSearch} />
          </button>
          {showSearchInput && (
            <input
              type="text"
              placeholder="search products..."
              className="outline-none"
              onChange={(e) =>
                productDispatch({ type: "SEARCH", payload: e.target.value })
              }
            />
          )}
        </li>
        <li className="relative">
          <Link to="/cart">
            <FontAwesomeIcon icon={faCartShopping} />
          </Link>
          {cart.length > 0 && (
            <p className="absolute -right-3 -top-3 rounded-full p-1 pt-0.5 text-sm font-bold text-red-500">
              {cart.length}
            </p>
          )}
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
