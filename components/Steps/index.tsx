import { ECHOPAY_SVG } from "@/assets/svgs";

const Steps = () => {
  const steps = [
    {
      number: 1,
      icon: ECHOPAY_SVG().stepOne(),
      title: "Create Your Merchant Account",
      desc: "Set up your merchant account in less than 90 seconds. It is free!",
      border:
        "absolute h-[2px] w-[32px] top-[146px] left-[283.66px] bg-gradient-to-r from-[#0046A74D] to-[#00BBFF4D]",
    },
    {
      number: 2,
      icon: ECHOPAY_SVG().stepTwo(),
      title: "Disburse Payouts Seamlessly",
      desc: "Send money across multiple channels with intelligent routing. Automatic failover ensures zero downtime.",
      border:
        "absolute h-[2px] w-[32px] top-[146px] left-[283.66px] bg-gradient-to-r from-[#0046A74D] to-[#00BBFF4D]",
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
    <div className="max-w-[73rem] mx-auto pb-16 md:pb-32 px-4 font-inter">
      <div className="flex flex-col gap-2 md:gap-4 items-center text-center mb-8 md:mb-16">
        <h2 className="font-normal text-3xl md:text-4xl lg:text-5xl leading-[32px] md:leading-[40px] lg:leading-[48px] tracking-[0.35px] text-[#010721]">
          Powering Every Payout
        </h2>
        <p className="font-normal text-sm md:text-base lg:text-lg tracking-[-0.44px] text-[#6B7280]">
          Three simple steps to transform your disbursement process
        </p>
      </div>

      <div className="flex flex-col md:flex-row md:justify-center md:items-stretch gap-8">
        {steps.map((step) => (
          <div
            key={step.number}
            className="w-full md:w-[300.6px] shadow-[0px_2px_5px_0px_rgba(163,163,163,0.49)] bg-[#FFFFFD] rounded-[16px] border border-[#E0E0E0] relative px-6 md:px-8 py-8 md:py-12 flex flex-col"
          >
            <div className="w-[48px] h-[48px] bg-gradient-to-b from-[#006BFF] to-[#001B41] rounded-[16777200px] absolute top-[-16px] left-[-16px] flex items-center justify-center font-normal text-base tracking-[-0.31px] text-white shadow-[0px_2px_7px_-1px_rgba(54,54,54,0.89)]">
              {step.number}
            </div>
            <div className="mb-4 md:mb-6">{step.icon}</div>
            <h3 className="mb-2 md:mb-3 font-normal text-sm md:text-base tracking-[-0.31px] text-[#010721]">
              {step.title}
            </h3>
            <p className="font-normal text-sm md:text-base tracking-[-0.31px] text-[#6B7280] flex-1">
              {step.desc}
            </p>
            <div className={step.border}></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Steps;
