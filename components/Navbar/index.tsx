"use client";

import { useState, useEffect } from "react";

import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

import Link from "next/link";
import Image from "next/image";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
      className={`w-full fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-sm" : "bg-[#FFFFFF1A]"
      }`}>
      <div className="max-w-[85rem] mx-auto px-4 sm:px-3 lg:px-2">
        <div className="flex items-center justify-between h-24">
          <div className="flex items-center gap-4">
            {/* Logo */}
            <Link
              href="#"
              className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Image
                src="/logo.svg"
                width={20}
                height={20}
                alt="logo"
                className="w-28 h-28"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <Link
                href="#"
                className="text-sm text-[#0D0714] font-[500] hover:text-gray-600 transition-colors">
                How we work
              </Link>
              <Link
                href="#"
                className="text-sm text-[#0D0714] font-[500] hover:text-gray-600 transition-colors">
                About Us
              </Link>
            </div>
          </div>
          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-6">
            <Button
              asChild
              className="bg-[#F4F4F5] text-[#18181B] border border-[#F2F3F6] hover:bg-[#F4F4F5] rounded-[8px] py-6 px-6">
              <Link href="#">Log In</Link>
            </Button>
            <Button
              asChild
              className="bg-[#F48210] text-[#18181B] hover:bg-[#F48210] rounded-[8px] py-6 px-6">
              <Link href="#">Create a free Account</Link>
            </Button>
          </div>
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-[#0D0714] hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Toggle menu">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 bg-white">
            <div className="flex flex-col gap-4">
              <Link
                href="#"
                className="text-sm text-[#0D0714] hover:text-gray-600 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}>
                How we work
              </Link>
              <Link
                href="#"
                className="text-sm text-[#0D0714] hover:text-gray-600 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}>
                About Us
              </Link>
              <Link
                href="#"
                className="text-sm text-[#0D0714] hover:text-gray-600 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}>
                Log In
              </Link>
              <Button
                asChild
                className="bg-[#0D0714] text-white hover:bg-gray-800 rounded-full w-full">
                <Link href="#" onClick={() => setIsMenuOpen(false)}>
                  Create a free Account
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
