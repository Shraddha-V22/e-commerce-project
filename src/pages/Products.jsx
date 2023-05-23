import React from "react";
import FilterComp from "../components/FilterComp";
import Product from "../components/Product";
import { useProducts } from "../contexts/ProductProvider";

export default function Products() {
  const {
    products: { productsData },
  } = useProducts();

  return (
    <section className="m-8 grid grid-rows-[auto_1fr] gap-8">
      <section className="w-full bg-[#E3F2C1]">
        <FilterComp />
      </section>
      <section className="mt-8 grid grid-cols-auto justify-items-center gap-4 max-[500px]:grid-cols-autoSmall">
        {productsData.map((item) => (
          <Product key={item.id} item={item} />
        ))}
      </section>
    </section>
  );
}
