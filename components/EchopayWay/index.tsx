import { ECHOPAY_SVG } from "@/assets/svgs";
import React from "react";

const EchopayWay = () => {
  const ways = [
    {
      icon: ECHOPAY_SVG().wayOne(),
      title: "Unified API Integration for Developers",
      desc: "One API to rule them all. Connect multiple payment providers through a single, elegant interface.",
      span: "col-span-2 w-[90%]",
      img: "/wayOne.svg",
    },
    {
      icon: ECHOPAY_SVG().wayTwo(),
      title: "No CAC, Just Simple KYC",
      desc: "Get started quickly with streamlined verification. No complex corporate registration required.",
      span: "ml-[-4.6rem]",
      img: "/wayTwo.svg",
    },
    {
      icon: ECHOPAY_SVG().wayThree(),
      title: "Real-time Transaction Tracking",
      desc: "Monitor every payout as it happens. Instant notifications and detailed transaction logs.",
      img: "/wayThree.svg",
    },
    {
      icon: ECHOPAY_SVG().wayFour(),
      title: "Reliable Multi-Currency Support",
      desc: "Receive and disburse in NGN, USD, EUR, and more. Seamless cross-border disbursement.",
      img: "/wayFour.svg",
    },
    {
      icon: ECHOPAY_SVG().wayFive(),
      title: "Sell Globally, Get paid instantly",
      desc: "Start accepting digital payments without any complicated setup.",
      img: "/wayFive.svg",
    },
  ];
  return (
    <div className="max-w-[73rem] mx-auto pb-32 pt-10 px-4 font-inter">
      <div className="flex flex-col gap-4 items-center text-center mb-14">
        <h2 className="font-normal text-5xl leading-[48px] tracking-[0.35px] text-[#010721] ">
          The Echopay Way
        </h2>
        <p className="font-normal text-lg tracking-[-0.44px] text-[#6B7280] ">
          Three simple steps to transform your disbursement process
        </p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {ways.map((way, index) => (
          <div
            key={index}
            className={`${way.span} shadow-[0px_2px_5px_0px_rgba(163,163,163,0.49)] bg-[#FFFFFD] border border-[#E0E0E0] rounded-[16px] pl-8 py-10 flex gap-4`}
          >
            <div className="self-center">
              <div className="mb-6">{way.icon}</div>
              <h3 className="mb-3 font-medium text-base tracking-[-0.31px] text-[#010721]">
                {way.title}
              </h3>
              <p className="font-normal text-sm tracking-[-0.15px] text-[#6B7280]">
                {way.desc}
              </p>
            </div>
            <img src={way.img} className="w-[45%]" alt="" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default EchopayWay;
