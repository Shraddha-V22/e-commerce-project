import React from "react";
import CategoryRows from "../components/Category-rows";
import FilterComp from "../components/FilterComp";
import heroImg from "../assets/hero-img.jpg";
import imgUrl from "../assets/style-ecom.png";
import { Link } from "react-router-dom";
import LoadingCard from "../components/LoadingCard";

export default function Home() {
  return (
    <section className="mx-auto text-center">
      <div className="mx-auto mb-12 h-[60vh] w-[80vw] overflow-hidden rounded-3xl">
        <img src={heroImg} alt="" className="h-full w-full object-cover" />
      </div>
      <div className="flex flex-col items-center gap-4 border-b-[1px] border-[#CE7777]/20 pb-8">
        <p>
          "Where fashion becomes an expression of your unique self. Get ready to
          redefine your style."
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
      <div className="h-[50vh] w-full">
        <img src={imgUrl} alt="" className="h-full w-full object-cover" />
      </div>
      <section className="mt-4">
        <CategoryRows categoryIndex={1} />
        <CategoryRows categoryIndex={2} />
      </section>
    </section>
  );
}
