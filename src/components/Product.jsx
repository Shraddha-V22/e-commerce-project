import React from "react";
import { getImgUrl, getItemFromLocalStorage } from "../common/utils";
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
  const token = getItemFromLocalStorage("token");

  const inCart = cart?.find((item) => item.id === id);
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
        wishlistDispatch({
          type: "INITIALISE_WISHLIST",
          payload: res.wishlist,
        });
      } catch (error) {
        console.error(error);
      }
    } else {
      wishlistDispatch({ type: "ADD_TO_WISHLIST", payload: item });
    }
  };

  const removeFromWishlist = async (e, id) => {
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
        wishlistDispatch({
          type: "INITIALISE_WISHLIST",
          payload: res.wishlist,
        });
      } catch (error) {
        console.error(error);
      }
    } else {
      wishlistDispatch({
        type: "REMOVE_FROM_WISHLIST",
        payload: id,
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      onClick={() => navigate(`/products/${id}`)}
      className="relative grid h-[300px] w-[200px] cursor-pointer grid-cols-[auto_1fr] overflow-hidden rounded-lg bg-white shadow-sm hover:shadow-xl max-[500px]:h-[225px] max-[500px]:w-[150px]"
    >
      {inWishlist ? (
        <button
          onClick={(e) => removeFromWishlist(e, id)}
          className="absolute right-2 top-2 rounded-full px-1 text-xl text-pink-600 hover:bg-white/40"
        >
          <FontAwesomeIcon icon={faHeartFilled} title="Remove from Wishlist" />
        </button>
      ) : (
        <button
          onClick={(e) => addToWishlist(e, item)}
          className="absolute right-2 top-2 rounded-full px-1 text-xl text-pink-600 hover:bg-white/40"
        >
          <FontAwesomeIcon icon={faHeart} title="Add to Wishlist" />
        </button>
      )}
      <img
        src={getImgUrl(category.toLowerCase())}
        alt={`${product_name}`}
        className="w-full"
      />
      <div className="absolute bottom-0 flex w-full flex-col items-start gap-0 bg-white px-4 py-2 max-[500px]:gap-0">
        <h3 className="line-clamp-1 font-bold uppercase max-[500px]:text-sm">
          {product_name}
        </h3>
        <p className="text-xs uppercase text-gray-500 max-[500px]:text-[10px]">
          {brand}
        </p>
        <p className="max-[500px]:text-sm">${price}</p>
        {!inCart ? (
          <button
            onClick={(e) => addToCart(e, item)}
            className="w-full rounded-md border-[1px] py-1 text-sm capitalize hover:bg-pink-600/80 hover:text-white max-[500px]:text-xs"
          >
            add to cart
          </button>
        ) : (
          <button
            className="w-full rounded-md border-[1px] py-1 text-sm capitalize hover:bg-[#bbc79f]/80 hover:text-white max-[500px]:text-xs"
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
