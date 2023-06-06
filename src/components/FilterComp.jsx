import React from "react";
import { fetchRequest } from "../common/api";
import { useEffect } from "react";
import { useState } from "react";
import { useProducts, useProductsDispatch } from "../contexts/ProductProvider";
import { getUniqueElementArray } from "../common/utils";
import { useMemo } from "react";
import FilterType from "./FilterType";

export default function FilterComp({ onMobile }) {
  const [showFilters, setShowFilters] = useState(false);
  const productDispatch = useProductsDispatch();

  return !onMobile ? (
    <section className="fixed flex h-[70vh] w-[250px] flex-col gap-4 overflow-y-auto rounded-md px-4">
      <div className="flex justify-between">
        <h1 className="cursor-pointer text-xl uppercase hover:text-pink-600">
          Filters
        </h1>
        <button
          className="text-sm uppercase underline"
          onClick={() => productDispatch({ type: "CLEAR_FILTERS" })}
        >
          clear
        </button>
      </div>
      <FiltersInputs />
    </section>
  ) : (
    <section className="flex w-full justify-center bg-[#E3F2C1] p-2">
      <button
        onClick={() => setShowFilters((prev) => !prev)}
        className="rounded-sm border-[1px] border-black p-1 px-4 text-sm uppercase active:bg-[#bfce9a]"
      >
        Filters
      </button>
      {showFilters && (
        <FiltersInputs
          setShowFilters={setShowFilters}
          classNames={
            "fixed w-full h-[100vh] overflow-y-auto z-30 top-0 py-8 p-4 bg-[#E3F2C1]"
          }
        />
      )}
    </section>
  );
}

function FiltersInputs({ classNames, setShowFilters }) {
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
    <article className={`${classNames} flex flex-col gap-2 pb-2`}>
      <div className="flex items-center gap-2 self-end">
        {classNames && (
          <button
            className="h-6 rounded-sm border-[1px] border-black p-1 text-xs uppercase active:bg-[#bfce9a]"
            onClick={() => setShowFilters((prev) => !prev)}
          >
            Apply
          </button>
        )}
        {classNames && (
          <button
            onClick={() => productDispatch({ type: "CLEAR_FILTERS" })}
            className="h-6 rounded-sm border-[1px] border-black p-1 text-xs uppercase active:bg-[#bfce9a]"
          >
            clear all
          </button>
        )}
        {classNames && (
          <button
            className="h-6 rounded-sm border-[1px] border-black p-1 text-xs uppercase active:bg-[#bfce9a]"
            onClick={() => {
              productDispatch({ type: "CLEAR_FILTERS" });
              setShowFilters((prev) => !prev);
            }}
          >
            cancel
          </button>
        )}
      </div>
      <FilterType heading={"Category"}>
        {categories.map(({ id, categoryName }) => (
          <div key={id} className="flex items-center gap-2">
            <input
              className="accent-pink-600"
              type="checkbox"
              name={
                categoryName[0].toUpperCase() +
                categoryName.substr(1, categoryName.length)
              }
              id="id"
              onChange={(e) =>
                productDispatch({
                  type: "CATEGORY_FILTER",
                  payload: {
                    name: e.target.name,
                    checked: e.target.checked,
                  },
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

      <FilterType heading={`Price - (max) ₹${products.price}`}>
        <div className="flex flex-col gap-1">
          <label className="flex justify-between" htmlFor="price-range">
            <span>₹10</span>
            <span>₹1000</span>
          </label>
          <input
            id="price-range"
            type="range"
            min={10}
            max={1000}
            list="price"
            className="range-input accent-pink-600"
            value={products.price}
            onChange={(e) =>
              productDispatch({
                type: "PRICE_FILTER",
                payload: e.target.value,
              })
            }
          />
        </div>
      </FilterType>

      <FilterType heading={"Rating"}>
        {ratingArr.map((rating) => (
          <div key={rating} className="flex items-center gap-2">
            <input
              className="accent-pink-600"
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
              className="accent-pink-600"
              type="checkbox"
              name={el}
              id="id"
              onChange={(e) =>
                productDispatch({
                  type: "BRANDS_FILTER",
                  payload: {
                    name: e.target.name,
                    checked: e.target.checked,
                  },
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
              className="accent-pink-600"
              type="checkbox"
              name={el}
              id="id"
              onChange={(e) =>
                productDispatch({
                  type: "MATERIALS_FILTER",
                  payload: {
                    name: e.target.name,
                    checked: e.target.checked,
                  },
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
            className="accent-pink-600"
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
            className="accent-pink-600"
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
    </article>
  );
}
