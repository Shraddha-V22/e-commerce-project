import React from "react";

export default function Footer() {
  return (
    <section className="h-[fit-content] w-full bg-white">
      <section className="flex flex-wrap justify-end gap-4 p-8">
        <div className="mr-auto flex max-w-[300px] flex-col items-center gap-2 p-2">
          <label htmlFor="newsletter" className="text-sm">
            Subscribe to our newsletter to follow the new fashion trends
          </label>
          <input
            type="text"
            id="newsletter"
            placeholder="Enter Your Email"
            className="w-full rounded-sm border-2 border-pink-600 indent-2 outline-none placeholder:text-sm"
          />
        </div>
        <article className="flex flex-wrap justify-end gap-4 p-2">
          <div className="flex w-[150px] flex-col gap-2">
            <h2 className="text-lg font-bold uppercase">About</h2>
            <ul className="cursor-pointer text-sm capitalize">
              <li className="hover:text-pink-600">contact us</li>
              <li className="hover:text-pink-600">about us</li>
              <li className="hover:text-pink-600">careers</li>
            </ul>
          </div>
          <div className="flex w-[150px] flex-col gap-2">
            <h2 className="text-lg font-bold uppercase">Help</h2>
            <ul className="cursor-pointer text-sm capitalize">
              <li className="hover:text-pink-600">payments</li>
              <li className="hover:text-pink-600">shipping</li>
              <li className="hover:text-pink-600">faq</li>
            </ul>
          </div>
          <div className="flex w-[150px] flex-col gap-2">
            <h2 className="text-lg font-bold uppercase">social</h2>
            <ul className="cursor-pointer text-sm capitalize">
              <li className="hover:text-pink-600">facebook</li>
              <li className="hover:text-pink-600">twitter</li>
              <li className="hover:text-pink-600">instagram</li>
            </ul>
          </div>
        </article>
      </section>
      <div className="">
        <p className="border-t-[1px] p-4 text-center">@2023</p>
      </div>
    </section>
  );
}
