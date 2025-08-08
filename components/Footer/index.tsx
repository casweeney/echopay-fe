import React from "react";
import Link from "next/link";
import { ECHOPAY_SVG } from "@/assets/svgs";

const Footer = () => {
  return (
    <footer className="bg-[#0F1217] py-[50px] px-[20px] sm:px-[35px]">
      {/* Top Section */}
      <div className="flex flex-col lg:flex-row justify-between gap-10">
        <div className="flex flex-col gap-[23px] lg:gap-[46px] w-full lg:w-auto">
          <div className="font-minecraft font-[500] text-[42px] sm:text-[60px] lg:text-[86px] leading-[90%] text-[#575B61]">
            GET STARTED
          </div>
          <div className="flex items-center gap-[20px] sm:gap-[32px] flex-wrap">
            <Link href="https://x.com">{ECHOPAY_SVG().xLogo()}</Link>
            <Link href="https://github.com">{ECHOPAY_SVG().githubLogo()}</Link>
            <Link href="https://linkedin.com">
              {ECHOPAY_SVG().linkedinLogo()}
            </Link>
          </div>
        </div>

        {/* Links Section */}
        <div className="flex flex-col sm:flex-row gap-[40px] sm:gap-[60px] lg:gap-[100px] w-full lg:w-[45%] pt-[1rem]">
          <div className="flex flex-col gap-[20px]">
            <p className="font-[600] text-[16px] text-[#FBFCFE]">Company</p>
            <div className="flex flex-col gap-[12px]">
              <Link
                className="font-[500] text-[15px] text-[#575B61]"
                href="/how-we-work"
              >
                How it works
              </Link>
              <Link
                className="font-[500] text-[15px] text-[#575B61]"
                href="/about"
              >
                About us
              </Link>
            </div>
          </div>
          <div className="flex flex-col gap-[20px]">
            <p className="font-[600] text-[16px] text-[#FBFCFE]">Misc</p>
            <div className="flex flex-col gap-[12px]">
              <Link
                className="font-[500] text-[15px] text-[#575B61]"
                href="/home"
              >
                Send us a mail
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-10 mt-[60px] lg:mt-[180px]">
        <div className="flex flex-col gap-[16px] w-full lg:w-auto">
          <p className="font-[600] text-[16px] text-[#FBFCFE]">
            Subscribe to our Newsletter
          </p>
          <form className="flex flex-col sm:flex-row items-stretch sm:items-center bg-white rounded-[8px] w-full sm:w-[545px] p-[8px] gap-3 sm:gap-0">
            <input
              type="email"
              placeholder="Yourmail@mail.com"
              className="w-full px-4 py-3 text-sm text-gray-600 placeholder-[#9CA7BD] placeholder:text-[14px] placeholder:font-grotesk placeholder:font-[500] focus:outline-none"
            />
            <button
              type="submit"
              className="bg-[#002EE9] w-full sm:w-[143px] text-white px-[17px] py-[14px] sm:py-[19px] text-[14px] font-[500] rounded-[8px]"
            >
              Submit
            </button>
          </form>
        </div>
        <div className="flex flex-col items-start lg:items-end gap-[5px]">
          <Link href="/home">{ECHOPAY_SVG().footerLogo()}</Link>
          <p className="font-[500] text-[14px] text-[#575B61] font-display">
            ECHOPAY 2025
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
