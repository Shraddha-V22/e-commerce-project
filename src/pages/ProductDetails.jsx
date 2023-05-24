import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getImgUrl,
  getItemFromSessionStorage,
  setItemToSessionStorage,
} from "../common/utils";
import { useCart, useCartDispatch } from "../contexts/CartProvider";
import { useWishlistDispatch } from "../contexts/WishlistProvider";
import { fetchRequest } from "../common/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

export default function ProductDetails() {
  const navigate = useNavigate();
  const { cart } = useCart();
  const cartDispatch = useCartDispatch();
  const wishlistDispatch = useWishlistDispatch();
  const { productId } = useParams();
  const token = getItemFromSessionStorage("token");
  const userFound = JSON.parse(getItemFromSessionStorage("user"));
  const [product, setProduct] = useState({});

  const getProduct = async () => {
    try {
      const { product } = await fetchRequest(`/api/products/${productId}`);
      setProduct(product);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  const {
    id,
    brand,
    product_name,
    description,
    color,
    price,
    season,
    size,
    category,
    rating,
    material,
  } = product;
  const inCart = cart.find((item) => item.id === id);

  const addToCart = async (item) => {
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
        setItemToSessionStorage(
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

  const addToWishlist = async (item) => {
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
        setItemToSessionStorage(
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
    } else {
      wishlistDispatch({ type: "ADD_TO_WISHLIST", payload: item });
    }
  };

  const getRatingStars = (rating) => {
    return new Array(rating)
      .fill(0)
      .map(() => <FontAwesomeIcon icon={faStar} />);
  };

  return (
    <section className="mx-auto my-8 flex w-[fit-content] flex-wrap items-center justify-center gap-8">
      <img
        src={getImgUrl(category?.toLowerCase())}
        alt={`${product_name}`}
        className="w-[80vw] md:w-[400px]"
      />
      <article className="flex w-[80vw] flex-col gap-4 px-4 py-8 md:w-[400px]">
        <h1 className="bg-[#2C74B3]/20 px-2 uppercase">{product_name}</h1>
        <div className="flex justify-between">
          <p className="uppercase">{brand}</p>
          <div className="text-pink-600">{getRatingStars(rating)}</div>
        </div>
        <p>${price}</p>
        {!inCart ? (
          <button
            onClick={() => addToCart(product)}
            className="rounded-md border-[1px] px-4 py-1 capitalize"
          >
            add to cart
          </button>
        ) : (
          <button
            className="rounded-md border-[1px] px-4 py-1 capitalize"
            onClick={() => navigate("/cart")}
          >
            Go to cart
          </button>
        )}
        <button
          onClick={() => addToWishlist(product)}
          className="rounded-md border-[1px] border-[#2C74B3]/20 p-2 capitalize outline-none"
        >
          Add to wishlist
        </button>
        <div className="text-xs leading-4 text-gray-500">
          <p>{description}</p>
          <ul className="ml-4 mt-2 list-disc capitalize">
            <li>color: {color}</li>
            <li>material: {material}</li>
            <li>season: {season}</li>
            <li>size: {size}</li>
          </ul>
        </div>
      </article>
    </section>
  );
}
