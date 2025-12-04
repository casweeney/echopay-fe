"use client";

import { ECHOPAY_SVG } from "@/assets/svgs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/redux/store";
import {
  verifyEmail,
  resendEmailVerification,
} from "@/redux/features/auth/authSlice";
import { redirect, useRouter } from "next/navigation";
import { toast } from "react-toastify";

const VerifyEmailUI = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isVerifyEmailLoading } = useSelector(
    (state: RootState) => state.auth
  );
  const route = useRouter();

  const [codes, setCodes] = useState(["", "", "", "", "", ""]);
  const [resendTimer, setResendTimer] = useState(0);
  const [email, setEmail] = useState("");
  const [codeError, setCodeError] = useState("");

  useEffect(() => {
    const storedEmail = localStorage.getItem("verificationEmail");
    const pendingEmail = localStorage.getItem("pendingEmail");
    if (storedEmail || pendingEmail) {
      setEmail(storedEmail ?? pendingEmail ?? "");
    }
  }, []);

  const handleCodeChange = useCallback((index: number, value: string) => {
    // If the user pastes the full code or multiple digits
    if (value.length > 1) {
      const digits = value.replace(/\D/g, "").split("").slice(0, 6);

      if (digits.length > 0) {
        // Spread the pasted digits across the boxes
        setCodes((prev) => {
          const newCodes = [...prev];
          for (let i = 0; i < digits.length; i++) {
            if (index + i < 6) newCodes[index + i] = digits[i];
          }
          return newCodes;
        });

        // Move cursor to the last filled box
        const lastIndex = Math.min(index + digits.length - 1, 5);
        const nextInput = document.getElementById(`code-${lastIndex}`);
        nextInput?.focus();

        setCodeError("");
      }

      return; // stop further handling
    }

    // Normal typing (one digit)
    if (!/^\d*$/.test(value)) return;

    setCodes((prevCodes) => {
      const newCodes = [...prevCodes];
      newCodes[index] = value;
      return newCodes;
    });

    if (value && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      nextInput?.focus();
    }

    setCodeError("");
  }, []);

  const handleKeyDown = useCallback(
    (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Backspace" && !codes[index] && index > 0) {
        const prevInput = document.getElementById(`code-${index - 1}`);
        prevInput?.focus();
      }
    },
    [codes]
  );

  const handlePaste = useCallback(
    (index: number, e: React.ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault();

      const pasted = e.clipboardData.getData("text").replace(/\D/g, "");

      if (!pasted) return;

      setCodes((prev) => {
        const newCodes = [...prev];
        for (let i = 0; i < pasted.length && index + i < 6; i++) {
          newCodes[index + i] = pasted[i];
        }
        return newCodes;
      });

      // move focus to last filled input
      const last = Math.min(index + pasted.length - 1, 5);
      document.getElementById(`code-${last}`)?.focus();
    },
    []
  );

  const handleResendCode = useCallback(async () => {
    try {
      const response = await dispatch(
        resendEmailVerification({ email })
      ).unwrap();

      if (response.status === "success") {
        setResendTimer(30);
        toast(response.message, { type: "success" });
      }
      const interval = setInterval(() => {
        setResendTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (err: unknown) {
      if (typeof err === "object" && err !== null && "message" in err) {
        const message = String((err as { message: string }).message);

        if (
          message === "Cannot read properties of undefined (reading 'data')"
        ) {
          toast("Check your internet connection", { type: "error" });
          return;
        }
      }
      if (err === "Email already verified") {
        toast(err, { type: "error" });
        redirect("/login");
      }
    }
  }, [dispatch, email]);

  const handleVerify = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      const code = codes.join("");

      try {
        const response = await dispatch(verifyEmail({ email, code })).unwrap();

        if (response.status === "success") {
          if (typeof window !== "undefined") {
            localStorage.setItem("emailVerifiedRecently", "true");
          }
          route.push("/verification-success");
        }
      } catch (err: unknown) {
        // console.error("Email error:", err);

        if (typeof err === "object" && err !== null && "message" in err) {
          const message = String((err as { message: string }).message);

          if (
            message === "Cannot read properties of undefined (reading 'data')"
          ) {
            toast("Check your internet connection", { type: "error" });
            return;
          }
        } else if (err === "Validation failed") {
          toast("Please enter your verification code", { type: "error" });
          return;
        } else if (err === "Email already verified") {
          toast(err, { type: "error" });
          redirect("/login");
        } else if (err === "Code not found") {
          setCodeError("There may be a mistake in the code you entered.");
          return;
        }
      }
    },
    [codes, dispatch, email, route, setCodeError]
  );

  const codeInputs = useMemo(() => {
    return codes.map((code, index) => (
      <input
        key={index}
        id={`code-${index}`}
        type="text"
        inputMode="numeric"
        maxLength={1}
        value={code}
        onPaste={(e) => handlePaste(index, e)}
        onChange={(e) => handleCodeChange(index, e.target.value)}
        onKeyDown={(e) => handleKeyDown(index, e)}
        className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-14 lg:h-14 border border-[#8C8C8C] rounded-[8px] text-center text-base font-instrument font-normal ${
          codeError && "text-[#FF383C]"
        } focus:outline-none focus:border-[#0046A7]  focus:border-2 transition-colors`}
      />
    ));
  }, [codes, handleCodeChange, handleKeyDown, codeError]);

  return (
    <div className="min-h-screen flex mx-auto">
      {/* Left Section */}
      <div className="hidden z-50 w-full lg:w-1/2 relative lg:flex bg-[url('/bg-4.svg')] min-h-screen bg-cover bg-no-repeat text-white px-12 py-[10rem] flex-col">
        <div className="max-w-[500px] mx-auto">
          <Link href="/home">
            <div className="mb-[4.5rem]">{ECHOPAY_SVG().resolvaTwo()}</div>
          </Link>

          <div className="flex-1 flex flex-col justify-center">
            <h1 className="text-[24px] font-normal leading-[100%] tracking-[0%] mb-3 font-londrina">
              Fast & Secure
            </h1>
            <p className="text-[1rem] text-[#FFFEF8] mb-10 font-roboto tracking-[0.05em]">
              Fast, secure, and reliable.
            </p>

            {/* <div className="mb-10 rounded-2xl overflow-hidden">
              <img
                src="/pill2.png"
                alt="Crystal spheres with light rays"
                className="w-full h-auto object-cover"
              />
            </div> */}

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
                  You focus on your payments — we&#39;ll handle the safety net.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full lg:w-1/2 bg-[#f8f8f8] py-[5.5rem] px-12 lg:p-12 flex items-center justify-center relative">
        <div className="block lg:hidden absolute top-0 left-0 right-0 h-4 bg-[#0046A7]"></div>
        <div className="w-full max-w-md">
          <Link href="/home">
            <div className="lg:hidden mb-[5rem] flex justify-center">
              {ECHOPAY_SVG().resolvaOne()}
            </div>
          </Link>

          <div className="mb-8">
            <h2 className="text-[22px] md:text-[28px] lg:text-[28px] font-medium text-[#010721] mb-2 font-roboto">
              Verify Your Email
            </h2>
            <p className="text-[#010721] text-[14px] font-instrument font-normal">
              A 6-digit code has been sent to your email address
            </p>
          </div>

          <form onSubmit={handleVerify} className="space-y-8">
            <div className="space-y-6">
              <div className="space-y-3">
                <label className="block text-sm font-normal text-[#010721] font-instrument">
                  Enter Verification Code
                </label>
                <div className="flex gap-3 justify-between">{codeInputs}</div>
                <div className="flex gap-3 justify-between">
                  {codeError && (
                    <span className="text-[#FF383C] font-instrument text-base">
                      {codeError}
                    </span>
                  )}
                </div>
              </div>

              <div className="text-[12px] md:text-[14px] text-[#8C8C8C] font-instrument font-medium">
                Didn&#39;t receive the code?{" "}
                <button
                  type="button"
                  onClick={handleResendCode}
                  disabled={resendTimer > 0}
                  className="text-[#0046A7] font-medium hover:underline disabled:text-[#8C8C8C] disabled:cursor-not-allowed"
                >
                  Resend Code {resendTimer > 0 ? `(${resendTimer}s)` : ""}
                </button>
                .
              </div>
            </div>

            <Button
              type="submit"
              disabled={isVerifyEmailLoading}
              className="w-full h-14 bg-[#0046A7] text-[#FFFEF8] rounded-lg text-base font-medium mt-8 font-instrument hover:bg-[#0046A7] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isVerifyEmailLoading ? (
                <span className="h-5 w-5 animate-spin-fast border-2 border-white rounded-full border-t-transparent"></span>
              ) : (
                "Continue"
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailUI;
