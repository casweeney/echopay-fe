import React from "react";
import Link from "next/link";
import { ECHOPAY_SVG } from "@/assets/svgs";

const Footer = () => {
  return (
    <footer className="bg-[#0F1217] py-[50px] px-[35px]">
      <div className="flex justify-between">
        <div className="flex flex-col gap-[46px] w-full">
          <div className="font-minecraft font-[500] text-[86px] leading-[90%] text-[#575B61]">
            GET STARTED
          </div>
          <div className="flex items-center gap-[32px]">
            <Link href="https://x.com">{ECHOPAY_SVG().xLogo()}</Link>
            <Link href="https://github.com">{ECHOPAY_SVG().githubLogo()}</Link>
            <Link href="https://linkedin.com">
              {ECHOPAY_SVG().linkedinLogo()}
            </Link>
          </div>
        </div>
        <div className="flex gap-[100px] w-[45%] pt-[1rem]">
          <div className="flex flex-col gap-[20px]">
            <p className="font-[600] text-[16px] leading-[101%] text-[#FBFCFE]">
              Company
            </p>
            <div className="flex flex-col gap-[16px]">
              <Link
                className="font-[500] text-[15px] leading-[101%] text-[#575B61]"
                href="/how-we-work"
              >
                How it works
              </Link>
              <Link
                className="font-[500] text-[15px] leading-[101%] text-[#575B61]"
                href="/about"
              >
                About us
              </Link>
            </div>
          </div>
          <div className="flex flex-col gap-[20px]">
            <p className="font-[600] text-[16px] leading-[101%] text-[#FBFCFE]">
              Misc
            </p>
            <div className="flex flex-col gap-[16px]">
              <Link
                className="font-[500] text-[15px] leading-[101%] text-[#575B61]"
                href="https://"
              >
                Send us a mail
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-end justify-between mt-[180px]">
        <div className="flex flex-col gap-[16px]">
          <p className="font-[600] text-[16px] leading-[110.00000000000001%] text-[#FBFCFE]">
            Subscribe to our Newsletter
          </p>
          <form className="flex items-center bg-white rounded-[8px] w-[545px] p-[8px]">
            <input
              type="email"
              placeholder="Yourmail@mail.com"
              className="w-full px-4 py-3 text-sm text-gray-600 placeholder-[#9CA7BD] placeholder:text-[14px] placeholder:leading-[100%] placeholder:font-grotesk placeholder:font-[500] focus:outline-none"
            />
            <button
              type="submit"
              className="bg-[#002EE9] w-[143px] text-white px-[17px] py-[19px] text-[14px] font-[500] leading-[100%] rounded-[8px]"
            >
              Submit
            </button>
          </form>
        </div>
        <div className="flex flex-col items-end gap-[5px]">
          <Link href="/home">{ECHOPAY_SVG().footerLogo()}</Link>
          <p className="font-[500] text-[14px] leading-[101%] text-[#575B61] font-display">
            ECHOPAY 2025
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
