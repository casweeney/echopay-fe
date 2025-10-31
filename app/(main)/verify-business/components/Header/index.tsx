"use client";

import { useState, useRef, useEffect } from "react";
import { ECHOPAY_SVG } from "@/assets/svgs";
import { Separator } from "@/components/ui/separator";
import { MenuIcon, X } from "lucide-react";
import Link from "next/link";

const Header = () => {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Focus search input when opened
  useEffect(() => {
    if (searchOpen && searchRef.current) {
      searchRef.current.focus();
    }
  }, [searchOpen]);

  return (
    <div className="border-b border-[#E0E0E0] px-4 lg:px-[24px] py-3 lg:py-[16px] flex justify-between items-center gap-2 lg:gap-0">
      {/* Left section */}
      <div className="flex items-center gap-2">
        <Link href="/">{ECHOPAY_SVG().logo({ width: 120, height: 40 })}</Link>
        {/* <img src="/leftPanel.svg" alt="" /> */}
      </div>

      {/* Right section */}
      <div className="flex items-center gap-2 lg:gap-8">
        {/* Search bar - hidden on mobile, shown on desktop */}
        <div className="hidden lg:flex border border-[#E0E0E0] rounded-[40px] p-[8px] items-center">
          <div>
            {ECHOPAY_SVG().searchIcon({
              className: "w-[18px] h-[18px] lg:w-[24px] lg:h-[24px]",
            })}
          </div>
          <input
            type="text"
            id="searchBar"
            name="searchBar"
            placeholder="Search"
            className="font-instrument w-[178px] text-[#1D1B20] border-0 px-2 py-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-none focus:ring-0 focus:outline-0 text-[14px] bg-transparent placeholder:text-[#010721] placeholder:font-instrument"
          />
        </div>

        {/* Mobile search toggle */}
        {searchOpen ? (
          <div className="lg:hidden flex border border-[#E0E0E0] rounded-[40px] p-[8px] items-center gap-2">
            <div>
              {ECHOPAY_SVG().searchIcon({
                className: "w-[18px] h-[18px] lg:w-[24px] lg:h-[24px]",
              })}
            </div>
            <input
              ref={searchRef}
              type="text"
              placeholder="Search"
              className="font-instrument w-[120px] text-[#1D1B20] border-0 px-1 py-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-none focus:ring-0 focus:outline-0 text-[14px] bg-transparent placeholder:text-[#010721] placeholder:font-instrument"
            />
            <button
              onClick={() => setSearchOpen(false)}
              className="text-[#010721] hover:bg-[#f0f0f0] p-1 rounded"
            >
              <X size={16} />
            </button>
          </div>
        ) : (
          <button
            onClick={() => setSearchOpen(true)}
            className="lg:hidden text-[#010721] w-8 h-8 lg:w-[40px] lg:h-[40px] border border-[#E0E0E0] rounded-[40px] flex items-center justify-center flex-shrink-0"
          >
            {ECHOPAY_SVG().searchIcon({
              className: "w-[18px] h-[18px] lg:w-[24px] lg:h-[24px]",
            })}
          </button>
        )}

        {/* Notification icon - smaller on mobile */}
        <div className="w-8 h-8 lg:w-[40px] lg:h-[40px] border border-[#E0E0E0] rounded-[40px] flex items-center justify-center flex-shrink-0">
          {ECHOPAY_SVG().bellIcon({
            className: "w-[18px] h-[18px] lg:w-[24px] lg:h-[24px]",
          })}
        </div>

        {/* Separator - hidden on mobile */}
        <Separator
          orientation="vertical"
          className="hidden lg:block border-l border-[#E0E0E0] h-[32px]"
        />

        {/* Profile dropdown */}
        <div
          className="relative hidden lg:inline-block text-left"
          ref={dropdownRef}
        >
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2"
          >
            <img
              src="/user_img.png"
              alt="Profile"
              className="object-cover lg:w-[40px] lg:h-[40px] w-8 h-8 rounded-full"
            />
            <div className="hidden lg:block">
              {ECHOPAY_SVG().chevronDown({
                className: "w-[18px] h-[18px] lg:w-[24px] lg:h-[24px]",
              })}
            </div>
          </button>

          {open && (
            <div className="absolute right-0 mt-2 w-48 rounded-lg border border-gray-200 bg-white shadow-lg z-50">
              <ul className="py-2 text-sm text-gray-700">
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                    Profile
                  </a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                    Settings
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100 text-red-500"
                  >
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
