import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout() {
  return (
    <section className="relative bg-[#2C74B3]/10">
      <Header />
      <main className="pt-[100px]">
        <Outlet />
      </main>
      <Footer />
    </section>
  );
}
