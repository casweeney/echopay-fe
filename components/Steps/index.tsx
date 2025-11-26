import { ECHOPAY_SVG } from "@/assets/svgs";
import React from "react";

const Steps = () => {
  const steps = [
    {
      number: 1,
      icon: ECHOPAY_SVG().stepOne(),
      title: "Create Your Merchant Account",
      desc: "Set up your merchant account in less than 90 seconds. It is free!",
      border: "",
    },
    {
      number: 2,
      icon: ECHOPAY_SVG().stepTwo(),
      title: "Disburse Payouts Seamlessly",
      desc: "Send money across multiple channels with intelligent routing. Automatic failover ensures zero downtime.",
      border: "",
    },
    {
      number: 3,
      icon: ECHOPAY_SVG().stepThree(),
      title: "Track Every Transaction",
      desc: "Monitor all disbursements in real-time. Detailed analytics and reporting in one centralized dashboard.",
      border: "",
    },
  ];
  return (
    <div className="max-w-[75rem] mx-auto pb-32 px-4 font-inter">
      <div className="flex flex-col gap-4 items-center text-center mb-16">
        <h2 className="font-normal text-5xl leading-[48px] tracking-[0.35px] text-[#010721] ">
          Powering Every Payout
        </h2>
        <p className="font-normal text-lg tracking-[-0.44px] text-[#6B7280] ">
          Three simple steps to transform your disbursement process
        </p>
      </div>

      <div className="flex justify-center items-stretch gap-8">
        {steps.map((step) => (
          <div className="w-[300.6px] shadow-[0px_1px_4px_0px_rgba(163,163,163,0.49)] bg-[#FFFFFD] rounded-[16px] border border-[#E0E0E0] relative px-8 py-12 flex flex-col">
            <div className="w-[48px] h-[48px] bg-gradient-to-b from-[#006BFF] to-[#001B41] rounded-[16777200px] absolute top-[-16px] left-[-16px] flex items-center justify-center font-normal text-base tracking-[-0.31px] text-white shadow-[0px_2px_7px_-1px_rgba(54,54,54,0.89)]">
              {step.number}
            </div>
            <div className="mb-6">{step.icon}</div>
            <h3 className="mb-3 font-normal text-base tracking-[-0.31px] text-[#010721]">
              {step.title}
            </h3>
            <p className="font-normal text-base tracking-[-0.31px] text-[#6B7280] flex-1">
              {step.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Steps;
