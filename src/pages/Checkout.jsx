import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { useState } from "react";
import { useRef } from "react";
import { Link } from "react-router-dom";

export default function Checkout() {
  // const checkoutRef = useRef(0);
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
  };

  const paymentDetailsHandler = (e) => {
    const { name, value } = e.target;
    setPaymentDetails((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section className="m-4 mx-auto w-[500px] bg-white p-8">
      {elIndex === 0 && (
        <section className="flex flex-col gap-6">
          <h2 className="">Shipping Address</h2>
          <article className="flex flex-col gap-4">
            <DetailsInput
              placeholder="Address Line 1"
              name="line1"
              onClick={addressChangeHandler}
            />
            <DetailsInput
              placeholder="Address Line 2"
              name="line2"
              onClick={addressChangeHandler}
            />
            <DetailsInput
              placeholder="City"
              name="city"
              onClick={addressChangeHandler}
            />
            <DetailsInput
              placeholder="Zip Code/Postal Code"
              name="zipcode"
              onClick={addressChangeHandler}
            />
            <DetailsInput
              placeholder="Country"
              name="country"
              onClick={addressChangeHandler}
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
              onClick={paymentDetailsHandler}
            />
            <DetailsInput
              placeholder="Card Number"
              name="cardNumber"
              onClick={paymentDetailsHandler}
            />
            <DetailsInput
              placeholder="Expiry Date"
              name="expiryDate"
              onClick={paymentDetailsHandler}
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
          <div>
            <h2>Order Summary</h2>
          </div>
          <div>
            <h2>Shipping Address</h2>
            <p>{Object.values(addressInput).join(",")}</p>
          </div>
          <h2>Payment details</h2>
          <button
            onClick={() => {
              updateIndexNum();
              console.log(addressInput, paymentDetails);
            }}
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
