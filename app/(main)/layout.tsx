"use client";
import NavBar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ReactNode } from "react";

export default function MainAppLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <NavBar />
      {children}
      <Footer />
    </>
  );
}
