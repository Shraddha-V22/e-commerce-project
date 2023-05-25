import React from "react";
import { useWishlist } from "../contexts/WishlistProvider";
import Product from "../components/Product";

export default function Wishlist() {
  const { wishlist } = useWishlist();
  return (
    <section className="mx-auto mb-8 h-full w-[fit-content]">
      {wishlist.length > 0 ? (
        <section className="flex max-w-[850px] flex-wrap gap-8">
          {wishlist.map((item) => (
            <Product key={item.id} item={item} />
          ))}
        </section>
      ) : (
        <p className="mx-auto grid h-full max-w-[500px] place-items-center text-center">
          Empty wishlist, full imagination! Let's sprinkle it with stardust and
          watch it blossom into a garden of desires. Start dreaming, and let's
          make it happen!
        </p>
      )}
    </section>
  );
}
