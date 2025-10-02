import React from "react";
import HomeUI from "./(main)/home/homeUI";
import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <HomeUI />
      <Footer />
    </>
  );
}
