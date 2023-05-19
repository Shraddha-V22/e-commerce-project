import React from "react";
import { fetchRequest } from "../common/api";
import { useEffect } from "react";
import { useState } from "react";
import { useProducts, useProductsDispatch } from "../contexts/ProductProvider";
import { getUniqueElementArray } from "../common/utils";
import { useMemo } from "react";
import FilterType from "./FilterType";

export default function FilterComp() {
  const [categories, setCategories] = useState([]);
  const { products } = useProducts();
  const productDispatch = useProductsDispatch();

  const ratingArr = [4, 3, 2, 1];

  const brands = useMemo(
    () => getUniqueElementArray(products.productDefault, "brand"),
    [products]
  );
  const materials = useMemo(
    () => getUniqueElementArray(products.productDefault, "material"),
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
        <button
          className="capitalize underline"
          onClick={() => productDispatch({ type: "CLEAR_FILTERS" })}
        >
          clear
        </button>
      </div>
      <FilterType heading={"Category"}>
        {categories.map(({ id, categoryName }) => (
          <div key={id} className="flex items-center gap-2">
            <input
              type="checkbox"
              name={
                categoryName[0].toUpperCase() +
                categoryName.substr(1, categoryName.length)
              }
              id="id"
              onChange={(e) =>
                productDispatch({
                  type: "CATEGORY_FILTER",
                  payload: { name: e.target.name, checked: e.target.checked },
                })
              }
              checked={products.category.includes(
                categoryName[0].toUpperCase() +
                  categoryName.substr(1, categoryName.length)
              )}
            />
            <label htmlFor="id" className="capitalize">
              {categoryName}
            </label>
          </div>
        ))}
      </FilterType>

      <FilterType heading={"Price (max)"}>
        <input
          type="range"
          min={10}
          max={1000}
          list="price"
          className="range-input"
          value={products.price}
          onChange={(e) =>
            productDispatch({ type: "PRICE_FILTER", payload: e.target.value })
          }
        />
      </FilterType>

      <FilterType heading={"Rating"}>
        {ratingArr.map((rating) => (
          <div key={rating} className="flex items-center gap-2">
            <input
              type="radio"
              name="rating"
              value={products.rating}
              onChange={() =>
                productDispatch({
                  type: "RATING_FILTER",
                  payload: rating,
                })
              }
              checked={products.rating === Number(rating)}
            />
            <label htmlFor="">{rating} & above</label>
          </div>
        ))}
      </FilterType>

      <FilterType heading={"Brands"}>
        {brands.map((el) => (
          <div key={el} className="flex items-center gap-2">
            <input
              type="checkbox"
              name={el}
              id="id"
              onChange={(e) =>
                productDispatch({
                  type: "BRANDS_FILTER",
                  payload: { name: e.target.name, checked: e.target.checked },
                })
              }
              checked={products.brands.includes(el)}
            />
            <label htmlFor="id" className="capitalize">
              {el}
            </label>
          </div>
        ))}
      </FilterType>

      <FilterType heading={"Materials"}>
        {materials.map((el) => (
          <div key={el} className="flex items-center gap-2">
            <input
              type="checkbox"
              name={el}
              id="id"
              onChange={(e) =>
                productDispatch({
                  type: "MATERIALS_FILTER",
                  payload: { name: e.target.name, checked: e.target.checked },
                })
              }
              checked={products.materials.includes(el)}
            />
            <label htmlFor="id" className="capitalize">
              {el}
            </label>
          </div>
        ))}
      </FilterType>

      <FilterType heading={"Sort By"}>
        <div className="flex items-center gap-2">
          <input
            type="radio"
            name="sort"
            value="HTL"
            onChange={(e) =>
              productDispatch({ type: "SORT", payload: e.target.value })
            }
            checked={products.sort === "HTL"}
          />
          <label htmlFor="">high to low</label>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="radio"
            name="sort"
            value="LTH"
            onChange={(e) =>
              productDispatch({ type: "SORT", payload: e.target.value })
            }
            checked={products.sort === "LTH"}
          />
          <label htmlFor="">low to high</label>
        </div>
      </FilterType>
    </section>
  );
}
