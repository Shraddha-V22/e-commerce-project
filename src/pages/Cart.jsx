import React from "react";
import { useCart, useCartDispatch } from "../contexts/CartProvider";
import Product from "../components/Product";
import { getImgUrl } from "../common/utils";

export default function Cart() {
  const { cart } = useCart();

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  {
    return cart.length > 0 ? (
      <section className="mx-auto mb-8 flex w-[fit-content] gap-8">
        <section className="flex w-[450px] flex-col gap-4">
          {cart.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </section>
        <section className="h-[fit-content] w-[300px] bg-white p-4">
          <h1>SubTotal</h1>
          <p>{totalPrice.toFixed(2)}</p>
        </section>
      </section>
    ) : (
      <section className="mx-auto grid h-[500px] w-[fit-content] place-items-center">
        <p>No items in the cart. Go Shop, you idiot!</p>
      </section>
    );
  }
}

function CartItem({ item }) {
  const cartDispatch = useCartDispatch();
  const { id, product_name, brand, price, category } = item;
  return (
    <section className="grid h-[200px] w-full grid-cols-[150px_1fr] overflow-hidden rounded-lg">
      <img
        src={getImgUrl(category)}
        alt={`${product_name}`}
        className="h-full w-[150px] object-cover"
      />
      <div className="bottom-0 flex w-full flex-col items-start gap-1 bg-white px-4 py-2">
        <h3 className="line-clamp-1 font-bold uppercase">{product_name}</h3>
        <p className="text-xs uppercase">{brand}</p>
        <p>${price}</p>
        <div className="mt-4 flex flex-col">
          <label htmlFor="qty" className="text-[10px]">
            Quantity
          </label>
          <input
            id="qty"
            type="number"
            min={0}
            max={5}
            className="border-b-[1px] border-black outline-none"
            value={item.quantity}
            onChange={(e) =>
              cartDispatch({
                type: "CHANGE_QTY",
                payload: { id, value: Number(e.target.value) },
              })
            }
          />
        </div>
      </div>
    </section>
  );
}
