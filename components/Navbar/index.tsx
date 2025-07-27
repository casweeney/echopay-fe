import { ECHOPAY_SVG } from "@/assets/svgs";
import Link from "next/link";
import React from "react";
import { TABS } from "@/constants";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between h-[80px] px-[28px]">
      <div className="flex items-center gap-[16px]">
        <div>
          <Link href={"/home"} className="">
            {ECHOPAY_SVG().logo()}
          </Link>
        </div>
        <div className="flex items-center gap-[16px]">
          {TABS.map((tab, index) => (
            <Link
              key={index}
              href={tab.link}
              className="text-[15px] leading-[130%] font-[500] tracking-[-1%]"
            >
              {tab.name}
            </Link>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-[16px]">
        <button className="bg-[#F8F8FE] text-[#000001] text-[15px] leading-[130%] font-[500] px-[20px] py-[14px] rounded-[8px] tracking-[-1%]">
          Log In
        </button>
        <button className="bg-[#000000] text-[#EFEFF5] text-[15px] leading-[130%] font-[500] px-[20px] py-[14px] rounded-[8px] tracking-[-1%]">
          Create a free Account
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
