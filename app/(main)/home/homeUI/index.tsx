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
    <div className="pt-[110px]">
      {/* Hero Section */}
      <section className="grid lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center mb-12 sm:mb-16 lg:mb-[95px] px-4 sm:px-6 lg:px-[30px]">
        <div className="flex flex-col gap-4 sm:gap-6 lg:gap-[24px] order-2 lg:order-1">
          <h1 className="text-3xl sm:text-4xl lg:text-[48px] font-[500] leading-[100%]">
            Powering the Next Generation of Payments
          </h1>
          <p className="text-base sm:text-lg lg:text-[17px] leading-[130%] font-[400] text-[#636377]">
            From API integrations, to banking integrations, we provide
            everything you need to collect and disburse payments across multiple
            entities.
          </p>
          <div>
            <button className="rounded-[8px] py-3 sm:py-[14px] px-5 sm:px-[20px] bg-[#F48210] hover:bg-[#E5750E] transition-colors text-sm sm:text-[15px] font-[500] text-[#18181B] leading-[130%] tracking-[-1%]">
              Create a free Account
            </button>
          </div>
        </div>
        <div className="relative order-1 lg:order-2">
          <div className="aspect-square relative bg-[#e3e5f1] object-cover rounded-[24px] overflow-hidden w-full">
            <video
              ref={videoRef}
              className="rounded-lg h-full w-full sm:h-[400px] lg:h-[500px] overflow-hidden object-cover -translate-y-[10%] rotate-[35deg]"
              autoPlay
              loop
              muted
              playsInline
            >
              <source src={"/hero_vid.mp4"} type="video/mp4" />
              Your browser does not support the video tag
            </video>
          </div>
        </div>
      </section>

      {/* Feature Sections */}
      <section className="flex flex-col gap-8 sm:gap-12 lg:gap-[70px] px-4 sm:px-6 lg:px-[30px] pb-8 sm:pb-10 lg:pb-[40px]">
        {/* Feature 1 */}
        <div className="relative min-h-[60vh] sm:min-h-[70vh] lg:min-h-screen w-full overflow-hidden">
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat rounded-2xl lg:rounded-[32px]"
            style={{
              backgroundImage: "url('/bg-1.png')",
            }}
          />

          {/* Dark Overlay */}
          <div className="absolute rounded-2xl lg:rounded-[32px] inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60" />

          <div className="absolute bottom-4 sm:bottom-6 lg:bottom-[35px] left-4 sm:left-6 lg:left-[35px] flex flex-col gap-2 sm:gap-3 lg:gap-[10px] max-w-[90%] sm:max-w-[80%] lg:max-w-[800px]">
            <div>
              <p className="rounded-[72.35px] py-[6px] px-[10px] inline-flex bg-[#FED7AA] text-[#523009] font-[500] text-xs sm:text-sm lg:text-[14px] leading-[130%] tracking-[-2%] font-dmsans">
                Perfect for all business sizes
              </p>
            </div>
            <h2 className="text-[#F4F4F5] font-display text-xl sm:text-2xl lg:text-[30px] font-[500] leading-[128%]">
              Sell Globally, Get paid instantly
            </h2>
            <p className="font-dmsans font-[500] text-sm sm:text-base lg:text-[16px] leading-[145%] tracking-[-2%] text-[#CECDD7]">
              {
                "Whether you're a shop owner, food vendor, or freelancer - start accepting digital payments without any complicated setup."
              }
            </p>
          </div>
        </div>

        {/* Feature 2 */}
        <div className="relative min-h-[60vh] sm:min-h-[70vh] lg:min-h-screen w-full overflow-hidden">
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat rounded-2xl lg:rounded-[32px]"
            style={{
              backgroundImage: "url('/bg-2.png')",
            }}
          />

          {/* Dark Overlay */}
          <div className="absolute rounded-2xl lg:rounded-[32px] inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60" />

          <div className="absolute bottom-4 sm:bottom-6 lg:bottom-[35px] left-4 sm:left-6 lg:left-[35px] flex flex-col gap-2 sm:gap-3 lg:gap-[10px] max-w-[90%] sm:max-w-[80%] lg:max-w-[800px]">
            <div>
              <p className="rounded-[72.35px] py-[6px] px-[10px] inline-flex bg-[#AAF8FE] text-[#12427C] font-[500] text-xs sm:text-sm lg:text-[14px] leading-[130%] tracking-[-2%] font-dmsans">
                Multi-Currency Wallets
              </p>
            </div>
            <h2 className="text-[#F4F4F5] font-display text-xl sm:text-2xl lg:text-[30px] font-[500] leading-[128%]">
              Create and manage wallets in multiple currencies
            </h2>
            <p className="font-dmsans font-[500] text-sm sm:text-base lg:text-[16px] leading-[145%] tracking-[-2%] text-[#CECDD7] max-w-full sm:max-w-[600px]">
              Hold, convert, and disburse funds with real-time exchange rates
              and transparent pricing.
            </p>
          </div>
        </div>

        {/* Feature 3 */}
        <div className="relative min-h-[60vh] sm:min-h-[70vh] lg:min-h-screen w-full overflow-hidden">
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat rounded-2xl lg:rounded-[32px]"
            style={{
              backgroundImage: "url('/bg-3.png')",
            }}
          />

          {/* Dark Overlay */}
          <div className="absolute rounded-2xl lg:rounded-[32px] inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60" />

          <div className="absolute bottom-4 sm:bottom-6 lg:bottom-[35px] left-4 sm:left-6 lg:left-[35px] flex flex-col gap-2 sm:gap-3 lg:gap-[10px] max-w-[90%] sm:max-w-[80%] lg:max-w-[800px]">
            <div>
              <p className="rounded-[72.35px] py-[6px] px-[10px] inline-flex bg-[#FF6666] text-[#571600] font-[500] text-xs sm:text-sm lg:text-[14px] leading-[130%] tracking-[-2%] font-dmsans">
                Secure API Keys
              </p>
            </div>
            <h2 className="text-[#F4F4F5] font-display text-xl sm:text-2xl lg:text-[30px] font-[500] leading-[128%]">
              Generate and manage API keys
            </h2>
            <p className="font-dmsans font-[500] text-sm sm:text-base lg:text-[16px] leading-[145%] tracking-[-2%] text-[#CECDD7] max-w-full sm:max-w-[600px]">
              Enable enterprise-grade security with rate limiting and fraud
              protection needed for disbursement.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section>
        <div className="relative min-h-[60vh] sm:min-h-[70vh] lg:min-h-screen w-full overflow-hidden flex items-center justify-center px-4 sm:px-6">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat rounded-2xl lg:rounded-[32px]"
            style={{
              backgroundImage: "url('/CTA_bg.png')",
            }}
          />
          <div className="relative flex flex-col items-center justify-center gap-4 sm:gap-6 lg:gap-[20px] text-center max-w-[90%] sm:max-w-[80%] lg:max-w-[650px]">
            <h3 className="font-display font-[500] text-2xl sm:text-3xl lg:text-[40px] leading-[100%] text-[#160F07]">
              Ready to Transform Your Payment Operations?
            </h3>
            <div>
              <button className="rounded-[8px] py-3 sm:py-[14px] px-5 sm:px-[20px] bg-[#000000] hover:bg-[#1a1a1a] transition-colors text-sm sm:text-[15px] font-[500] text-[#EFEFF5] leading-[130%] tracking-[-1%]">
                Create a free Account
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeUI;
