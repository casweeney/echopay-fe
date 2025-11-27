"use client";
import { Hero } from "@/components/Hero";
import CTA from "@/components/CTASection";
import React, { useEffect, useRef } from "react";
import Steps from "@/components/Steps";
import EchopayWay from "@/components/EchopayWay";
import Developers from "@/components/ForDevelopers";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

const HomeUI = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(console.error);
    }
  }, []);

  return (
    <div className="bg-[#fffbf9]">
      <Hero />
      <div className="w-full max-w-[68rem] mx-auto px-4 mb-32">
        <img
          src="/iMac_mockup.svg"
          alt=""
          className="w-full mt-[-6rem] max-w-[75rem] mx-auto px-4"
        />
      </div>
      <Steps />
      <EchopayWay />
      <Developers />
      <CTA />
      <FAQ />
      <Footer />
    </div>
  );
};

export default HomeUI;
