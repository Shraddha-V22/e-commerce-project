import React from "react";
import FilterComp from "../components/FilterComp";
import Product from "../components/Product";
import { useProducts } from "../contexts/ProductProvider";

export default function Products() {
  const {
    products: { productsData },
  } = useProducts();

  console.log(localStorage.getItem("user"));

  return (
    <section className="m-4 flex justify-evenly">
      <FilterComp />
      <section className="mx-8 flex w-[850px] flex-wrap gap-4">
        {productsData.map((item) => (
          <Product key={item.id} item={item} />
        ))}
      </section>
    </section>
  );
}
