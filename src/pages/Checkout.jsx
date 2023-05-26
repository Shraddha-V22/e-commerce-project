import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { useCart, useCartDispatch } from "../contexts/CartProvider";
import { getImgUrl, getItemFromLocalStorage } from "../common/utils";
import { DetailsInput } from "../components/DetailsInput";
import { useReducer } from "react";
import { checkoutReducer } from "../reducers/checkoutReducer";
import { useState } from "react";
import { useAuth } from "../contexts/AuthProvider";

const initialCheckout = {
  addressInput: {
    line1: "",
    line2: "",
    city: "",
    zipcode: "",
    country: "",
  },
  paymentDetails: {
    nameOnCard: "",
    cardNumber: "",
    expiryDate: "",
  },
  elIndex: 0,
  shippingAdd: "",
};

export default function Checkout() {
  const { user } = useAuth();
  const { cart } = useCart();
  const cartDispatch = useCartDispatch();
  const [checkoutInputs, dispatch] = useReducer(
    checkoutReducer,
    initialCheckout
  );

  const addressChangeHandler = (e) => {
    const { name, value } = e.target;
    dispatch({ type: "ADDRESS_CHANGE", payload: { name, value } });
  };

  const paymentDetailsHandler = (e) => {
    const { name, value } = e.target;
    dispatch({ type: "PAYMENT_DETAILS_CHANGE", payload: { name, value } });
  };

  const totalPrice = (cart) =>
    cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  const totalQty = (cart) => cart.reduce((acc, item) => acc + item.qty, 0);

  const placeOrder = () => {
    dispatch({ type: "UPDATE_INDEX" });
    cartDispatch({ type: "INITIALISE_CART", payload: [] });
  };

  return (
    <section className="m-4 mx-auto max-w-[500px] bg-white p-8">
      {checkoutInputs.elIndex === 0 && (
        <section className="flex flex-col gap-6">
          <h2 className="">Shipping Address</h2>
          {user.addresses.length > 0 && (
            <div className="flex flex-col gap-2">
              <p className="pl-2 text-sm text-gray-400">
                Choose from Saved Addresses
              </p>
              {user.addresses.map((el) => {
                const add = Object.values(el.add).join(",");
                return (
                  <div
                    key={el.id}
                    className={`${
                      checkoutInputs.shippingAdd === add
                        ? "border-pink-600"
                        : ""
                    } flex items-center gap-4 rounded-md border-[1px] p-2`}
                  >
                    <input
                      type="radio"
                      className="hidden"
                      name="shippingAdd"
                      id={el.id}
                      value={checkoutInputs.shippingAdd}
                      onChange={() =>
                        dispatch({
                          type: "SELECT_ADDRESS",
                          payload: { add, addInput: el.add },
                        })
                      }
                      checked={checkoutInputs.shippingAdd === add}
                    />
                    <label htmlFor={el.id}>
                      {Object.values(el.add).join(",")}.
                    </label>
                  </div>
                );
              })}
              <p className="pl-2 pt-4 text-sm text-gray-400">
                Or Add a new address
              </p>
            </div>
          )}
          <article className="flex flex-col gap-4">
            <DetailsInput
              placeholder="Address Line 1"
              name="line1"
              onChange={addressChangeHandler}
              value={checkoutInputs.addressInput.line1}
            />
            <DetailsInput
              placeholder="Address Line 2"
              name="line2"
              onChange={addressChangeHandler}
              value={checkoutInputs.addressInput.line2}
            />
            <DetailsInput
              placeholder="City"
              name="city"
              onChange={addressChangeHandler}
              value={checkoutInputs.addressInput.city}
            />
            <DetailsInput
              placeholder="Zip Code/Postal Code"
              name="zipcode"
              onChange={addressChangeHandler}
              value={checkoutInputs.addressInput.zipcode}
            />
            <DetailsInput
              placeholder="Country"
              name="country"
              onChange={addressChangeHandler}
              value={checkoutInputs.addressInput.country}
            />
          </article>
          <button
            onClick={() => dispatch({ type: "UPDATE_INDEX" })}
            className="ml-auto border-[1px] border-black p-1 px-2"
          >
            Next
          </button>
        </section>
      )}
      {checkoutInputs.elIndex === 1 && (
        <section className="flex flex-col gap-6">
          <h2>Payment Details</h2>
          <article className="flex flex-col gap-4">
            <DetailsInput
              placeholder="Name on Card"
              name="nameOnCard"
              onChange={paymentDetailsHandler}
              value={checkoutInputs.paymentDetails.nameOnCard}
            />
            <DetailsInput
              placeholder="Card Number"
              name="cardNumber"
              onChange={paymentDetailsHandler}
              value={checkoutInputs.paymentDetails.cardNumber}
            />
            <DetailsInput
              placeholder="Expiry Date"
              name="expiryDate"
              onChange={paymentDetailsHandler}
              value={checkoutInputs.paymentDetails.expiryDate}
            />
            <input
              className="border-b-[1px] outline-none"
              type="text"
              placeholder="CVV"
            />
          </article>
          <button
            onClick={() => dispatch({ type: "UPDATE_INDEX" })}
            className="ml-auto border-[1px] border-black p-1 px-2"
          >
            Next
          </button>
        </section>
      )}
      {checkoutInputs.elIndex === 2 && (
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
            <p className="text-sm">
              {Object.values(checkoutInputs.addressInput).join(",")}.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <h2>Payment details</h2>
            <div className="text-sm">
              <p className="capitalize">
                Name on Card: {checkoutInputs.paymentDetails.nameOnCard}
              </p>
              <p>Card Number: {checkoutInputs.paymentDetails.cardNumber}</p>
              <p>Expiry Date: {checkoutInputs.paymentDetails.expiryDate}</p>
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
      {checkoutInputs.elIndex === 3 && (
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
