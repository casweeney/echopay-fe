"use client";

import { ECHOPAY_SVG } from "@/assets/svgs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/redux/store";
import {
  verifyEmail,
  resendEmailVerification,
} from "@/redux/features/auth/authSlice";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/components/ProtectedRoute";

const VerifyEmail = () => {
  const dispatch = useDispatch<AppDispatch>();
  // const { loading, error, message } = useSelector(
  //   (state: RootState) => state.auth
  // );

  const route = useRouter();

  const [codes, setCodes] = useState(["", "", "", "", "", ""]);
  const [resendTimer, setResendTimer] = useState(0);
  const [email, setEmail] = useState("");

  // 👇 Retrieve email from localStorage (after registration)
  useEffect(() => {
    const storedEmail = localStorage.getItem("verificationEmail");
    const pendingEmail = localStorage.getItem("pendingEmail");

    // Prefer storedEmail, fallback to pendingEmail, otherwise use empty string
    if (storedEmail || pendingEmail) {
      setEmail(storedEmail ?? pendingEmail ?? "");
    }
  }, []);

  const handleCodeChange = (index: number, value: string) => {
    if (value.length > 1) return;
    if (!/^\d*$/.test(value)) return;

    const newCodes = [...codes];
    newCodes[index] = value;
    setCodes(newCodes);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !codes[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleResendCode = async () => {
    setResendTimer(30);
    await dispatch(resendEmailVerification({ email }));
    const interval = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();

    const code = codes.join("");

    const response = await dispatch(verifyEmail({ email, code })).unwrap();
    if (response && response.status === "success") {
      localStorage.removeItem("verificationEmail");
      localStorage.removeItem("pendingEmail");
      if (typeof window !== "undefined") {
        localStorage.setItem("emailVerifiedRecently", "true");
      }
      route.push("/verification-success");
    }
  };
  return (
    <ProtectedRoute>
      <div className="min-h-screen flex mx-auto">
        {/* Left Side - Dark Navy */}
        <div className="hidden z-50 w-full lg:w-1/2 relative lg:flex bg-[url('/bg-4.png')] h-full bg-cover bg-no-repeat text-white px-12 py-[10rem] flex-col">
          <div className="max-w-[500px] mx-auto">
            {/* Logo */}
            <Link href="/home">
              <div className="mb-[4.5rem]">
                <img src="/logo_2.png" alt="logo" className="w-[170px]" />
              </div>
            </Link>

            {/* Main Content */}
            <div className="flex-1 flex flex-col justify-center">
              <h1 className="text-[43px] font-normal leading-[100%] tracking-[0%] mb-3 font-londrina">
                Fast & Secure
              </h1>
              <p className="text-[1.2rem] text-[#FFFEF8] mb-10 font-roboto tracking-[0.05em]">
                Fast, secure, and reliable.
              </p>

              {/* Hero Image */}
              <div className="mb-10 rounded-2xl overflow-hidden">
                <img
                  src="/pill2.png"
                  alt="Crystal spheres with light rays"
                  className="w-full h-auto object-cover"
                />
              </div>

              {/* Feature Cards */}
              <div className="space-y-6">
                <div className="flex items-center gap-2 bg-[#00193633] rounded-full p-4 backdrop-blur-sm shadow border-[0.5px] border-x-0 border-slate-500">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full border-2 border-white flex items-center justify-center">
                    {ECHOPAY_SVG().icon1()}
                  </div>
                  <p className="text-[15px] leading-relaxed font-roboto">
                    Echopay uses top-tier security across every disbursement
                    route.
                  </p>
                </div>

                <div className="flex items-center gap-2 bg-[#00193633] rounded-full p-4 backdrop-blur-sm shadow border-[0.5px] border-x-0 border-slate-500">
                  <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center">
                    {ECHOPAY_SVG().icon2()}
                  </div>
                  <p className="text-[15px] leading-relaxed font-roboto">
                    You focus on your payments — we&#39;ll handle the safety
                    net.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full lg:w-1/2 bg-[#f8f8f8] py-[5.5rem] px-12 lg:p-12 flex items-center justify-center relative">
          <div className="block lg:hidden absolute top-0 left-0 right-0 h-4 bg-[#0046A7]"></div>
          <div className="w-full max-w-md">
            {/* Mobile Logo - Only visible on small screens */}
            <Link href="/home">
              <div className="lg:hidden mb-[5rem] flex justify-center">
                <img src="/logo.svg" alt="logo" className="w-[120px]" />
              </div>
            </Link>

            {/* Form Header */}
            <div className="mb-8">
              <h2 className="text-[28px] md:text-[34px] lg:text-[34px] font-medium text-[#010721] mb-2 font-roboto">
                Verify Your Email
              </h2>
              <p className="text-[#010721] text-[14px] font-instrument font-normal">
                A 6-digit code has been sent to your email address
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleVerify} className="space-y-8">
              <div className="space-y-6">
                {/* Code Input Section */}
                <div className="space-y-3">
                  <label className="block text-sm font-normal text-[#010721] font-instrument">
                    Enter Verification Code
                  </label>
                  <div className="flex gap-3 justify-between">
                    {codes.map((code, index) => (
                      <input
                        key={index}
                        id={`code-${index}`}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={code}
                        onChange={(e) =>
                          handleCodeChange(index, e.target.value)
                        }
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-14 lg:h-14 border border-[#8C8C8C] rounded-[8px] text-center text-base font-instrument font-normal focus:outline-none focus:border-[#0046A7] focus:border-2 transition-colors"
                      />
                    ))}
                  </div>
                </div>

                {/* Resend Code */}
                <div className="text-[12px] md:text-[14px] lg:text-[14px] text-[#8C8C8C] font-instrument font-medium">
                  Didn&#39;t receive the code?{" "}
                  <button
                    onClick={handleResendCode}
                    disabled={resendTimer > 0}
                    className="text-[#0046A7] font-medium hover:underline disabled:text-[#8C8C8C] disabled:cursor-not-allowed"
                  >
                    Resend Code{" "}
                    {resendTimer > 0 ? `(${resendTimer} seconds)` : ""}
                  </button>
                  .
                </div>
              </div>

              <Button
                type="submit"
                //   disabled={!isStep4Valid()}
                className="w-full h-14 bg-[#0046A7] text-[#FFFEF8] rounded-lg text-base font-medium mt-8 font-instrument hover:bg-[#0046A7] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue
              </Button>
            </form>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default VerifyEmail;
