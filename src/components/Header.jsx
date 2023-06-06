import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faBagShopping } from "@fortawesome/free-solid-svg-icons";
import { getImgUrl, getItemFromLocalStorage } from "../common/utils";
import { useCart, useCartDispatch } from "../contexts/CartProvider";
import { useProducts, useProductsDispatch } from "../contexts/ProductProvider";
import { useAuth } from "../contexts/AuthProvider";
import { useWishlist, useWishlistDispatch } from "../contexts/WishlistProvider";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";

export default function Header() {
  const { cart } = useCart();
  const { wishlist } = useWishlist();
  const cartDispatch = useCartDispatch();
  const wishlistDispatch = useWishlistDispatch();
  const productDispatch = useProductsDispatch();
  const {
    products: { categories, search },
  } = useProducts();
  const { signOut, user, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const categoryRef = useRef(null);
  const timerId = useRef(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [show, setShow] = useState({
    categories: false,
    searchInput: false,
    profileMenu: false,
  });

  const handleMouseEnter = () => {
    if (timerId.current) {
      clearTimeout(timerId);
    }
    setShow((prev) => ({ ...prev, categories: true }));
  };

  const handleMouseLeave = () => {
    timerId.current = setTimeout(
      () => setShow((prev) => ({ ...prev, categories: false })),
      300
    );
  };

  useEffect(() => {
    window.addEventListener("resize", (e) => {
      return setWindowWidth(e.target.innerWidth);
    });

    return () =>
      window.addEventListener("resize", (e) => {
        return setWindowWidth(e.target.innerWidth);
      });
  }, [windowWidth]);

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
      payload:
        categoryName[0].toUpperCase() +
        categoryName.substr(1, categoryName.length),
    });
  };

  const logUserOut = () => {
    signOut();
    toast.success("Logged out!");
    cartDispatch({ type: "RESET_CART" });
    wishlistDispatch({ type: "RESET_WISHLIST" });
    navigate("/");
  };

  useEffect(() => {
    window.addEventListener("click", () =>
      setShow((prev) => ({ ...prev, profileMenu: prev.profileMenu && false }))
    );

    window.removeEventListener("click", () =>
      setShow((prev) => ({ ...prev, profileMenu: prev.profileMenu && false }))
    );
  }, []);

  return (
    <header className="fixed top-0 z-10 flex w-full items-center justify-between gap-4 bg-white p-4 pt-2 shadow-sm">
      <div className="flex gap-4">
        <h1 className="font-cinzel font-bold text-pink-600">
          <Link to="/">charme</Link>
        </h1>
        <button
          onClick={() => {
            navigate("/products");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <FontAwesomeIcon icon={faBagShopping} title="See all products" />
        </button>
      </div>
      {windowWidth >= 600 && (
        <section className="mr-auto" ref={categoryRef}>
          <p className="cursor-pointer">Categories</p>
          {show.categories ? (
            <article
              className={`absolute left-0 right-0 top-[40px] z-40 flex h-[fit-content] w-[100vw] justify-around bg-white p-8`}
            >
              {categories.map(({ _id, categoryName }) => (
                <div
                  className="flex cursor-pointer items-start gap-4"
                  onClick={() => categoryOnClickHandler(categoryName)}
                  key={_id}
                >
                  <h1 className="font-thin capitalize">{categoryName}</h1>
                  <img
                    className={`${
                      windowWidth <= 750 ? "hidden" : ""
                    } h-[100px] w-[100px] rounded-lg object-cover`}
                    src={getImgUrl(categoryName)}
                    alt=""
                  />
                </div>
              ))}
            </article>
          ) : null}
        </section>
      )}
      <ul className="flex items-center gap-4">
        <li className="flex items-center gap-2 rounded-md p-2">
          <button
            onClick={() =>
              setShow((prev) => ({ ...prev, searchInput: !prev.searchInput }))
            }
          >
            <FontAwesomeIcon icon={faSearch} title="Search products" />
          </button>
          {show.searchInput && (
            <input
              type="text"
              placeholder="Search products..."
              className="border-b-[1px] border-[#2C74B3]/20 outline-none"
              onChange={(e) => {
                productDispatch({ type: "SEARCH", payload: e.target.value });
                location?.pathname === "/" && navigate("/products");
              }}
              value={search}
            />
          )}
        </li>
        <li className="relative">
          <Link to="/cart">
            <FontAwesomeIcon icon={faCartShopping} title="Cart" />
          </Link>

          {cart?.length > 0 && (
            <p className="absolute -right-3 -top-3 grid h-5 w-5 place-items-center rounded-full bg-[#E3F2C1] text-xs font-bold text-pink-700">
              {cart.length > 9 ? `9+` : cart.length}
            </p>
          )}
        </li>
        <li className="relative">
          <Link to="/wishlist">
            <FontAwesomeIcon icon={faHeart} title="Wishlist" />
          </Link>
          {wishlist.length > 0 && (
            <p className="absolute -right-3 -top-3 grid h-5 w-5 place-items-center rounded-full bg-[#E3F2C1] text-xs font-bold text-pink-700">
              {wishlist.length > 9 ? `9+` : wishlist.length}
            </p>
          )}
        </li>
        {!isLoggedIn ? (
          <li>
            <Link to="/login">
              <FontAwesomeIcon icon={faUser} title="Login" />
            </Link>
          </li>
        ) : (
          <div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShow((prev) => ({
                  ...prev,
                  profileMenu: !prev.profileMenu,
                }));
              }}
              className="relative rounded-full bg-pink-600/90 p-1 px-2 uppercase text-white"
            >
              {user?.userDetails?.firstName.substr(0, 1)}
              {user?.userDetails?.lastName.substr(0, 1)}
            </button>
            <ul
              className={`${
                show.profileMenu ? "" : "hidden"
              } absolute right-6 bg-white p-1 shadow-md`}
            >
              <li
                onClick={() => {
                  navigate("/profile");
                  setShow((prev) => ({ ...prev, profileMenu: false }));
                }}
                className="cursor-pointer border-b-[1px] border-black p-1 pl-1"
              >
                Go to profile
              </li>
              <li className="cursor-pointer p-1 pl-1" onClick={logUserOut}>
                logout
              </li>
            </ul>
          </div>
        )}
      </ul>
    </header>
  );
}
