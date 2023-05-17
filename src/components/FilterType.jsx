import React from "react";
import { useState } from "react";

export default function FilterType({ children, heading }) {
  const [showChildren, setShowChildren] = useState(false);
  return (
    <div className="border-b-[1px] border-black py-2">
      <h3
        className="mb-2 cursor-pointer text-sm uppercase"
        onClick={() => setShowChildren((prev) => !prev)}
      >
        {heading}
      </h3>
      {showChildren && children}
    </div>
  );
}
