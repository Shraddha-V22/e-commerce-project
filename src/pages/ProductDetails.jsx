import React from "react";
import { useProducts } from "../contexts/ProductProvider";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getImgUrl } from "../common/utils";
import { useCart, useCartDispatch } from "../contexts/CartProvider";
import { useNavigate } from "react-router-dom";

export default function ProductDetails() {
  const navigate = useNavigate();
  const { products } = useProducts();
  const { cart } = useCart();
  const cartDispatch = useCartDispatch();
  const { productId } = useParams();

  const product = products.productsData.find(
    ({ id }) => `product-${id}` === productId
  );

  const {
    id,
    brand,
    product_name,
    description,
    color,
    price,
    season,
    size,
    category,
    rating,
    material,
  } = product;
  const inCart = cart.find((item) => item.id === id);

  return (
    <section className="mx-auto grid w-[70vw] grid-cols-[400px_1fr] border-[1px] border-black">
      <img
        src={getImgUrl(category.toLowerCase())}
        alt={`${product_name}`}
        className="w-[400px]"
      />
      <article className="flex flex-col gap-4 p-8">
        <h1 className="bg-[#2C74B3]/20 px-2 uppercase">{product_name}</h1>
        <p className="uppercase">{brand}</p>
        <p>${price}</p>
        {!inCart ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              cartDispatch({ type: "ADD_TO_CART", payload: product });
            }}
            className="rounded-md border-[1px] px-4 py-1 capitalize"
          >
            add to cart
          </button>
        ) : (
          <button
            className="rounded-md border-[1px] px-4 py-1 capitalize"
            onClick={(e) => {
              e.stopPropagation();
              navigate("/cart");
            }}
          >
            Go to cart
          </button>
        )}
        <button className="rounded-md border-[1px] border-[#2C74B3]/20 p-2 capitalize outline-none">
          Add to wishlist
        </button>
        <div className="text-xs leading-4 text-gray-500">
          <p>{description}</p>
          <ul className="ml-4 mt-2 list-disc capitalize">
            <li>color: {color}</li>
            <li>material: {material}</li>
            <li>season: {season}</li>
            <li>size: {size}</li>
          </ul>
        </div>
      </article>
    </section>
  );
}
