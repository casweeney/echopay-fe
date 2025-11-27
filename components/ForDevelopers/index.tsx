import { ECHOPAY_SVG } from "@/assets/svgs";
import { Button } from "../ui/button";

const Developers = () => {
  const devFeatures = [
    {
      title: "RESTful API",
      desc: "Clean, well-documented endpoints that follow industry standards",
    },
    {
      title: "Webhooks & Real-time Events",
      desc: "Get instant notifications for every transaction status",
    },
    {
      title: "SDKs for Popular Languages",
      desc: "Node.js, Python, PHP, and more coming soon",
    },
  ];
  return (
    <div className="pb-16 md:pb-32 pt-8 md:pt-20 font-inter">
      <div className="max-w-[73rem] mx-auto px-4 flex flex-col gap-2 md:gap-4 items-center text-center mb-8 md:mb-14">
        <h2 className="font-normal text-3xl md:text-4xl lg:text-5xl leading-[32px] md:leading-[40px] lg:leading-[48px] tracking-[0.35px] text-[#010721]">
          Resolva - For Developers
        </h2>
        <p className="font-normal text-sm md:text-base lg:text-lg tracking-[-0.44px] text-[#6B7280]">
          Adaptive, fast API for your projects.
        </p>
      </div>

      <div className="w-full bg-[url(/backgroundWave.svg)] py-8 md:py-[67px]">
        <div className="max-w-[73rem] mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-0">
            <div className="w-full flex flex-col gap-6">
              <div className="w-[173px] h-[52px] p-[8px] bg-gradient-to-r from-[#CDEBFF33] to-[#D3D8FF2B] rounded-[32px] border-[0.5px] border-x-0 border-[#cae1ff]">
                <div className="w-[157px] h-[36px] py-[8px] px-[16px] bg-[#D2EDFF33] rounded-[32px] border-[0.5px] border-x-0 border-[#cae1ff]">
                  <p className="font-normal text-xs md:text-sm tracking-[-0.15px] text-[#FFFFFF] flex items-center justify-center gap-2">
                    {ECHOPAY_SVG().tag()}
                    Developer-First
                  </p>
                </div>
              </div>

              <div>
                <h1 className="font-normal text-2xl md:text-3xl lg:text-5xl leading-[28px] md:leading-[40px] lg:leading-[48px] tracking-[0.35px] text-white mb-3">
                  <div>Integrate once.</div>
                  <span className="bg-gradient-to-b bg-clip-text from-[#00BBFF] to-[#8FC6EB] text-transparent">
                    Scale infinitely.
                  </span>
                </h1>
                <p className="font-normal text-xs md:text-sm tracking-[-0.44px] text-[#CAD5E2] max-w-[23rem]">
                  Our unified API connects 3 other powerful APIs, so you can
                  disburse funds through one clean endpoint. No more juggling
                  multiple integrations.
                </p>
              </div>

              <div className="flex flex-col gap-3 md:gap-4">
                {devFeatures.map((d, index) => (
                  <div
                    key={index}
                    className="w-full lg:w-[401px] p-[12px] flex items-start gap-2 rounded-lg bg-gradient-to-br from-[#0f1a40] to-[#BAE3FF14] border-[0.5px] border-t-[#c3d5fa] border-b-[#6a7ca1] border-x-[#43557b] shadow-[0px_1px_5px_0px_rgba(0,0,0,0.49)]"
                  >
                    <div>{ECHOPAY_SVG().doubleCheck()}</div>
                    <div className="flex flex-col gap-1">
                      <p className="font-normal text-sm md:text-base tracking-[-0.31px] text-white">
                        {d.title}
                      </p>
                      <p className="font-normal text-xs md:text-sm tracking-[-0.15px] text-[#90A1B9]">
                        {d.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <Button className="w-full lg:w-[176px] h-[56px] rounded-[10px] bg-white hover:bg-white font-medium text-xs md:text-sm tracking-[-0.15px] text-[#010721]">
                View API Docs
              </Button>
            </div>
            <div className="w-full">
              <div className="rounded-[16px]">
                <img
                  src="/devImg.png"
                  className="w-full lg:w-[463.5px]"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Developers;
