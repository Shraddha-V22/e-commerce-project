import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { useState } from "react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { useCart, useCartDispatch } from "../contexts/CartProvider";
import {
  getImgUrl,
  getItemFromSessionStorage,
  setItemToSessionStorage,
} from "../common/utils";

export default function Checkout() {
  const { cart } = useCart();
  const cartDispatch = useCartDispatch();
  const [elIndex, setElIndex] = useState(0);
  const [addressInput, setAddressInput] = useState({
    line1: "",
    line2: "",
    city: "",
    zipcode: "",
    country: "",
  });
  const [paymentDetails, setPaymentDetails] = useState({
    nameOnCard: "",
    cardNumber: "",
    expiryDate: "",
  });
  const userFound = JSON.parse(getItemFromSessionStorage("user"));

  const updateIndexNum = () => {
    if (elIndex === 3) {
      setElIndex(0);
    } else {
      setElIndex((prev) => prev + 1);
    }
  };

  const addressChangeHandler = (e) => {
    const { name, value } = e.target;
    setAddressInput((prev) => ({ ...prev, [name]: value }));
    // console.log(addressInput);
  };

  const paymentDetailsHandler = (e) => {
    const { name, value } = e.target;
    setPaymentDetails((prev) => ({ ...prev, [name]: value }));
  };

  const totalPrice = (cart) =>
    cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  const totalQty = (cart) => cart.reduce((acc, item) => acc + item.qty, 0);

  const placeOrder = () => {
    updateIndexNum();
    setItemToSessionStorage("user", JSON.stringify({ ...userFound, cart: [] }));
    cartDispatch({ type: "INITIALISE_CART", payload: [] });
  };

  return (
    <section className="m-4 mx-auto max-w-[500px] bg-white p-8">
      {elIndex === 0 && (
        <section className="flex flex-col gap-6">
          <h2 className="">Shipping Address</h2>
          <article className="flex flex-col gap-4">
            <DetailsInput
              placeholder="Address Line 1"
              name="line1"
              onChange={addressChangeHandler}
            />
            <DetailsInput
              placeholder="Address Line 2"
              name="line2"
              onChange={addressChangeHandler}
            />
            <DetailsInput
              placeholder="City"
              name="city"
              onChange={addressChangeHandler}
            />
            <DetailsInput
              placeholder="Zip Code/Postal Code"
              name="zipcode"
              onChange={addressChangeHandler}
            />
            <DetailsInput
              placeholder="Country"
              name="country"
              onChange={addressChangeHandler}
            />
          </article>
          <button
            onClick={updateIndexNum}
            className="ml-auto border-[1px] border-black p-1 px-2"
          >
            Next
          </button>
        </section>
      )}
      {elIndex === 1 && (
        <section className="flex flex-col gap-6">
          <h2>Payment Details</h2>
          <article className="flex flex-col gap-4">
            <DetailsInput
              placeholder="Name on Card"
              name="nameOnCard"
              onChange={paymentDetailsHandler}
            />
            <DetailsInput
              placeholder="Card Number"
              name="cardNumber"
              onChange={paymentDetailsHandler}
            />
            <DetailsInput
              placeholder="Expiry Date"
              name="expiryDate"
              onChange={paymentDetailsHandler}
            />
            <input
              className="border-b-[1px] outline-none"
              type="text"
              placeholder="CVV"
            />
          </article>
          <button
            onClick={updateIndexNum}
            className="ml-auto border-[1px] border-black p-1 px-2"
          >
            Next
          </button>
        </section>
      )}
      {elIndex === 2 && (
        <section className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <h2>Order Summary</h2>
            <table className="w-full table-auto">
              <thead>
                <tr className="text-left capitalize">
                  <th className="border-[1px] p-1 pl-2">product details</th>
                  <th className="border-[1px] p-1 pl-2">qty</th>
                  <th className="border-[1px] p-1 pl-2">price</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <OrderedItem key={item.id} {...item} />
                ))}
                <tr className="font-bold">
                  <td className="border-[1px] p-1 pl-2">Subtotal</td>
                  <td className="border-[1px] p-1 pl-2">{totalQty(cart)}</td>
                  <td className="border-[1px] p-1 pl-2">${totalPrice(cart)}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="flex flex-col gap-2">
            <h2>Shipping Address</h2>
            <p className="text-sm">{Object.values(addressInput).join(",")}.</p>
          </div>
          <div className="flex flex-col gap-2">
            <h2>Payment details</h2>
            <div className="text-sm">
              <p className="capitalize">
                Name on Card: {paymentDetails.nameOnCard}
              </p>
              <p>Card Number: {paymentDetails.cardNumber}</p>
              <p>Expiry Date: {paymentDetails.expiryDate}</p>
            </div>
          </div>
          <button
            onClick={placeOrder}
            className="ml-auto border-[1px] border-black p-1 px-2"
          >
            Place Order
          </button>
        </section>
      )}
      {elIndex === 3 && (
        <section className="flex flex-col items-center gap-4">
          <FontAwesomeIcon icon={faCircleCheck} className="text-6xl" />
          <h1>Ordered Placed!</h1>
          <Link to="/" className="text-pink-600 underline">
            Shop more!
          </Link>
        </section>
      )}
    </section>
  );
}

function DetailsInput({ placeholder, name, onChange }) {
  return (
    <input
      className="border-b-[1px] outline-none"
      type="text"
      placeholder={placeholder}
      name={name}
      onChange={onChange}
      autoComplete="off"
    />
  );
}

function OrderedItem({ category, product_name, brand, price, qty }) {
  return (
    <tr className="">
      <td className="flex gap-2 border-[1px] p-1 pl-2">
        <img
          src={getImgUrl(category.toLowerCase())}
          alt=""
          className="h-[50px] w-[40px] object-cover"
        />
        <div>
          <h3 className="text-sm font-bold capitalize">{product_name}</h3>
          <small className="text-xs text-gray-500">{brand}</small>
        </div>
      </td>
      <td className="border-[1px] p-1 pl-2">{qty}</td>
      <td className="border-[1px] p-1 pl-2">{price}</td>
    </tr>
  );
}
