"use client";

import { ECHOPAY_SVG } from "@/assets/svgs";
import Link from "next/link";
import { TABS } from "@/constants";
import { useNavbarScroll } from "@/hooks/use-navbar-scroll";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const { isScrolled } = useNavbarScroll();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className={cn(
          // Base styles
          "fixed bg-white/20 backdrop-blur-md top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
          "flex items-center justify-between h-[80px] px-4 sm:px-6 lg:px-[28px]",
          // Conditional styles based on scroll state
          isScrolled ? "bg-white/20 backdrop-blur-md" : "bg-white/20"
        )}
      >
        <div className="flex items-center gap-4 lg:gap-[16px]">
          <div>
            <Link href={"/home"} className="block">
              {ECHOPAY_SVG().logo()}
            </Link>
          </div>
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-[16px]">
            {TABS.map((tab, index) => (
              <Link
                key={index}
                href={tab.link}
                className={cn(
                  "text-[15px] leading-[130%] font-[500] tracking-[-1%] transition-colors duration-200 hover:text-[#F48210]"
                )}
              >
                {tab.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Desktop Buttons */}
        <div className="hidden lg:flex items-center gap-[16px]">
          <button
            className={cn(
              "text-[15px] leading-[130%] font-[500] px-[20px] py-[14px] rounded-[8px] tracking-[-1%] bg-[#F8F8FE] text-[#000001] hover:bg-[#F0F0FC] transition-colors"
            )}
          >
            Log In
          </button>
          <button
            className={cn(
              "text-[15px] leading-[130%] font-[500] px-[20px] py-[14px] rounded-[8px] tracking-[-1%] bg-[#F48210] text-[#18181B] hover:bg-[#E5750E] transition-colors"
            )}
          >
            Create a free Account
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="lg:hidden p-2 rounded-md hover:bg-white/10 transition-colors"
          aria-label="Toggle mobile menu"
        >
          <Menu className="h-6 w-6" />
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-black/50 z-[60] transition-opacity duration-300 lg:hidden",
          isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={closeMobileMenu}
      />

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed top-0 left-0 h-full w-full bg-white z-[70] transform transition-transform duration-300 ease-in-out lg:hidden",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <Link href={"/home"} onClick={closeMobileMenu}>
              {ECHOPAY_SVG().logo()}
            </Link>
            <button
              onClick={closeMobileMenu}
              className="p-2 rounded-md hover:bg-gray-100 transition-colors"
              aria-label="Close mobile menu"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Mobile Navigation Links */}
          <div className="flex flex-col p-4 space-y-4 flex-1">
            {TABS.map((tab, index) => (
              <Link
                key={index}
                href={tab.link}
                onClick={closeMobileMenu}
                className="text-lg font-[500] py-3 px-2 rounded-md hover:bg-gray-50 transition-colors"
              >
                {tab.name}
              </Link>
            ))}
          </div>

          {/* Mobile Buttons */}
          <div className="p-4 space-y-3 border-t">
            <button
              onClick={closeMobileMenu}
              className="w-full text-[15px] leading-[130%] font-[500] px-[20px] py-[14px] rounded-[8px] tracking-[-1%] bg-[#F8F8FE] text-[#000001] hover:bg-[#F0F0FC] transition-colors"
            >
              Log In
            </button>
            <button
              onClick={closeMobileMenu}
              className="w-full text-[15px] leading-[130%] font-[500] px-[20px] py-[14px] rounded-[8px] tracking-[-1%] bg-[#F48210] text-[#18181B] hover:bg-[#E5750E] transition-colors"
            >
              Create a free Account
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
