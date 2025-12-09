import React from "react";
import HomeUI from "./(main)/home/homeUI";
import { Navbar } from "@/components/Navbar";

export default function Home() {
  return (
    <div className="h-full">
      <Navbar />
      <HomeUI />
    </div>
  );
}
