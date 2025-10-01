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
      <div className="grid lg:grid-cols-2 gap-12 sm:gap-0 items-center mb-12 sm:mb-16 lg:mb-[50px] px-4 sm:px-6 lg:px-[30px] min-h-[calc(100vh-4rem)]">
        <div className="space-y-8">
          <div className="space-y-6">
            <h1 className="text-4xl lg:text-4xl xl:text-5xl font-[500] text-[#0D0714] leading-tight">
              <span className="block">Powering the Next</span>
              <span className="block">Generation of Payments</span>
            </h1>
            <p className="text-lg text-[#636377] font-[500] leading-relaxed max-w-lg">
              From API integrations, to banking integrations, we provide
              everything you need to collect and disburse payments across
              multiple entities.
            </p>
          </div>
          <div className="pt-4">
            <button
              data-slot="button"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg:not([class*='size-'])]:size-4 shrink-0 [&amp;_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive h-10 has-[&gt;svg]:px-4 bg-[#F48210] text-[#18181B] hover:bg-[#F48210] rounded-[8px] px-8 py-6 text-base font-[500] transition-colors"
            >
              Create a free Account
            </button>
          </div>
        </div>
        <div className="relative">
          <div className="overflow-hidden flex items-center justify-center">
            <div className="relative w-full bg-[#e2e6f1]  h-[400px] lg:h-[500px] rounded-xl overflow-hidden">
              <video
                className="w-full h-full object-cover rotate-[28deg] scale-122"
                autoPlay
                loop
                muted
                playsInline
              >
                <source src="hero_vid.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      </div>

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
