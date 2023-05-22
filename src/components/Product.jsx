import React from "react";
import { Link } from "react-router-dom";
import {
  getImgUrl,
  getItemFromLocalStorage,
  setItemToLocalStorage,
} from "../common/utils";
import { useCart, useCartDispatch } from "../contexts/CartProvider";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartFilled } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useWishlist, useWishlistDispatch } from "../contexts/WishlistProvider";

export default function Product({ item }) {
  const navigate = useNavigate();
  const cartDispatch = useCartDispatch();
  const wishlistDispatch = useWishlistDispatch();
  const { wishlist } = useWishlist();
  const { cart } = useCart();
  const { id, product_name, brand, price, category } = item;
  const userFound = JSON.parse(getItemFromLocalStorage("user"));
  const token = getItemFromLocalStorage("token");

  const inCart = cart.find((item) => item.id === id);
  const inWishlist = wishlist.find((item) => item.id === id);

  const addToCart = async (e, item) => {
    e.stopPropagation();
    if (token) {
      try {
        const request = await fetch("/api/user/cart", {
          method: "POST",
          headers: {
            authorization: token,
          },
          body: JSON.stringify({ product: item }),
        });

        const res = await request.json();
        setItemToLocalStorage(
          "user",
          JSON.stringify({ ...userFound, cart: res.cart })
        );
        cartDispatch({ type: "INITIALISE_CART", payload: res.cart });
      } catch (error) {
        console.error(error);
      }
    } else {
      cartDispatch({ type: "ADD_TO_CART", payload: item });
    }
  };

  const addToWishlist = async (e, item) => {
    e.stopPropagation();
    if (token) {
      try {
        const request = await fetch("/api/user/wishlist", {
          method: "POST",
          headers: {
            authorization: token,
          },
          body: JSON.stringify({ product: item }),
        });

        const res = await request.json();
        console.log(res);
        setItemToLocalStorage(
          "user",
          JSON.stringify({ ...userFound, wishlist: res.wishlist })
        );
        wishlistDispatch({
          type: "INITIALISE_WISHLIST",
          payload: res.wishlist,
        });
      } catch (error) {
        console.error(error);
      }
    }
  };
  const removeFromWishlist = async (e) => {
    e.stopPropagation();
    if (token) {
      try {
        const request = await fetch(`/api/user/wishlist/${id}`, {
          method: "DELETE",
          headers: {
            authorization: token,
          },
        });

        const res = await request.json();
        console.log(res);
        setItemToLocalStorage(
          "user",
          JSON.stringify({ ...userFound, wishlist: res.wishlist })
        );
        wishlistDispatch({
          type: "INITIALISE_WISHLIST",
          payload: res.wishlist,
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <motion.div
      onClick={() => navigate(`/products/product-${id}`)}
      className="relative grid h-[300px] w-[200px] cursor-pointer grid-cols-[auto_1fr] overflow-hidden rounded-lg bg-white"
    >
      {inWishlist ? (
        <button
          onClick={removeFromWishlist}
          className="absolute right-2 top-2 rounded-full px-1 text-xl text-pink-500 hover:bg-white/40"
        >
          <FontAwesomeIcon icon={faHeartFilled} />
        </button>
      ) : (
        <button
          onClick={(e) => addToWishlist(e, item)}
          className="absolute right-2 top-2 rounded-full px-1 text-xl text-pink-500 hover:bg-white/40"
        >
          <FontAwesomeIcon icon={faHeart} />
        </button>
      )}
      <img
        src={getImgUrl(category.toLowerCase())}
        alt={`${product_name}`}
        className="w-full"
      />
      <div className="absolute bottom-0 flex w-full flex-col items-start gap-1 bg-white px-4 py-2">
        <h3 className="line-clamp-1 font-bold uppercase">{product_name}</h3>
        <p className="text-xs uppercase">{brand}</p>
        <p>${price}</p>
        {!inCart ? (
          <button
            onClick={(e) => addToCart(e, item)}
            className="rounded-md border-[1px] px-4 py-1 capitalize"
          >
            add to cart
          </button>
        ) : (
          <button
            className="rounded-md border-[1px] px-4 py-1 capitalize"
            onClick={(e) => {
              e.stopPropagation();
              navigate("/cart");
            }}
          >
            Go to cart
          </button>
        )}
      </div>
    </motion.div>
  );
}

// id: 61,
// product_name: "blandit nam",
// brand: "Adidas",
// category: "Clothing",
// color: "Pink",
// size: "XL",
// price: 164.52,
// material: "Cotton",
// season: "Spring",
// image_url: "http://dummyimage.com/100x150.png/5fa2dd/ffffff",
// description:
