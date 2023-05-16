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

export default function Header() {
  const [showCategories, setShowCategories] = useState(false);
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
    <header className="fixed top-0 z-10 flex w-full items-end justify-between gap-4 bg-white p-4 pt-2">
      <h1 className="font-bold">
        <Link to="/">Shop-On</Link>
      </h1>
      <section className="mr-auto" ref={categoryRef}>
        <p className="cursor-pointer">Categories</p>
        {showCategories ? (
          <article
            className={`absolute left-0 right-0 top-[40px] grid h-[fit-content] w-[100vw] grid-cols-3 bg-white p-8`}
          >
            <div className="flex items-start gap-4">
              <h1>Clothing</h1>
              <img
                className="h-[100px] w-[100px] rounded-lg object-cover"
                src={getImgUrl("Clothing")}
                alt=""
              />
            </div>
            <div className="flex items-start gap-4">
              <h1>Shoes</h1>
              <img
                className="h-[100px] w-[100px] rounded-lg object-cover"
                src={getImgUrl("Shoes")}
                alt=""
              />
            </div>
            <div className="flex items-start gap-4">
              <h1>Accessories</h1>
              <img
                className="h-[100px] w-[100px] rounded-lg object-cover"
                src={getImgUrl("Accessories")}
                alt=""
              />
            </div>
          </article>
        ) : null}
      </section>
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
