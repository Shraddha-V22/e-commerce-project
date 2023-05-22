import React from "react";

export default function Checkout() {
  return (
    <section className="m-4 mx-auto w-[500px] bg-white p-8">
      <section className="flex flex-col gap-6">
        <h2 className="">Shipping Address</h2>
        <article className="flex flex-col gap-4">
          <input
            className="border-b-[1px] outline-none"
            type="text"
            placeholder="Address Line 1"
          />
          <input
            className="border-b-[1px] outline-none"
            type="text"
            placeholder="Address Line 2"
          />
          <input
            className="border-b-[1px] outline-none"
            type="text"
            placeholder="City"
          />
          <input
            className="border-b-[1px] outline-none"
            type="text"
            placeholder="Zip Code/Postal Code"
          />
          <input
            className="border-b-[1px] outline-none"
            type="text"
            placeholder="Country"
          />
        </article>
        <button className="ml-auto border-[1px] border-black p-1 px-2">
          Next
        </button>
      </section>
      <section className="flex flex-col gap-6">
        <h2>Payment Details</h2>
        <article className="flex flex-col gap-4">
          <input
            className="border-b-[1px] outline-none"
            type="text"
            placeholder="Name on Card"
          />
          <input
            className="border-b-[1px] outline-none"
            type="text"
            placeholder="Card Number"
          />
          <input
            className="border-b-[1px] outline-none"
            type="text"
            placeholder="Expiry Date"
          />
          <input
            className="border-b-[1px] outline-none"
            type="text"
            placeholder="CVV"
          />
        </article>
        <button className="ml-auto border-[1px] border-black p-1 px-2">
          Next
        </button>
      </section>
      <section className="flex flex-col gap-6">
        <h2>Order Summary</h2>
        <h2>Shipping Address</h2>
        <h2>Payment details</h2>
        <button className="ml-auto border-[1px] border-black p-1 px-2">
          Place Order
        </button>
      </section>
    </section>
  );
}
