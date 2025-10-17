"use client";

import type React from "react";

import { useState } from "react";

export default function VerificationInput() {
  const [codes, setCodes] = useState(["", "", "", "", "", ""]);
  const [resendTimer, setResendTimer] = useState(0);

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

  const handleResendCode = () => {
    setResendTimer(30);
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

  return (
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
              onChange={(e) => handleCodeChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-14 lg:h-14 border border-[#8C8C8C] rounded-[8px] text-center text-base font-instrument font-normal focus:outline-none focus:border-[#0046A7] focus:border-2 transition-colors"
            />
          ))}
        </div>
      </div>

      {/* Resend Code */}
      <div className="text-sm text-[#8C8C8C] font-instrument font-medium">
        Didn&#39;t receive the code?{" "}
        <button
          onClick={handleResendCode}
          disabled={resendTimer > 0}
          className="text-[#0046A7] font-medium hover:underline disabled:text-[#8C8C8C] disabled:cursor-not-allowed"
        >
          Resend Code {resendTimer > 0 ? `(${resendTimer} seconds)` : ""}
        </button>
        .
      </div>
    </div>
  );
}
