import Link from "next/link";
import { Button } from "../ui/button";

const CTASection = () => {
  return (
    <section>
      <div className="relative min-h-[40vh] sm:min-h-[50vh] lg:min-h-[60vh] w-full overflow-hidden flex items-center justify-center px-4 sm:px-6">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat rounded-2xl lg:rounded-[32px]"
          style={{
            backgroundImage: "url('/CTA_bg.svg')",
          }}
        />
        <div className="relative flex flex-col items-center justify-center gap-4 sm:gap-6 lg:gap-[20px] text-center max-w-[90%] sm:max-w-[80%] lg:max-w-[650px]">
          <h3
            className="font-display font-[500] text-2xl sm:text-3xl lg:text-[44px] text-[#160F07]"
            style={{ lineHeight: "1.1" }}>
            Ready to Transform Your Payment Operations?
          </h3>
          <div>
            <Button
              asChild
              className=" text-[#EFEFF5] bg-[#000000] hover:bg-[#1a1a1a] rounded-[8px] py-6 px-6">
              <Link href="#">Create a free Account</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
