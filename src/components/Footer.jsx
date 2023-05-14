import React from "react";

export default function Footer() {
  return (
    <section className="h-[auto] w-full bg-white">
      <section className="grid grid-cols-4 p-8">
        <div>
          <h1>About</h1>
          <ul>
            <li>contact us</li>
            <li>about us</li>
            <li>careers</li>
          </ul>
        </div>
        <div>
          <h1>Help</h1>
          <ul>
            <li>payments</li>
            <li>shipping</li>
            <li>cancellation & returns</li>
            <li>faq</li>
          </ul>
        </div>
        <div>
          <h1>social</h1>
          <ul>
            <li>facebook</li>
            <li>twitter</li>
            <li>instagram</li>
            <li>youtube</li>
          </ul>
        </div>
        <div>
          <h1>registered office address</h1>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Praesentium, earum pariatur! Esse!
          </p>
        </div>
      </section>
      <p className="border-t-[1px] p-4 text-center">@2023</p>
    </section>
  );
}
