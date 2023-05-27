import React from "react";
import FilterComp from "../components/FilterComp";
import Product from "../components/Product";
import { useProducts } from "../contexts/ProductProvider";
import LoadingCard from "../components/LoadingCard";

export default function Products() {
  const {
    products: { productsData },
    isLoading,
  } = useProducts();

  return (
    <section className="m-8 grid grid-rows-[auto_1fr] gap-8">
      <section className="fixed left-0 right-0 top-0 z-10 h-[150px] w-full bg-[#f9fcf3] p-4 pt-[80px]">
        <FilterComp />
      </section>
      {!isLoading ? (
        <section className="mt-8 grid grid-cols-auto justify-items-center gap-4 max-[500px]:grid-cols-autoSmall max-[500px]:gap-[5px]">
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
