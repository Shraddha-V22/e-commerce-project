import React from "react";
import { fetchRequest } from "../common/api";
import { useEffect } from "react";
import { useState } from "react";
import { useProducts } from "../contexts/ProductProvider";
import { getUniqueElementArray } from "../common/utils";
import { useMemo } from "react";

export default function FilterComp() {
  const [categories, setCategories] = useState([]);
  const { products } = useProducts();

  const brands = useMemo(
    () => getUniqueElementArray(products, "brand"),
    [products]
  );

  const getCategoryData = async () => {
    try {
      const { categories } = await fetchRequest("/api/categories");
      setCategories(categories);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCategoryData();
  }, []);

  console.log(categories);

  return (
    <section className="flex h-[fit-content] w-[200px] flex-col rounded-md bg-white px-6 py-4 shadow-md">
      <div className="mb-4 flex justify-between">
        <h1>Filters</h1>
        <button className="capitalize">clear</button>
      </div>
      <div className="border-b-[1px] border-black py-2">
        <h3 className="mb-2 text-sm uppercase">Category</h3>
        {categories.map(({ id, categoryName }) => (
          <div key={id} className="flex items-center gap-2">
            <input type="checkbox" name="" id="id" />
            <label htmlFor="id" className="capitalize">
              {categoryName}
            </label>
          </div>
        ))}
      </div>
      <div className="border-b-[1px] border-black py-2">
        <h3 className="mb-2 text-sm uppercase">Price</h3>
        <input
          type="range"
          min={200}
          max={2000}
          list="price"
          className="range-input"
        />
      </div>
      <div className="border-b-[1px] border-black py-2">
        <h3 className="mb-2 text-sm uppercase">Rating</h3>
        <div className="flex items-center gap-2">
          <input type="radio" name="rating" />
          <label htmlFor="">5 & below</label>
        </div>
        <div className="flex items-center gap-2">
          <input type="radio" name="rating" />
          <label htmlFor="">4 & below</label>
        </div>
        <div className="flex items-center gap-2">
          <input type="radio" name="rating" />
          <label htmlFor="">3 & below</label>
        </div>
      </div>
      <div className="border-b-[1px] border-black py-2">
        <h3 className="mb-2 text-sm uppercase">Brands</h3>
        {brands.map((el) => (
          <div key={el} className="flex items-center gap-2">
            <input type="checkbox" name="" id="id" />
            <label htmlFor="id" className="capitalize">
              {el}
            </label>
          </div>
        ))}
      </div>
      <div className="py-2">
        <h3 className="mb-2 text-sm uppercase">Sort by</h3>
        <div className="flex items-center gap-2">
          <input type="radio" name="sort" />
          <label htmlFor="">high to low</label>
        </div>
        <div className="flex items-center gap-2">
          <input type="radio" name="sort" />
          <label htmlFor="">low to high</label>
        </div>
      </div>
    </section>
  );
}
