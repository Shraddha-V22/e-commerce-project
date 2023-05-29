import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Layout() {
  return (
    <section className="relative grid h-[100vh] grid-rows-[1fr_auto] overflow-x-hidden font-nanumGothic">
      <Header />
      <main className="bg-[#E3F2C1]/20 pt-[100px]">
        <Outlet />
        <ToastContainer
          autoClose={2000}
          position="bottom-right"
          hideProgressBar={true}
          closeOnClick
          pauseOnFocusLoss={false}
          className="w-[fit-content]"
          theme="light"
        />
      </main>
      <Footer />
    </section>
  );
}
