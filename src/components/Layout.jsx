import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout() {
  return (
    <section className="relative bg-[#E3F2C1]/20 font-nanumGothic">
      <Header />
      <main className="pt-[100px]">
        <Outlet />
      </main>
      <Footer />
    </section>
  );
}
