import React from "react";
import { useWishlist } from "../contexts/WishlistProvider";
import Product from "../components/Product";

export default function Wishlist() {
  const { wishlist } = useWishlist();
  return (
    <section className="mx-auto mb-8 w-[fit-content]">
      {wishlist.length > 0 ? (
        <section className="flex max-w-[850px] flex-wrap gap-8">
          {wishlist.map((item) => (
            <Product key={item.id} item={item} />
          ))}
        </section>
      ) : (
        <p>Add products to wishlist</p>
      )}
    </section>
  );
}
