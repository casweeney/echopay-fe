"use client";

import { useState, useRef, useEffect } from "react";
import { ECHOPAY_SVG } from "@/assets/svgs";
import Image from "next/image";
import React from "react";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default function Header() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicked outside
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

  return (
    <header className="border-b border-[#E0E0E0] px-[24px] py-[16px] flex justify-between items-center">
      <div className="flex items-center gap-2">
        <Link href="/">{ECHOPAY_SVG().logo({ width: 120, height: 40 })}</Link>
        <img src="/leftPanel.svg" alt="" />
      </div>
      <div className="flex items-center gap-8">
        <div className="border border-[#E0E0E0] rounded-[40px] p-[8px] flex items-center">
          <div>{ECHOPAY_SVG().searchIcon()}</div>
          <input
            type="text"
            id="searchBar"
            name="searchBar"
            placeholder="Search"
            // value={formData.businessName}
            // onChange={handleInputChange}
            className="font-instrument w-[178PX] text-[#1D1B20] border-0 px-2 py-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-none focus:ring-0 focus:outline-0 text-[14px] bg-transparent placeholder:text-[#010721] placeholder:font-instrument"
          />
        </div>
        <div className="w-[40px] h-[40px] border border-[#E0E0E0] rounded-[40px] flex items-center justify-center">
          {ECHOPAY_SVG().bellIcon()}
        </div>
        <Separator
          orientation="vertical"
          className="border-l border-[#E0E0E0] h-[32px]"
        />
        <div className="relative inline-block text-left" ref={dropdownRef}>
          {/* Dropdown Trigger */}
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2"
          >
            <Image
              src="/user_img.png"
              alt="Profile"
              width={40}
              height={40}
              className="object-cover"
            />
            {ECHOPAY_SVG().chevronDown()}
          </button>

          {/* Dropdown Menu */}
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
    </header>
  );
}
