import React from "react";
import CategoryRows from "../components/Category-rows";
import heroImg from "../assets/hero-img.jpg";
import imgUrl from "../assets/style-ecom.png";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <section className="mx-auto text-center">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="mx-auto mb-12 h-[60vh] w-[80vw] overflow-hidden rounded-3xl"
      >
        <img src={heroImg} alt="" className="h-full w-full object-cover" />
      </motion.div>
      <div className="mx-auto flex w-[95vw] flex-col items-center gap-4 border-b-[1px] border-[#CE7777]/20 pb-8 sm:w-[450px]">
        <p>
          Where fashion becomes an expression of your unique self. Get ready to
          redefine your style.
        </p>
        <Link
          to="/products"
          className="rounded-md bg-pink-600/90 px-4 py-2 uppercase text-white"
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
