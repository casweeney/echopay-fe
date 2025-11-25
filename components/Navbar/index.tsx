"use client";

import { useState, useEffect } from "react";

import { ArrowRight, Menu } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import Link from "next/link";
import Image from "next/image";
import { TABS } from "@/constants";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`w-full h-[96px] fixed top-0 left-0 right-0 z-50 transition-all duration-300 font-inter bg-[#FFFDFA80] backdrop-blur-sm`}
    >
      <div className="max-w-[79rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <Image
              src="/logo.svg"
              width={20}
              height={20}
              alt="logo"
              className="w-28 h-28"
            />
          </Link>

          <div className="flex gap-8 items-center">
            {TABS.map((tab, key) => (
              <Link
                key={key}
                href={tab.link}
                className="text-[#010721] font-medium text-sm tracking-[-0.6%] align-middle"
              >
                {tab.name}
              </Link>
            ))}
            <Link
              href="/login"
              className="text-[#0046A7] font-semibold text-sm tracking-[-0.6%] align-middle"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className="bg-[#0046A7] h-[56px] rounded-[12px] py-[10px] px-[24px] flex gap-[12px] items-center text-white font-medium text-sm tracking-[-0.15px]"
            >
              Get Started
              <ArrowRight className="w-[16px] h-[16px]" />
            </Link>
          </div>

          {/* Mobile Menu */}
          {/* <Sheet>
            <SheetTrigger asChild>
              <button
                className="md:hidden p-2 text-[#0D0714] hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Toggle menu"
              >
                <Menu size={24} />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] p-0">
              <div className="flex items-center justify-between px-6 border-none">
                <Image
                  src="/logo.svg"
                  width={120}
                  height={120}
                  alt="EchoPay Logo"
                  className="w-24 h-24"
                />
              </div>
              <div className="flex flex-col gap-6 p-6">
                <div className="flex flex-col gap-4">
                  <Link
                    href="#"
                    className="text-sm text-[#0D0714] hover:text-gray-600 transition-colors py-2 border-b border-gray-100"
                  >
                    How we work
                  </Link>
                  <Link
                    href="#"
                    className="text-sm text-[#0D0714] hover:text-gray-600 transition-colors py-2 border-b border-gray-100"
                  >
                    About Us
                  </Link>
                </div>
                <div className="flex flex-col gap-3 pt-4">
                  <Button
                    asChild
                    variant="outline"
                    className="w-full justify-start"
                  >
                    <Link href="/login">Log In</Link>
                  </Button>
                  <Button
                    asChild
                    className="w-full justify-start bg-[#F48210] text-[#18181B] hover:bg-[#F48210]"
                  >
                    <Link href="/register">Create a free Account</Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet> */}
        </div>
      </div>
    </nav>
  );
}
