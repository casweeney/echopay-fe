"use client";

import { ECHOPAY_SVG } from "@/assets/svgs";
import Link from "next/link";
import { TABS } from "@/constants";
import { useNavbarScroll } from "@/hooks/use-navbar-scroll";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const { isScrolled } = useNavbarScroll();

  return (
    <nav
      className={cn(
        // Base styles
        "fixed bg-white/20 backdrop-blur-md top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
        "flex items-center justify-between h-[80px] px-[28px]",
        // Conditional styles based on scroll state
        isScrolled ? "bg-white/20 backdrop-blur-md" : "bg-white/20"
      )}
    >
      <div className="flex items-center gap-[16px]">
        <div>
          <Link href={"/home"} className="block">
            {ECHOPAY_SVG().logo()}
          </Link>
        </div>
        <div className="flex items-center gap-[16px]">
          {TABS.map((tab, index) => (
            <Link
              key={index}
              href={tab.link}
              className={cn(
                "text-[15px] leading-[130%] font-[500] tracking-[-1%] transition-colors duration-200"
              )}
            >
              {tab.name}
            </Link>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-[16px]">
        <button
          className={cn(
            "text-[15px] leading-[130%] font-[500] px-[20px] py-[14px] rounded-[8px] tracking-[-1%] bg-[#F8F8FE] text-[#000001]"
          )}
        >
          Log In
        </button>
        <button
          className={cn(
            "text-[15px] leading-[130%] font-[500] px-[20px] py-[14px] rounded-[8px] tracking-[-1%] bg-[#F48210] text-[#18181B]"
          )}
        >
          Create a free Account
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
