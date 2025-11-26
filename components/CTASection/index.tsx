import Link from "next/link";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";

const CTA = () => {
  return (
    <div className="max-w-[73rem] mx-auto pb-32 pt-16 px-4 font-inter">
      <div className="flex items-center">
        <div className="w-full flex flex-col gap-6">
          <div className="w-[265px] h-[56px] rounded-[32px] p-[8px] bg-gradient-to-br from-[#CDEBFF33] to-[#D3D8FF2B] border border-[#f5fbff]">
            <div className="w-[249px] h-[40px] rounded-[32px] py-[8px] px-[16px] bg-[#d2edffcc]">
              <p className="font-normal text-base tracking-[-0.31px] text-[#010721] w-full flex justify-center">
                Perfect for all business sizes
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-3 mb-4">
            <p className="font-normal text-5xl leading-[48px] tracking-[0.35px] text-[#010721]">
              Simplify Your Disbursements
            </p>
            <p className="font-normal text-xl tracking-[-0.45px] text-[#010721] max-w-[22rem]">
              Join forward-thinking companies that are transforming their payout
              processes with Echopay
            </p>
          </div>

          <Link
            href="/register"
            className="bg-[#0046A7] w-[216px] h-[56px] rounded-[12px] py-[10px] px-[24px] flex gap-[12px] items-center text-white font-medium text-sm tracking-[-0.15px]"
          >
            Create Your Account
            <ArrowRight className="w-[16px] h-[16px]" />
          </Link>
        </div>
        <div className="w-full">
          <div className="rounded-[24px]">
            <img src="/ctaImg.png" className="rounded-[24px]" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTA;
