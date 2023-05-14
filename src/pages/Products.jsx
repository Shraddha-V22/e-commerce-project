import React from "react";
import FilterComp from "../components/FilterComp";
import Product from "../components/Product";

export default function Products() {
  return (
    <section className="m-4 grid grid-cols-[auto_1fr]">
      <FilterComp />
      <section>
        <Product />
      </section>
    </section>
  );
}
