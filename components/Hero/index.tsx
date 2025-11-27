import { ArrowRight, FileText } from "lucide-react";
import Link from "next/link";
import { Separator } from "../ui/separator";

export function Hero() {
  return (
    <section className="relative bg-[url(/hero_img.svg)] min-h-[110vh] md:h-[140vh] w-full bg-cover pt-28 flex items-center justify-center font-inter px-4">
      {/* Background Pattern Overlay */}
      <div className="max-w-[73rem] mx-auto flex flex-col gap-4 items-center">
        <div className="w-[265px] h-[56px] rounded-[32px] p-[8px] bg-gradient-to-br from-[#CDEBFF33] to-[#D3D8FF2B] border border-[#f5fbff]">
          <div className="w-[249px] h-[40px] rounded-[32px] py-[8px] px-[16px] bg-[#d2edffcc] flex items-center justify-center">
            <p className="font-normal text-xs md:text-sm lg:text-base tracking-[-0.31px] text-[#010721] text-center">
              Unified Disbursement System
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-3 md:gap-4 mb-6 md:mb-[1.25rem]">
          <h1 className="font-medium text-3xl md:text-4xl lg:text-6xl leading-[36px] md:leading-[48px] lg:leading-[60px] tracking-[-0.6px] md:tracking-[-1px] lg:tracking-[-1.24px] text-[#010721] text-center">
            <div className="mb-2 md:mb-4">Simplify Disbursements.</div>
            <span className="bg-gradient-to-b bg-clip-text from-[#0046A7] via-[#117ED1] to-[#00BBFF] text-transparent">
              Power Your Payouts.
            </span>
          </h1>
          <p className="font-400 text-sm md:text-base lg:text-xl tracking-[-0.22px] md:tracking-[-0.35px] lg:tracking-[-0.45px] text-[#6B7280] max-w-[550px] mx-auto text-center">
            Echopay helps you disburse funds, so you can send money faster,
            easier, and without failed transfers.
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-3 md:gap-4 items-center mb-6 md:mb-7 w-full md:w-auto">
          <Link
            href="#"
            className="rounded-[12px] py-[10px] px-[24px] w-[249px] h-[56px] flex gap-[12px] items-center justify-center font-medium text-xs md:text-sm tracking-[-0.15px] text-white bg-[#0046A7]"
          >
            Create Merchant Account
            <ArrowRight className="w-[16px] h-[16px]" />
          </Link>
          <Link
            href="#"
            className="rounded-[12px] border-2 border-[#E0E0E0] py-[10px] px-[24px] w-[249px] h-[56px] flex gap-[12px] items-center justify-center font-medium text-xs md:text-sm tracking-[-0.15px] text-[#010721] bg-white"
          >
            <FileText className="w-[16px] h-[16px]" />
            View API Docs
          </Link>
        </div>
        <div className="flex flex-row items-center gap-6 md:gap-10">
          <div className="text-center">
            <p className="font-normal text-lg md:text-2xl tracking-[0.07px] text-[#010721] mb-[0.5px]">
              99.9%
            </p>
            <p className="font-normal text-xs md:text-sm tracking-[-0.15px] text-[#6B7280]">
              Uptime
            </p>
          </div>
          <Separator
            orientation="vertical"
            className="hidden md:block border-l border-[#E0E0E0] h-[55px]"
          />
          <div className="text-center">
            <p className="font-normal text-lg md:text-2xl tracking-[0.07px] text-[#010721] mb-[0.5px]">
              50K+
            </p>
            <p className="font-normal text-xs md:text-sm tracking-[-0.15px] text-[#6B7280]">
              Transactions
            </p>
          </div>
          <Separator
            orientation="vertical"
            className="hidden md:block border-l border-[#E0E0E0] h-[55px]"
          />
          <div className="text-center">
            <p className="font-normal text-lg md:text-2xl tracking-[0.07px] text-[#010721] mb-[0.5px]">
              {"<2s"}
            </p>
            <p className="font-normal text-xs md:text-sm tracking-[-0.15px] text-[#6B7280]">
              Response Time
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
