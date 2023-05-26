import React from "react";
import { useCart, useCartDispatch } from "../contexts/CartProvider";
import { getImgUrl, getItemFromLocalStorage } from "../common/utils";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const { cart } = useCart();
  const token = getItemFromLocalStorage("token");
  const navigate = useNavigate();

  const totalPrice = (cart) =>
    cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  return cart?.length > 0 ? (
    <section className="m-8 mx-auto flex w-[fit-content] flex-wrap justify-center gap-8">
      <section className="flex w-[450px] flex-col gap-4">
        {cart.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </section>
      <section className="flex h-[fit-content] w-[300px] flex-col gap-4 bg-white p-4">
        <h1>SubTotal</h1>
        <p>${totalPrice(cart).toFixed(2)}</p>
        <button
          className="border-[1px] p-1 px-2"
          onClick={() => navigate("/checkout")}
        >
          Buy now
        </button>
      </section>
    </section>
  ) : (
    <section className="mx-auto grid h-full w-[fit-content] max-w-[500px] place-items-center text-center">
      <p>
        Well, our cart seems to have taken a break. Time to fill it up with your
        amazing choices!
      </p>
    </section>
  );
}

function CartItem({ item }) {
  const cartDispatch = useCartDispatch();
  const { id, product_name, brand, price, category } = item;
  const token = getItemFromLocalStorage("token");

  const removeItemFromCart = async () => {
    if (token) {
      try {
        const request = await fetch(`/api/user/cart/${id}`, {
          method: "DELETE",
          headers: {
            authorization: token,
          },
        });
        const res = await request.json();
        console.log(res);
        cartDispatch({ type: "INITIALISE_CART", payload: res.cart });
      } catch (error) {
        console.error(error);
      }
    } else {
      cartDispatch({ type: "REMOVE_FROM_CART", payload: id });
    }
  };

  const updateQty = async (action) => {
    if (token) {
      try {
        const request = await fetch(`/api/user/cart/${id}`, {
          method: "POST",
          headers: {
            authorization: token,
          },
          body: JSON.stringify({ action }),
        });
        const res = await request.json();
        cartDispatch({ type: "INITIALISE_CART", payload: res.cart });
      } catch (error) {
        console.error(error);
      }
    } else {
      cartDispatch({ type: "CHANGE_QTY", payload: { id, action } });
    }
  };

  return (
    <section className="grid h-[200px] w-full grid-cols-[150px_1fr] overflow-hidden rounded-lg">
      <img
        src={getImgUrl(category.toLowerCase())}
        alt={`${product_name}`}
        className="h-full w-[150px] object-cover"
      />
      <div className="bottom-0 flex w-full flex-col items-start gap-1 bg-white px-4 py-2">
        <h3 className="line-clamp-1 font-bold uppercase">{product_name}</h3>
        <p className="text-xs uppercase">{brand}</p>
        <p>${price}</p>
        <div className="flex gap-4">
          <button
            className="border-[1px] px-2 text-xs"
            onClick={() => updateQty({ type: "increment" })}
          >
            ▲
          </button>
          <p>{item.qty}</p>
          <button
            className="border-[1px] px-2 text-xs"
            onClick={() => updateQty({ type: "decrement" })}
          >
            ▼
          </button>
        </div>
        <button
          className="mt-2 rounded-md border-[1px] p-1 px-2"
          onClick={removeItemFromCart}
        >
          Remove From cart
        </button>
      </div>
    </section>
  );
}
