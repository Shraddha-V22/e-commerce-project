import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faBagShopping } from "@fortawesome/free-solid-svg-icons";
import { useRef, useState, useEffect } from "react";
import { getImgUrl } from "../common/utils";
import { useCart } from "../contexts/CartProvider";
import { useProducts, useProductsDispatch } from "../contexts/ProductProvider";
import { useAuth } from "../contexts/AuthProvider";
import { useWishlist } from "../contexts/WishlistProvider";

export default function Header() {
  const { cart } = useCart();
  const { wishlist } = useWishlist();
  const {
    products: { categories },
  } = useProducts();
  const [showCategories, setShowCategories] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const productDispatch = useProductsDispatch();
  const navigate = useNavigate();
  const categoryRef = useRef(null);
  const timerId = useRef(null);
  const { signOut } = useAuth();

  const userFound = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

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

  const categoryOnClickHandler = (categoryName) => {
    navigate("/products");
    productDispatch({
      type: "CATEGORY_FILTER",
      payload: {
        name:
          categoryName[0].toUpperCase() +
          categoryName.substr(1, categoryName.length),
        checked: true,
      },
    });
  };

  return (
    <header className="fixed top-0 z-10 flex w-full items-center justify-between gap-4 bg-white p-4 pt-2 shadow-sm">
      <h1 className="font-cinzel font-bold text-pink-600">
        <Link to="/">charme</Link>
      </h1>
      <button onClick={() => navigate("/products")}>
        <FontAwesomeIcon icon={faBagShopping} title="See all products" />
      </button>
      <section className="mr-auto" ref={categoryRef}>
        <p className="cursor-pointer">Categories</p>
        {showCategories ? (
          <article
            className={`absolute left-0 right-0 top-[40px] flex h-[fit-content] w-[100vw] justify-around bg-white p-8`}
          >
            {categories.map(({ _id, categoryName }) => (
              <div
                className="flex cursor-pointer items-start gap-4"
                onClick={() => categoryOnClickHandler(categoryName)}
                key={_id}
              >
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
        <li className="flex items-center gap-2 rounded-md p-2">
          <button onClick={() => setShowSearchInput((prev) => !prev)}>
            <FontAwesomeIcon icon={faSearch} title="Search products" />
          </button>
          {showSearchInput && (
            <input
              type="text"
              placeholder="Search products..."
              className="border-b-[1px] border-[#2C74B3]/20 outline-none"
              onChange={(e) =>
                productDispatch({ type: "SEARCH", payload: e.target.value })
              }
            />
          )}
        </li>
        <li className="relative">
          <Link to="/cart">
            <FontAwesomeIcon icon={faCartShopping} title="Cart" />
          </Link>

          {cart.length > 0 && (
            <p className="absolute -right-3 -top-3 rounded-full p-1 pt-0.5 text-sm font-bold text-red-500">
              {cart.length}
            </p>
          )}
        </li>
        <li className="relative">
          <Link to="/wishlist">
            <FontAwesomeIcon icon={faHeart} title="Wishlist" />
          </Link>
          {wishlist.length > 0 && (
            <p className="absolute -right-3 -top-3 rounded-full p-1 pt-0.5 text-sm font-bold text-red-500">
              {wishlist.length}
            </p>
          )}
        </li>
        {!token ? (
          <li>
            <Link to="/login">
              <FontAwesomeIcon icon={faUser} title="Login" />
            </Link>
          </li>
        ) : (
          <div>
            <button
              onClick={() => setShowProfileMenu((prev) => !prev)}
              className="relative rounded-full bg-pink-600/90 p-1 px-2 uppercase text-white"
            >
              {userFound?.firstName.substr(0, 1)}
              {userFound?.lastName.substr(0, 1)}
            </button>
            <ul
              className={`${
                showProfileMenu ? "" : "hidden"
              } absolute right-6 bg-white p-1 shadow-md`}
            >
              <li
                onClick={() => {
                  navigate("/profile");
                  setShowProfileMenu(false);
                }}
                className="cursor-pointer border-b-[1px] border-black p-1 pl-1"
              >
                Go to profile
              </li>
              <li
                className="cursor-pointer p-1 pl-1"
                onClick={() => {
                  console.log("clicked");
                  signOut();
                  window.location.reload();
                }}
              >
                logout
              </li>
            </ul>
          </div>
        )}
      </ul>
    </header>
  );
}
