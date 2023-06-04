import React from "react";
import { useCart, useCartDispatch } from "../contexts/CartProvider";
import { getImgUrl } from "../common/utils";
import { useNavigate } from "react-router-dom";
import { useWishlist, useWishlistDispatch } from "../contexts/WishlistProvider";
import { toast } from "react-toastify";
import { useAuth } from "../contexts/AuthProvider";
import emptyCart from "../assets/empty-cart.webp";

export default function Cart() {
  const { cart } = useCart();
  const navigate = useNavigate();

  const totalPrice = (cart) =>
    cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  return cart?.length > 0 ? (
    <section className="mx-auto grid w-[90vw] grid-rows-[auto_auto] justify-center gap-8 py-4 md:w-full md:grid-cols-[auto_auto]">
      <section className="flex flex-col gap-4 md:w-[450px]">
        {cart.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </section>
      <section className="flex h-[fit-content] w-[300px] flex-col gap-4 rounded-lg bg-white p-4 shadow-sm max-[800px]:w-[90vw]">
        <h1 className="text-lg uppercase">Price Details</h1>
        <div className="flex justify-between">
          <p>Price</p>
          <p>₹{totalPrice(cart).toFixed(2)}</p>
        </div>
        {totalPrice(cart) > 100 && (
          <div className="flex justify-between">
            <p>Discount</p>
            <p>- ₹25.00</p>
          </div>
        )}
        <div className="flex justify-between capitalize">
          <p>Delivery charges</p>
          <p>free</p>
        </div>
        <div className="-mt-2 flex w-auto justify-between border-t-[1px] pt-2 md:w-full">
          <p>Total Price</p>
          <p className="font-semibold text-green-700">
            ₹
            {totalPrice(cart) > 100
              ? `${totalPrice(cart).toFixed(2) - 25}`
              : `${totalPrice(cart).toFixed(2)}`}
          </p>
        </div>
        <button
          className="rounded-md border-[1px] p-1 px-2 capitalize"
          onClick={() => navigate("/checkout")}
        >
          Buy now
        </button>
      </section>
    </section>
  ) : (
    <section className="mx-auto mb-8 flex w-[90%] flex-col items-center text-center text-sm md:h-full md:text-lg">
      <img src={emptyCart} alt="" className="w-[200px] md:w-[20vw]" />
      <p>
        Well, our cart seems to have taken a break. Time to fill it up with your
        amazing choices!
      </p>
    </section>
  );
}

function CartItem({ item }) {
  const cartDispatch = useCartDispatch();
  const wishlistDispatch = useWishlistDispatch();
  const navigate = useNavigate();
  const { wishlist } = useWishlist();
  const { user, isLoggedIn } = useAuth();

  const { id, product_name, brand, price, category, qty } = item;

  const inWishlist = wishlist.find((item) => item.id === id);

  const removeItemFromCart = async () => {
    if (isLoggedIn) {
      try {
        const request = await fetch(`/api/user/cart/${id}`, {
          method: "DELETE",
          headers: {
            authorization: user.token,
          },
        });
        const res = await request.json();
        cartDispatch({ type: "INITIALISE_CART", payload: res.cart });
      } catch (error) {
        console.error(error);
      }
    }
  };

  const updateQty = async (action) => {
    if (isLoggedIn) {
      try {
        const request = await fetch(`/api/user/cart/${id}`, {
          method: "POST",
          headers: {
            authorization: user.token,
          },
          body: JSON.stringify({ action }),
        });
        const res = await request.json();
        cartDispatch({ type: "INITIALISE_CART", payload: res.cart });
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
      } catch (error) {
        console.error(error);
      }
    }
  };

  const moveToWishlist = () => {
    removeItemFromCart();
    addToWishlist(item);
    toast.success("Moved to Wishlist!");
  };

  return (
    <section
      onClick={() => navigate(`/products/${id}`)}
      className="grid h-[200px] w-full cursor-pointer grid-cols-[150px_1fr] overflow-hidden rounded-lg shadow-sm md:w-[auto]"
    >
      <img
        src={getImgUrl(category.toLowerCase())}
        alt={`${product_name}`}
        className="h-full w-[150px] object-cover"
      />
      <div className="bottom-0 flex w-full flex-col items-start gap-0 bg-white px-4 py-2">
        <h3 className="line-clamp-1 font-bold uppercase">{product_name}</h3>
        <p className="text-xs uppercase">{brand}</p>
        <p>₹{price}</p>
        <div className="flex gap-4">
          <button
            className="border-[1px] px-2 text-xs"
            onClick={(e) => {
              e.stopPropagation();
              updateQty({ type: "increment" });
            }}
          >
            ▲
          </button>
          <p>{item.qty}</p>
          {item.qty > 1 ? (
            <button
              className="border-[1px] px-2 text-xs"
              onClick={(e) => {
                e.stopPropagation();
                updateQty({ type: "decrement" });
              }}
            >
              ▼
            </button>
          ) : (
            <button className="border-[1px] px-2 text-xs text-gray-500">
              ▼
            </button>
          )}
        </div>
        <button
          className="mt-2 rounded-md border-[1px] p-1 px-2 text-sm capitalize"
          onClick={(e) => {
            e.stopPropagation();
            removeItemFromCart();
          }}
        >
          Remove From cart
        </button>
        {!inWishlist ? (
          <button
            className="mt-2 rounded-md border-[1px] p-1 px-2 text-sm capitalize"
            onClick={(e) => {
              e.stopPropagation();
              moveToWishlist();
            }}
          >
            Move to wishlist
          </button>
        ) : (
          <button className="mt-2 rounded-md border-[1px] p-1 px-2 text-sm capitalize">
            Already in wishlist
          </button>
        )}
      </div>
    </section>
  );
}
