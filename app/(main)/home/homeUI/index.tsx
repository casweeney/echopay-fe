"use client";
import { Hero } from "@/components/Hero";
import FeaturesSection from "@/components/FeaturesSection";
import CTASection from "@/components/CTASection";
import React, { useEffect, useRef } from "react";

const HomeUI = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(console.error);
    }
  }, []);

  return (
    <div>
      <Hero />
      <FeaturesSection />
      <CTASection />
    </div>
  );
};

export default HomeUI;
