import React from "react";
import CategoryRows from "../components/Category-rows";
import FilterComp from "../components/FilterComp";
import heroImg from "../assets/hero-img.jpg";
import imgUrl from "../assets/style-ecom.png";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section className="mx-auto w-[80vw] text-center">
      {/* <FilterComp /> */}
      <div className="mb-12 h-[60vh] w-full overflow-hidden rounded-3xl">
        <img src={heroImg} alt="" className="h-full w-full object-cover" />
      </div>
      <div className="flex flex-col items-center gap-4 border-b-[1px] border-[#CE7777]/20 pb-8">
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sequi,
          dolorem.
        </p>
        <Link
          to="/products"
          className="rounded-md bg-pink-600/80 px-4 py-2 uppercase text-white"
        >
          Shop now →
        </Link>
      </div>
      <section className="mt-4">
        <CategoryRows categoryIndex={0} />
      </section>
      <div className="m-4 h-[50vh] w-full">
        <img src={imgUrl} alt="" className="h-full w-full object-cover" />
      </div>
      <section className="mt-4">
        <CategoryRows categoryIndex={1} />
        <CategoryRows categoryIndex={2} />
      </section>
    </section>
  );
}
