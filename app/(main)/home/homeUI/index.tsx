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
      <section className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-[95px]">
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
          <div className="aspect-square relative bg-[#DFE2EF] rounded-[24px] overflow-hidden">
            <video
              ref={videoRef}
              className="rounded-lg h-[690px] overflow-hidden object-cover transform rotate-[40deg]"
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
      <section className="flex flex-col gap-[70px]">
        <div className="relative min-h-screen w-full overflow-hidden">
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat rounded-[32px]"
            style={{
              backgroundImage: "url('/bg-1.png')",
            }}
          />

          {/* Dark Overlay */}
          <div className="absolute rounded-[32px] inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60" />
        </div>
        <div className="relative min-h-screen w-full overflow-hidden">
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat rounded-[32px]"
            style={{
              backgroundImage: "url('/bg-2.png')",
            }}
          />

          {/* Dark Overlay */}
          <div className="absolute rounded-[32px] inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60" />
        </div>
        <div className="relative min-h-screen w-full overflow-hidden">
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat rounded-[32px]"
            style={{
              backgroundImage: "url('/bg-3.png')",
            }}
          />

          {/* Dark Overlay */}
          <div className="absolute rounded-[32px] inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60" />
        </div>
      </section>
    </div>
  );
};

export default HomeUI;
