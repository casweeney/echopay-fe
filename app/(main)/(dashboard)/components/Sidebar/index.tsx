"use client";

import { ECHOPAY_SVG } from "@/assets/svgs";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MENUTABS, SETTINGTABS } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Sidebar = () => {
  const pathname = usePathname() || "/";

  // helper to decide active state.
  // - For root ("/") require exact match.
  // - For other links, mark active if pathname startsWith link (good for nested routes)
  const isActive = (link: string) => {
    if (link === "/") return pathname === "/";
    return pathname.startsWith(link);
  };

  // shared link classes
  const linkBase =
    "w-[168px] flex items-center gap-3 p-[8px] rounded-[4px] cursor-pointer transition-all";

  return (
    <div className="w-[200px] flex flex-col">
      <div className="mb-6">
        <Link href="/">{ECHOPAY_SVG().logo({ width: 120, height: 40 })}</Link>
      </div>

      <div className="mb-8">
        <Select defaultValue="myBusiness">
          <SelectTrigger className="w-[168px] border rounded-[4px] p-[8px] border-[#D9D9D9] focus:ring-0 focus:outline-0 ">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="myBusiness">
                <div className="flex items-center space-x-2">
                  <div>{ECHOPAY_SVG().shopIcon()}</div>
                  <span className="text-[14px] font-[400] leading-[20px] tracking-[0.25px] text-[#010721]">
                    My Business
                  </span>
                </div>
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div>
        <div className="mb-8">
          <p className="text-[11px] font-medium text-[#010721] leading-[16px] tracking-[0.5px] mb-2 align-middle">
            MAIN MENU
          </p>
          <nav className="flex flex-col gap-1">
            {MENUTABS.map((tab) => {
              const active = isActive(tab.link);
              return (
                <Link
                  key={tab.name}
                  href={tab.link}
                  className={`${linkBase} ${
                    active ? "bg-[#D9F0FF]" : "hover:bg-[#D9F0FF]"
                  }`}
                >
                  <div>{tab.icon}</div>
                  <span className="text-[14px] font-[400] leading-[20px] tracking-[0.25px] text-[#010721]">
                    {tab.name}
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div>
          <p className="text-[11px] font-medium text-[#010721] leading-[16px] tracking-[0.5px] mb-2 align-middle">
            SYSTEM
          </p>
          <nav className="flex flex-col gap-1">
            {SETTINGTABS.map((tab) => {
              const active = isActive(tab.link);
              return (
                <Link
                  key={tab.name}
                  href={tab.link}
                  className={`${linkBase} ${
                    active ? "bg-[#D9F0FF]" : "hover:bg-[#D9F0FF]"
                  }`}
                >
                  <div>{tab.icon}</div>
                  <span className="text-[14px] font-[400] leading-[20px] tracking-[0.25px] text-[#010721]">
                    {tab.name}
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
