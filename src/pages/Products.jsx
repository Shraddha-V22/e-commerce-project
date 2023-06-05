import React from "react";
import FilterComp from "../components/FilterComp";
import Product from "../components/Product";
import { useProducts } from "../contexts/ProductProvider";
import LoadingCard from "../components/LoadingCard";
import { useState } from "react";
import { useEffect } from "react";

export default function Products() {
  const {
    products: { productsData },
    isLoading,
  } = useProducts();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener("resize", (e) => {
      return setWindowWidth(e.target.innerWidth);
    });

    return () =>
      window.addEventListener("resize", (e) => {
        return setWindowWidth(e.target.innerWidth);
      });
  }, [windowWidth]);

  return (
    <section
      className={`${
        windowWidth <= 750 ? "" : "mx-4 grid grid-cols-[auto_1fr] gap-4"
      }`}
    >
      <section
        className={`${
          windowWidth <= 750 ? "fixed bottom-0 z-10 w-full" : "w-[250px]"
        }`}
      >
        <FilterComp onMobile={windowWidth <= 750} />
      </section>
      {!isLoading ? (
        <section className="mx-4 mb-8 grid w-auto grid-cols-auto justify-items-center gap-[5px] max-[500px]:mx-2 max-[500px]:grid-cols-autoSmall md:gap-2">
          {productsData.map((item) => (
            <Product key={item.id} item={item} />
          ))}
        </section>
      ) : (
        <section className="mt-8 grid grid-cols-auto justify-items-center gap-4 max-[500px]:grid-cols-autoSmall">
          <LoadingCard />
          <LoadingCard />
          <LoadingCard />
          <LoadingCard />
          <LoadingCard />
          <LoadingCard />
        </section>
      )}
    </section>
  );
}
