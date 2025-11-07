"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ECHOPAY_SVG } from "@/assets/svgs";
import { MENUTABS, SETTINGTABS } from "@/constants";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSidebar } from "@/context/SidebarContext";
import { X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/redux/store";
import {
  fetchBusinesses,
  fetchCurrentBusiness,
} from "@/redux/features/business/businessSlice";

const Sidebar = () => {
  const pathname = usePathname() || "/";
  const { isOpen, closeSidebar } = useSidebar();

  const dispatch = useDispatch<AppDispatch>();

  // 👇 get user from store
  const { user } = useSelector((state: RootState) => state.user);

  // 👇 get businesses from store
  const { business, businesses, loading, error } = useSelector(
    (state: RootState) => state.business
  );

  console.log(businesses[0]);
  console.log(business);

  useEffect(() => {
    const handleBusiness = async () => {
      if (user) {
        await dispatch(fetchBusinesses());
        await dispatch(fetchCurrentBusiness());
      }
    };

    handleBusiness();
  }, [dispatch, user]);

  // Close sidebar automatically when navigating to a new route
  useEffect(() => {
    closeSidebar();
  }, [pathname, closeSidebar]);

  const isActive = (link: string) => {
    if (link === "/") return pathname === "/";
    return pathname.startsWith(link);
  };

  const linkBase =
    "w-[168px] flex items-center gap-3 p-[8px] rounded-[4px] cursor-pointer transition-all";

  return (
    <>
      {/* 🖥️ Desktop Sidebar */}
      <div className="w-[200px] hidden flex-col lg:flex">
        <div className="mb-6">
          <Link href="/">{ECHOPAY_SVG().logo({ width: 120, height: 40 })}</Link>
        </div>

        <div className="mb-8">
          <Select defaultValue={business?.id}>
            <SelectTrigger className="w-[168px] border rounded-[4px] p-[8px] border-[#D9D9D9] focus:ring-0 focus:outline-0 ">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {loading && (
                  <SelectItem value="loading" disabled>
                    Loading businesses...
                  </SelectItem>
                )}
                {error && (
                  <SelectItem value="error" disabled>
                    Failed to load
                  </SelectItem>
                )}
                {businesses.map((biz) => (
                  <SelectItem key={biz?.id} value={biz?.id}>
                    <div className="flex items-center space-x-2">
                      <div>{ECHOPAY_SVG().shopIcon()}</div>
                      <span className="text-[14px] font-[400] leading-[20px] tracking-[0.25px] text-[#010721]">
                        {biz?.name}
                      </span>
                    </div>
                  </SelectItem>
                ))}
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
                    <div>{tab.icon as React.ReactNode}</div>
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
                    <div>{tab.icon as React.ReactNode}</div>
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

      {/* <button onClick={toggleSidebar} className="lg:hidden">
        <img src="/smallLogo.svg" alt="menu" className="w-[24px] h-[24px]" />
      </button> */}

      {/* 📱 Mobile Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 z-40 lg:hidden transition-opacity duration-300 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={closeSidebar}
      />

      {/* 📱 Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-[200px] bg-white shadow-lg z-50 p-4 transition-transform duration-300 lg:hidden
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="mb-6 flex justify-between items-center">
          <Link href="/">{ECHOPAY_SVG().logo({ width: 120, height: 40 })}</Link>
          <button onClick={closeSidebar} className="lg:hidden">
            <X size={16} />
          </button>
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
                    <div>
                      {ECHOPAY_SVG().shopIcon({
                        className: "w-[18px] h-[18px] lg:w-[24px] lg:h-[24px]",
                      })}
                    </div>
                    <span className="text-[12px] lg:text-[14px] font-[400] leading-[20px] tracking-[0.25px] text-[#010721]">
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
            <p className="text-[10px] lg:text-[11px] font-medium text-[#010721] leading-[16px] tracking-[0.5px] mb-2 align-middle">
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
                    <div>{tab.icon as React.ReactNode}</div>
                    <span className="text-[12px] lg:text-[14px] font-[400] leading-[20px] tracking-[0.25px] text-[#010721]">
                      {tab.name}
                    </span>
                  </Link>
                );
              })}
            </nav>
          </div>

          <div>
            <p className="text-[10px] lg:text-[11px] font-medium text-[#010721] leading-[16px] tracking-[0.5px] mb-2 align-middle">
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
                    <div>{tab.icon as React.ReactNode}</div>
                    <span className="text-[12px] lg:text-[14px] font-[400] leading-[20px] tracking-[0.25px] text-[#010721]">
                      {tab.name}
                    </span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
