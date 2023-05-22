import React from "react";
import Product from "./Product";
import { useProducts } from "../contexts/ProductProvider";

export default function CategoryRows({ categoryIndex }) {
  const {
    products: { categories, productsData },
  } = useProducts();

  return (
    <section className="py-8">
      <section className="flex flex-col gap-8 border-b-[1px] border-[#CE7777]/20">
        <h2 className="uppercase">{categories[categoryIndex]?.categoryName}</h2>
        <article className="mt-4 flex justify-center gap-8">
          {productsData
            .filter(
              ({ category }) =>
                category.toLowerCase() === categories[0]?.categoryName
            )
            .slice(0, 4)
            .map((item) => (
              <Product key={item.id} item={item} />
            ))}
        </article>
      </section>
    </section>
  );
}
