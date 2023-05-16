import React from "react";
import { Link } from "react-router-dom";
import { getImgUrl } from "../common/utils";

export default function Product({ item }) {
  const { id, product_name, brand, price, category } = item;

  return (
    <Link to={`/products/product-${id}`}>
      <div className="relative grid h-[300px] w-[200px] grid-cols-[auto_1fr] overflow-hidden rounded-lg bg-white">
        <img
          src={getImgUrl(category)}
          alt={`${product_name}`}
          className="w-full"
        />
        <div className="absolute bottom-0 flex w-full flex-col items-start bg-white px-4 py-2">
          <h3 className="line-clamp-1 font-bold uppercase">{product_name}</h3>
          <p className="text-xs uppercase">{brand}</p>
          <p>${price}</p>
          <button className="rounded-md border-[1px] px-4 py-1">
            Add to cart
          </button>
        </div>
      </div>
    </Link>
  );
}

// id: 61,
// product_name: "blandit nam",
// brand: "Adidas",
// category: "Clothing",
// color: "Pink",
// size: "XL",
// price: 164.52,
// material: "Cotton",
// season: "Spring",
// image_url: "http://dummyimage.com/100x150.png/5fa2dd/ffffff",
// description:
