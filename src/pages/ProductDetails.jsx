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
      console.log(product);
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
        console.log(res);
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

  return (
    <section className="mx-auto my-8 grid w-[70vw] grid-cols-[400px_1fr]">
      <img
        src={getImgUrl(category?.toLowerCase())}
        alt={`${product_name}`}
        className="w-[400px]"
      />
      <article className="flex flex-col gap-4 p-8">
        <h1 className="bg-[#2C74B3]/20 px-2 uppercase">{product_name}</h1>
        <p className="uppercase">{brand}</p>
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
