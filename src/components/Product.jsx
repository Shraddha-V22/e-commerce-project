import React from "react";
import { Link } from "react-router-dom";
import { getImgUrl } from "../common/utils";
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

  const inCart = cart.find((item) => item.id === id);
  const inWishlist = wishlist.find((item) => item.id === id);
  return (
    <motion.div
      // initial={{ opacity: 0 }}
      // whileInView={{ opacity: 1, transitionDelay: 0.3 }}
      onClick={() => navigate(`/products/product-${id}`)}
      className="relative grid h-[300px] w-[200px] cursor-pointer grid-cols-[auto_1fr] overflow-hidden rounded-lg bg-white"
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          wishlistDispatch({ type: "ADD_TO_WISHLIST", payload: item });
        }}
        className="absolute right-2 top-2 rounded-full px-1 text-xl text-pink-500 hover:bg-white/40"
      >
        {inWishlist ? (
          <FontAwesomeIcon icon={faHeartFilled} />
        ) : (
          <FontAwesomeIcon icon={faHeart} />
        )}
      </button>
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
            onClick={(e) => {
              e.stopPropagation();
              cartDispatch({ type: "ADD_TO_CART", payload: item });
            }}
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
