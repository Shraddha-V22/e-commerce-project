import React from "react";

export default function FilterComp() {
  return (
    <section className="flex w-[200px] flex-col rounded-md bg-white px-6 py-4 shadow-md">
      <div className="mb-4 flex justify-between">
        <h1>Filters</h1>
        <button className="">clear</button>
      </div>
      <div className="border-b-[1px] border-black py-2">
        <h3 className="mb-2 text-sm uppercase">Category</h3>
        <div className="flex items-center gap-2">
          <input type="checkbox" name="" id="id" />
          <label htmlFor="id">cat 1</label>
        </div>
        <div className="flex items-center gap-2">
          <input type="checkbox" name="" id="id1" />
          <label htmlFor="id1">cat 2</label>
        </div>
      </div>
      <div className="border-b-[1px] border-black py-2">
        <h3 className="mb-2 text-sm uppercase">Price</h3>
        <input
          type="range"
          min={200}
          max={2000}
          list="price"
          className="range-input"
        />
        <datalist id="price">
          <option value="200">200</option>
          <option value="560">225</option>
          <option value="920">1250</option>
          <option value="1280">1275</option>
          <option value="1640">1275</option>
          <option value="2000">2000</option>
        </datalist>
      </div>
      <div className="border-b-[1px] border-black py-2">
        <h3 className="mb-2 text-sm uppercase">Rating</h3>
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
      </div>
      <div className="py-2">
        <h3 className="mb-2 text-sm uppercase">Sort by</h3>
        <div className="flex items-center gap-2">
          <input type="radio" name="sort" />
          <label htmlFor="">high to low</label>
        </div>
        <div className="flex items-center gap-2">
          <input type="radio" name="sort" />
          <label htmlFor="">low to high</label>
        </div>
      </div>
    </section>
  );
}
