"use client";

import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { ECHOPAY_SVG } from "@/assets/svgs";
import { Separator } from "@/components/ui/separator";
import { useSidebar } from "@/context/SidebarContext";
import { MenuIcon, X } from "lucide-react";
import Link from "next/link";
import { logout } from "@/redux/features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { getInitials } from "@/utils/nameInitial";
import { redirect, useRouter } from "next/navigation";
import { fetchUser } from "@/redux/features/user/userSlice";
import {
  fetchBusinesses,
  fetchCurrentBusiness,
} from "@/redux/features/business/businessSlice";
import SessionExpiredModal from "@/components/SessionExpiredModal";

const Header = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.user);

  const [open, setOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const { toggleSidebar } = useSidebar();

  useEffect(() => {
    function isExpiredToken() {
      setShowModal(true);
      dispatch(logout());
      redirect("/login");
    }

    if (!user?.data?.token_expires_at) return;

    const expiryTimestamp = user.data.token_expires_at; // in SECONDS
    const nowInSeconds = Math.floor(Date.now() / 1000);

    const secondsLeft = expiryTimestamp - nowInSeconds;
    console.log("Token expires in:", secondsLeft, "seconds");

    const myTimeout = setTimeout(() => {
      isExpiredToken();
    }, secondsLeft * 1000);

    if (user.data.token_expires_at !== undefined) {
      setTimeout(() => {
        isExpiredToken();
      }, secondsLeft * 1000);
    } else {
      return () => clearTimeout(myTimeout);
    }
  }, [user?.data?.token_expires_at]);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setOpen(false);
    }
  }, []);

  useEffect(() => {
    dispatch(fetchUser());
    dispatch(fetchBusinesses());
    dispatch(fetchCurrentBusiness());
  }, [dispatch]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handleClickOutside]);

  useEffect(() => {
    if (searchOpen && searchRef.current) {
      setTimeout(() => searchRef.current?.focus(), 150);
    }
  }, [searchOpen]);

  const fullName = useMemo(() => user?.data?.user?.name || "User", [user]);
  const firstName = useMemo(() => fullName.split(" ")[0], [fullName]);
  const initials = useMemo(() => getInitials(fullName), [fullName]);

  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
  };

  return (
    <>
      {showModal && <SessionExpiredModal />}
      <div className="border-b border-[#E0E0E0] px-4 lg:px-[24px] py-3 lg:py-[16px] flex justify-between items-center gap-2 lg:gap-0">
        {/* Left section */}
        <div className="flex items-end gap-2 lg:gap-0">
          <Link href="/" className="lg:hidden">
            <img
              src="/smallLogo.svg"
              alt="menu"
              className="w-[22px] h-[22px]"
            />
          </Link>
          <div className="text-[13px] lg:text-base">Hello, {firstName}</div>
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

          {/* Mobile search button */}
          <button
            onClick={() => setSearchOpen(true)}
            className="lg:hidden text-[#010721] w-8 h-8 lg:w-[40px] lg:h-[40px] border border-[#E0E0E0] rounded-[40px] flex items-center justify-center flex-shrink-0"
          >
            {ECHOPAY_SVG().searchIcon({
              className: "w-[18px] h-[18px] lg:w-[24px] lg:h-[24px]",
            })}
          </button>

          {/* Notification icon */}
          <div className="w-8 h-8 lg:w-[40px] lg:h-[40px] border border-[#E0E0E0] rounded-[40px] flex items-center justify-center flex-shrink-0">
            {ECHOPAY_SVG().bellIcon({
              className: "w-[18px] h-[18px] lg:w-[24px] lg:h-[24px]",
            })}
          </div>

          {/* Separator */}
          <Separator
            orientation="vertical"
            className="hidden lg:block border-l border-[#E0E0E0] h-[32px]"
          />

          {/* Mobile menu icon */}
          <button
            onClick={toggleSidebar}
            className="lg:hidden text-[#010721] w-8 h-8 lg:w-[40px] lg:h-[40px] border border-[#E0E0E0] rounded-[40px] flex items-center justify-center flex-shrink-0"
          >
            <MenuIcon size={18} />
          </button>

          {/* Profile dropdown */}
          <div
            className="relative hidden lg:inline-block text-left"
            ref={dropdownRef}
          >
            <button
              onClick={() => setOpen((prev) => !prev)}
              className="flex items-center gap-1"
            >
              <div className="flex items-center justify-center text-[14px] w-9 h-9 rounded-full bg-[#0046A7] text-white font-semibold">
                {initials}
              </div>
              <div className="hidden lg:block">
                {ECHOPAY_SVG().chevronDown({
                  className: "w-[18px] h-[18px] lg:w-[20px] lg:h-[20px]",
                })}
              </div>
            </button>

            {open && (
              <div className="absolute right-0 mt-2 w-48 rounded-lg border border-gray-200 bg-white shadow-lg z-50">
                <ul className="py-2 text-sm text-gray-700">
                  <li>
                    <Link
                      href="/settings"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Settings
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left block px-4 py-2 hover:bg-gray-100 text-red-500"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* 🔍 Mobile Search Modal */}
        {searchOpen && (
          <div
            className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex flex-col items-center transition-opacity duration-300 animate-fadeIn"
            onClick={() => setSearchOpen(false)}
          >
            <div
              className="bg-white w-[90%] mt-8 p-3 rounded-[40px] flex items-center gap-2 shadow-md transition-all duration-300 animate-slideDown"
              onClick={(e) => e.stopPropagation()}
            >
              <div>
                {ECHOPAY_SVG().searchIcon({
                  className: "w-[18px] h-[18px] lg:w-[24px] lg:h-[24px]",
                })}
              </div>
              <input
                ref={searchRef}
                type="text"
                placeholder="Search"
                className="font-instrument flex-1 text-[#1D1B20] border-0 px-2 py-1 focus-visible:ring-0 focus:outline-none text-[14px] bg-transparent placeholder:text-[#010721] placeholder:font-instrument"
              />
              <button
                onClick={() => setSearchOpen(false)}
                className="text-[#010721] hover:bg-[#f0f0f0] p-1 rounded"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
