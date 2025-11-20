"use client";

import React, { useEffect, useCallback, useMemo, useState } from "react";
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
  fetchCurrentBusiness,
  switchBusiness,
} from "@/redux/features/business/businessSlice";
import { fetchWallets } from "@/redux/features/wallet/walletSlice";

const Sidebar = () => {
  const pathname = usePathname() || "/";
  const { isOpen, closeSidebar } = useSidebar();
  const dispatch = useDispatch<AppDispatch>();

  const { business, businesses } = useSelector(
    (state: RootState) => state.business
  );
  const [bizId, setBizId] = useState<string>("");

  useEffect(() => {
    if (businesses?.length > 0 && business?.id) {
      setBizId(business.id);

      dispatch(fetchWallets(business.id));
    }
  }, [business?.id, businesses?.length, dispatch]);

  useEffect(() => {
    if (isOpen) {
      closeSidebar();
    }
  }, [pathname, isOpen, closeSidebar]);

  const handleSwitchBusiness = useCallback(
    async (value: string) => {
      const response = await dispatch(switchBusiness(value)).unwrap();

      if (response.status === "success") {
        const res = await dispatch(fetchCurrentBusiness()).unwrap();
        console.log("Switched business to:", res.data.id);
        setBizId(res.data.id);
        await dispatch(fetchWallets(res.data.id));
      }
    },
    [dispatch]
  );

  const isActive = useCallback(
    (link: string) =>
      link === "/" ? pathname === "/" : pathname.startsWith(link),
    [pathname]
  );

  const linkBase = useMemo(
    () =>
      "w-[168px] flex items-center gap-3 p-[8px] rounded-[4px] cursor-pointer transition-all",
    []
  );

  const mainMenuLinks = useMemo(
    () =>
      MENUTABS.map((tab) => {
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
      }),
    [isActive, linkBase]
  );

  const settingLinks = useMemo(
    () =>
      SETTINGTABS.map((tab) => {
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
      }),
    [isActive, linkBase]
  );

  return (
    <>
      {/* 🖥️ Desktop Sidebar */}
      <div className="w-[200px] hidden flex-col lg:flex">
        <div className="mb-6">
          <Link href="/">{ECHOPAY_SVG().logo({ width: 120, height: 40 })}</Link>
        </div>

        <div className="mb-8">
          <Select
            value={bizId || business?.id}
            onValueChange={handleSwitchBusiness}
          >
            <SelectTrigger className="w-[168px] border rounded-[4px] p-[8px] border-[#D9D9D9] focus:ring-0 focus:ring-offset-0">
              <SelectValue>
                {(() => {
                  const selectedBiz = businesses.find(
                    (biz) => biz?.id === (bizId || business?.id)
                  );
                  return selectedBiz ? (
                    <div className="flex items-center space-x-2">
                      <div>{ECHOPAY_SVG().shopIcon()}</div>
                      <span className="text-[14px] font-[400] leading-[20px] tracking-[0.25px] text-[#010721]">
                        {selectedBiz.name}
                      </span>
                    </div>
                  ) : (
                    <span>Select a business</span>
                  );
                })()}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
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
            <nav className="flex flex-col gap-1">{mainMenuLinks}</nav>
          </div>

          <div>
            <p className="text-[11px] font-medium text-[#010721] leading-[16px] tracking-[0.5px] mb-2 align-middle">
              SYSTEM
            </p>
            <nav className="flex flex-col gap-1">{settingLinks}</nav>
          </div>
        </div>
      </div>

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
          <Select
            name="business"
            defaultValue={bizId || business?.id}
            onValueChange={handleSwitchBusiness}
          >
            <SelectTrigger className="w-[168px] border rounded-[4px] p-[8px] border-[#D9D9D9] focus:ring-0 focus:outline-0 ">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
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
            <p className="text-[10px] lg:text-[11px] font-medium text-[#010721] leading-[16px] tracking-[0.5px] mb-2 align-middle">
              MAIN MENU
            </p>
            <nav className="flex flex-col gap-1">{mainMenuLinks}</nav>
          </div>

          <div>
            <p className="text-[10px] lg:text-[11px] font-medium text-[#010721] leading-[16px] tracking-[0.5px] mb-2 align-middle">
              SYSTEM
            </p>
            <nav className="flex flex-col gap-1">{settingLinks}</nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
