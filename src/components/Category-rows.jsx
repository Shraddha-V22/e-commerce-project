import React from "react";
import Product from "./Product";

export default function CategoryRows({ category }) {
  return (
    <section className="flex flex-col items-center gap-8 p-8">
      <h1>Category</h1>
      <article className="mt-4 flex justify-center gap-8">
        <Product />
        <Product />
        <Product />
        <Product />
      </article>
    </section>
  );
}
