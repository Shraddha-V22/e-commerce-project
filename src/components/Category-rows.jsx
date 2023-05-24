import React from "react";
import Product from "./Product";
import { useProducts, useProductsDispatch } from "../contexts/ProductProvider";
import { useNavigate } from "react-router-dom";

export default function CategoryRows({ categoryIndex }) {
  const navigate = useNavigate();
  const productDispatch = useProductsDispatch();
  const {
    products: { categories, productsData },
  } = useProducts();

  const categoryOnClickHandler = (categoryName) => {
    navigate("/products");
    productDispatch({
      type: "CATEGORY_FILTER",
      payload: {
        name:
          categoryName[0].toUpperCase() +
          categoryName.substr(1, categoryName.length),
        checked: true,
      },
    });
  };

  return (
    <section className="py-8">
      <section className="mb-4 flex flex-col gap-6">
        <div
          onClick={() =>
            categoryOnClickHandler(categories[categoryIndex]?.categoryName)
          }
          className="mx-auto flex w-[fit-content] items-center gap-4 text-pink-600/90 hover:cursor-pointer hover:text-black"
        >
          <h2 className="font-cinzel text-2xl uppercase">
            {categories[categoryIndex]?.categoryName}
          </h2>
          <i className="text-xl">→</i>
        </div>
        <article className="flex flex-wrap justify-center gap-8">
          {productsData
            .filter(
              ({ category }) =>
                category.toLowerCase() ===
                categories[categoryIndex]?.categoryName
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
