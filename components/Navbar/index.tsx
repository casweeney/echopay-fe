"use client";

import { useState, useEffect } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { TABS } from "@/constants";
import { ECHOPAY_SVG } from "@/assets/svgs";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`w-full h-[96px] md:h-[96px] sm:h-20 ${
        isScrolled ? "fixed" : "relative"
      } top-0 left-0 right-0 z-50 transition-all duration-300 font-inter bg-[#FFFDFA80] backdrop-blur-sm`}
    >
      <div className="max-w-[79rem] mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity flex-shrink-0"
          >
            {ECHOPAY_SVG().resolvaOne()}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-4 lg:gap-8 items-center">
            {TABS.map((tab, key) => (
              <Link
                key={key}
                href={tab.link}
                className="text-[#010721] font-medium text-xs sm:text-sm lg:text-base tracking-[-0.6%] align-middle hover:opacity-80 transition-opacity"
              >
                {tab.name}
              </Link>
            ))}
            <Link
              href="/login"
              className="text-[#0046A7] font-semibold text-xs sm:text-sm lg:text-base tracking-[-0.6%] align-middle hover:opacity-80 transition-opacity"
            >
              Sign in
            </Link>
            <Link
              href="/register"
              className="bg-[#0046A7] hover:shadow-[0px_2px_7px_2px_rgba(0,84,140,0.75)] transition-all h-10 md:h-14 rounded-lg md:rounded-[12px] py-2 md:py-[10px] px-4 md:px-6 lg:px-[24px] flex gap-2 md:gap-[12px] items-center text-white font-medium text-xs sm:text-sm lg:text-base tracking-[-0.15px] flex-shrink-0"
            >
              Get Started
              <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-[#010721]" />
            ) : (
              <Menu className="w-6 h-6 text-[#010721]" />
            )}
          </button>
        </div>
      </div>

      <div
        className={`fixed top-24 sm:top-20 right-0 h-screen w-full bg-white shadow-lg transform transition-transform duration-300 ease-in-out md:hidden z-40 ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col p-4 sm:p-6 gap-4 sm:gap-6">
          {TABS.map((tab, key) => (
            <Link
              key={key}
              href={tab.link}
              className="text-[#010721] font-medium text-sm tracking-[-0.6%] hover:opacity-70 transition-opacity py-2 border-b border-gray-100"
              onClick={handleNavClick}
            >
              {tab.name}
            </Link>
          ))}
          <Link
            href="/login"
            className="text-[#0046A7] font-semibold text-sm tracking-[-0.6%] hover:opacity-70 transition-opacity py-2 border-b border-gray-100"
            onClick={handleNavClick}
          >
            Sign In
          </Link>
          <Link
            href="/register"
            className="bg-[#0046A7] rounded-lg py-3 sm:py-4 px-6 flex gap-3 items-center justify-center text-white font-medium text-sm tracking-[-0.15px] hover:opacity-90 transition-opacity mt-2 sm:mt-4"
            onClick={handleNavClick}
          >
            Get Started
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-30 top-24 sm:top-20"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </nav>
  );
}
