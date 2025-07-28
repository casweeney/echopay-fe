"use client";
import React, { useEffect, useRef } from "react";

const HomeUI = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(console.error);
    }
  }, []);
  return (
    <div className="py-[20px] px-[30px]">
      <section className="flex items-center">
        <div className="flex flex-col gap-[24px]">
          <h1 className="text-[48px] font-[500] leading-[100%]">
            Powering the Next Generation of Payments
          </h1>
          <p className="text-[17px] leading-[130%] font-[400] text-[#636377]">
            From API integrations, to banking integrations, we provide
            everything you need to collect and disburse payments across multiple
            entities.
          </p>
          <button className="rounded-[8px] py-[14px] px-[20px] bg-[#F48210] text-[15px] font-[500] text-[#18181B] leading-[130%] tracking-[-1%]">
            Create a free Account
          </button>
        </div>
        <div className="relative">
          <div className="aspect-square relative">
            <video
              ref={videoRef}
              className="rounded-lg h-[600px] w-full object-cover"
              autoPlay
              loop
              muted
              playsInline
            >
              <source src={"/hero_vid.mp4"} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeUI;
