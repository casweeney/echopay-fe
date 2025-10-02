import { Button } from "@/components/ui/button";
import Image from "next/image";

export function Hero() {
  return (
    <section className="relative min-h-[70vh] bg-white">
      {/* Background Pattern Overlay */}
      <div className="absolute inset-0 w-full h-full z-0">
        <Image
          width={20}
          height={20}
          src="/pattern.svg"
          alt="background pattern"
          className="w-full h-full object-cover opacity-40"
          style={{ mixBlendMode: "multiply" }}
        />
      </div>

      <div className="relative z-10 max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-4 pt-24 sm:pt-4">
        <div className="grid lg:grid-cols-2 gap-12 sm:gap-0 items-center min-h-[calc(100vh-4rem)]">
          {/* Left Section - Text Content */}
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
              <Button
                className="bg-[#F48210] text-[#18181B] hover:bg-[#F48210] rounded-[8px] px-8 py-6 text-base font-[500] transition-colors"
                size="lg">
                Create a free Account
              </Button>
            </div>
          </div>

          {/* Right Section - Video */}
          <div className="relative">
            <div className="overflow-hidden flex items-center justify-center">
              <div className="relative w-full bg-[#e2e6f1]  h-[400px] lg:h-[500px] rounded-xl overflow-hidden">
                <video
                  className="w-full h-full object-cover rotate-[28deg] scale-122"
                  autoPlay
                  muted
                  loop
                  playsInline>
                  <source src="hero_vid.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
