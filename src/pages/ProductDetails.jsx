import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getImgUrl, getItemFromLocalStorage } from "../common/utils";
import { useCart, useCartDispatch } from "../contexts/CartProvider";
import { useWishlist, useWishlistDispatch } from "../contexts/WishlistProvider";
import { fetchRequest } from "../common/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { useAuth } from "../contexts/AuthProvider";

export default function ProductDetails() {
  const navigate = useNavigate();
  const { cart } = useCart();
  const { wishlist } = useWishlist();
  const { user, isLoggedIn } = useAuth();
  const cartDispatch = useCartDispatch();
  const wishlistDispatch = useWishlistDispatch();
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const getProduct = async () => {
    try {
      const { product } = await fetchRequest(`/api/products/${productId}`);
      setIsLoading(false);
      setProduct(product);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
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
  const inWishlist = wishlist.find((item) => item.id === id);

  const addToCart = async (item) => {
    if (isLoggedIn) {
      try {
        const request = await fetch("/api/user/cart", {
          method: "POST",
          headers: {
            authorization: user.token,
          },
          body: JSON.stringify({ product: item }),
        });

        const res = await request.json();
        cartDispatch({ type: "INITIALISE_CART", payload: res.cart });
        toast.success("Item Added to Cart!");
      } catch (error) {
        console.error(error);
      }
    }
  };

  const addToWishlist = async (item) => {
    if (isLoggedIn) {
      try {
        const request = await fetch("/api/user/wishlist", {
          method: "POST",
          headers: {
            authorization: user.token,
          },
          body: JSON.stringify({ product: item }),
        });

        const res = await request.json();
        wishlistDispatch({
          type: "INITIALISE_WISHLIST",
          payload: res.wishlist,
        });
        toast.success("Item Added to Wishlist!");
      } catch (error) {
        console.error(error);
      }
    }
  };

  const removeFromWishlist = async (id) => {
    if (isLoggedIn) {
      try {
        const request = await fetch(`/api/user/wishlist/${id}`, {
          method: "DELETE",
          headers: {
            authorization: user.token,
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
      toast.success("Item removed from Wishlist!");
    }
  };

  const getRatingStars = (rating) => {
    return new Array(rating)
      .fill(0)
      .map(() => <FontAwesomeIcon icon={faStar} />);
  };

  return !isLoading ? (
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
        <p>₹{price}</p>
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
        {!inWishlist ? (
          <button
            onClick={() => addToWishlist(product)}
            className="rounded-md border-[1px] border-[#2C74B3]/20 p-2 capitalize outline-none"
          >
            Add to wishlist
          </button>
        ) : (
          <button
            onClick={() => removeFromWishlist(id)}
            className="rounded-md border-[1px] border-[#2C74B3]/20 p-2 capitalize outline-none"
          >
            Remove from wishlist
          </button>
        )}
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
  ) : (
    <section className="mx-auto my-8 flex w-[fit-content] flex-wrap items-start justify-center gap-8">
      <div className="h-[500px] w-[80vw] bg-[#E3F2C1]/40 md:w-[400px]"></div>
      <div className="flex w-[80vw] flex-col gap-4 px-4 py-8 md:w-[400px]">
        <div className="h-4 w-full rounded-lg bg-[#E3F2C1]/80"></div>
        <div className="h-4 w-[80%] rounded-lg bg-[#E3F2C1]/80"></div>
      </div>
    </section>
  );
}
