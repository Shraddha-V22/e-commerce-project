import React from "react";

export default function Footer() {
  return (
    <section className="h-[fit-content] w-[100vw] bg-white">
      <section className="grid w-full grid-rows-2 justify-center justify-items-center gap-4 px-4 py-8">
        <div className="flex w-full flex-col items-center gap-2 border-b-[1px] p-2">
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
        <article className="flex w-full flex-wrap justify-between gap-4 ">
          <div className="flex flex-col gap-2">
            <h2 className="text-sm font-bold uppercase md:text-lg">About</h2>
            <ul className="cursor-pointer text-xs capitalize md:text-sm">
              <li className="hover:text-pink-600">contact us</li>
              <li className="hover:text-pink-600">about us</li>
              <li className="hover:text-pink-600">careers</li>
            </ul>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-sm font-bold uppercase md:text-lg">Help</h2>
            <ul className="cursor-pointer text-xs capitalize md:text-sm">
              <li className="hover:text-pink-600">payments</li>
              <li className="hover:text-pink-600">shipping</li>
              <li className="hover:text-pink-600">faq</li>
            </ul>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-sm font-bold uppercase md:text-lg">social</h2>
            <ul className="cursor-pointer text-xs capitalize md:text-sm">
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
