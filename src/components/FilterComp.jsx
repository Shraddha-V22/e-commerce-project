import React from "react";
import { fetchRequest } from "../common/api";
import { useEffect } from "react";
import { useState } from "react";
import { useProducts } from "../contexts/ProductProvider";
import { getUniqueElementArray } from "../common/utils";
import { useMemo } from "react";
import FilterType from "./FilterType";

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

  return (
    <section className="flex h-[fit-content] w-[250px] flex-col rounded-md bg-white px-6 py-4 shadow-md">
      <div className="mb-4 flex justify-between">
        <h1>Filters</h1>
        <button className="capitalize">clear</button>
      </div>
      <FilterType heading={"Category"}>
        {categories.map(({ id, categoryName }) => (
          <div key={id} className="flex items-center gap-2">
            <input type="checkbox" name="" id="id" />
            <label htmlFor="id" className="capitalize">
              {categoryName}
            </label>
          </div>
        ))}
      </FilterType>
      <FilterType heading={"Price"}>
        <input
          type="range"
          min={200}
          max={2000}
          list="price"
          className="range-input"
        />
      </FilterType>

      <FilterType heading={"Rating"}>
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
      </FilterType>

      <FilterType heading={"Brands"}>
        {brands.map((el) => (
          <div key={el} className="flex items-center gap-2">
            <input type="checkbox" name="" id="id" />
            <label htmlFor="id" className="capitalize">
              {el}
            </label>
          </div>
        ))}
      </FilterType>

      <FilterType heading={"Sort By"}>
        <div className="flex items-center gap-2">
          <input type="radio" name="sort" />
          <label htmlFor="">high to low</label>
        </div>
        <div className="flex items-center gap-2">
          <input type="radio" name="sort" />
          <label htmlFor="">low to high</label>
        </div>
      </FilterType>
    </section>
  );
}
