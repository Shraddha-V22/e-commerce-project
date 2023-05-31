import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { useCart, useCartDispatch } from "../contexts/CartProvider";
import {
  clearItemsFromCart,
  getImgUrl,
  getItemFromLocalStorage,
  isEmptyObject,
} from "../common/utils";
import { DetailsInput } from "../components/DetailsInput";
import { useReducer } from "react";
import { checkoutReducer } from "../reducers/checkoutReducer";
import { useState } from "react";
import { useAuth } from "../contexts/AuthProvider";
import { toast } from "react-toastify";
import { useOrders } from "../contexts/OrderProvider";
import OrderedItem from "../components/OrderedItems";

const initialCheckout = {
  addressInput: {
    line1: "",
    line2: "",
    city: "",
    zipcode: "",
    country: "",
  },
  elIndex: 0,
  shippingAdd: "",
};

export default function Checkout() {
  const { user, isLoggedIn } = useAuth();
  const { cart } = useCart();
  const { setOrders } = useOrders();
  const cartDispatch = useCartDispatch();
  const [checkoutInputs, dispatch] = useReducer(
    checkoutReducer,
    initialCheckout
  );

  const addressChangeHandler = (e) => {
    const { name, value } = e.target;
    dispatch({ type: "ADDRESS_CHANGE", payload: { name, value } });
  };

  const totalPrice = (cart) =>
    cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  const totalQty = (cart) => cart.reduce((acc, item) => acc + item.qty, 0);

  const clearAllCartItems = () => {
    if (cart?.length > 0) {
      for (let item of cart) {
        const data = clearItemsFromCart(item?.id, user?.token, isLoggedIn);
        cartDispatch({ type: "INITIALISE_CART", payload: data.cart });
      }
    }
  };

  const placeOrder = () => {
    console.log(totalPrice(cart), cart);
    if (totalPrice === 0) {
      toast.error("Please add products to the cart!");
    } else {
      displayRazorpay();
    }
  };

  const loadScript = async (url) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = url;

      script.onload = () => {
        resolve(true);
      };

      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };

  const displayRazorpay = async () => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      toast.error("Razorpay SDK failed to load, check you internet connection");
      return;
    }

    const options = {
      key: import.meta.env.VITE_RAZORPAY_API_KEY,
      amount: totalPrice(cart).toFixed(2) * 100,
      currency: "INR",
      name: "CHARME",
      description: "Thank you for shopping with us",
      // image: "",
      handler: function (response) {
        const orderData = {
          orderedItems: [...cart],
          amount: totalPrice(cart).toFixed(2),
          address: Object.values(checkoutInputs.addressInput).join(","),
          paymentId: response.razorpay_payment_id,
        };
        setOrders((prev) => [orderData, ...prev]);
        dispatch({ type: "UPDATE_INDEX" });
        clearAllCartItems();
      },
      prefill: {
        name: `${user?.userDetails?.firstName} ${user?.userDetails?.lastName}`,
        email: user?.userDetails?.email,
        contact: "9876543210",
      },
      theme: {
        color: "#CC0066",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <section className="m-4 mx-auto w-[90vw] bg-white p-4 sm:max-w-[500px] sm:p-8">
      {checkoutInputs.elIndex === 0 && (
        <section className="flex flex-col gap-6">
          <h2 className="">Shipping Address</h2>
          {user?.userDetails?.addresses?.length > 0 && (
            <div className="flex flex-col gap-2">
              <p className="pl-2 text-sm text-gray-400">
                Choose from Saved Addresses
              </p>
              {user?.userDetails?.addresses?.map((el) => {
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
            onClick={() => {
              if (!isEmptyObject(checkoutInputs.addressInput)) {
                dispatch({ type: "UPDATE_INDEX" });
              } else {
                toast.error("All fields are required!");
              }
            }}
            className="ml-auto border-[1px] border-black p-1 px-2"
          >
            Next
          </button>
        </section>
      )}
      {checkoutInputs.elIndex === 1 && (
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
                {cart?.map((item) => (
                  <OrderedItem key={item.id} {...item} />
                ))}
                <tr className="font-bold">
                  <td className="border-[1px] p-1 pl-2">Subtotal</td>
                  <td className="border-[1px] p-1 pl-2">{totalQty(cart)}</td>
                  <td className="border-[1px] p-1 pl-2">
                    ₹{totalPrice(cart).toFixed(2)}
                  </td>
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
          <button
            onClick={placeOrder}
            className="ml-auto border-[1px] border-black p-1 px-2"
          >
            Place Order
          </button>
        </section>
      )}
      {checkoutInputs.elIndex === 2 && (
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
