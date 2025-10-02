"use client";
import Footer from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { ReactNode } from "react";

export default function MainAppLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
