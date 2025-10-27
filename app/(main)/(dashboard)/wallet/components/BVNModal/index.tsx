"use client";

import type React from "react";

import { useState } from "react";
import { X, ArrowRight, CheckCircle2, Circle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ECHOPAY_SVG } from "@/assets/svgs";

interface BVNModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (bvn: string) => void;
  title?: string;
  description?: string;
  buttonText?: string;
}

export function BVNModal({
  isOpen,
  onClose,
  onSubmit,
  title = "Connect Your Bank Verification Number",
  description = "We need your bank verification to create a virtual bank account for your business. You will be able to fund your wallet and start disbursing funds after your BVN is connected.",
  buttonText = "Connect Your BVN",
}: BVNModalProps) {
  const [bvn, setBvn] = useState("");

  // Validation rules
  const isNumbersOnly = /^\d*$/.test(bvn);
  const isExactly11Chars = bvn.length === 11;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow numbers and max 11 characters
    if (/^\d*$/.test(value) && value.length <= 11) {
      setBvn(value);
    }
  };

  const handleSubmit = () => {
    if (isExactly11Chars && isNumbersOnly) {
      onSubmit?.(bvn);
      setBvn("");
    }
  };

  const handleClose = () => {
    setBvn("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 animate-fade-in-overlay"
        onClick={handleClose}
      />

      <div className="fixed inset-0 flex items-center justify-center p-4 z-50 pointer-events-none">
        <div className="bg-white rounded-2xl max-w-2xl w-full p-8 shadow-lg pointer-events-auto animate-modal-pop my-8">
          {/* Header with close button */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[22px] font-[500] leading-[28px] align-middle tracking-[0px] text-[#010721]">
              {title}
            </h2>
            <button
              onClick={handleClose}
              className="text-[#010721] transition-colors"
              aria-label="Close modal"
            >
              <X size={28} />
            </button>
          </div>

          {/* Description */}
          <p className="text-[#404040] font-normal text-base leading-[24px] tracking-[0.5px] mb-6">
            {description}
          </p>

          {/* Input field */}

          <div className="mb-6">
            <fieldset className="group border border-[#828783] rounded-lg px-2 py-0 focus-within:ring-[1.5px] hover:border-[#3b3b3b] focus-within:ring-[#0046A7] transition-all">
              <legend className="group-focus-within:text-[#0046A7] font-[400] bg-[#f8f8f8] text-[#010721] px-1 text-[12px] leading-[100%] font-instrument">
                Bank Verification Number
              </legend>
              <Input
                type="text"
                id="bvn"
                name="bvn"
                value={bvn}
                onChange={handleInputChange}
                placeholder="Enter your BVN"
                className="font-instrument text-[#1D1B20] border-0 px-2 pb-4 pt-2 h-auto focus-visible:ring-0 focus-visible:ring-offset-0 text-[15px] bg-transparent placeholder:text-[#828783] placeholder:font-instrument"
                maxLength={11}
              />
            </fieldset>
          </div>

          {/* Validation checklist */}
          <div className="border border-[#E2E2E2] rounded-[8px] p-[12px] mb-8">
            <p className="text-[14px] font-medium leading-[20px] tracking-[0.1px] text-[#010721] mb-4">
              Your BVN should be:
            </p>
            <div className="space-y-3">
              {/* 11 characters check */}
              <div className="flex items-center gap-3">
                {isExactly11Chars ? (
                  <div>{ECHOPAY_SVG().fillCheck()}</div>
                ) : (
                  <div>{ECHOPAY_SVG().circleOutline()}</div>
                )}
                <span
                  className={`text-[14px] font-normal leading-[20px] tracking-[0.25px] ${
                    isExactly11Chars ? "text-foreground" : "text-[#828783]"
                  }`}
                >
                  11 characters
                </span>
              </div>

              {/* Numbers only check */}
              <div className="flex items-center gap-3">
                {isNumbersOnly && bvn.length > 0 ? (
                  <div>{ECHOPAY_SVG().fillCheck()}</div>
                ) : (
                  <div>{ECHOPAY_SVG().fillCheck()}</div>
                )}
                <span className="text-[14px] text-[#010721] leading-[20px] tracking-[0.25px] font-normal">
                  {"Numbers (123...)"}
                </span>
              </div>
            </div>
          </div>

          {/* Submit button */}
          <button
            onClick={handleSubmit}
            disabled={!isExactly11Chars || !isNumbersOnly}
            className={`w-full h-[56px] rounded-[12px] font-medium text-[14px] leading-[20px] tracking-[0.25px] align-middle flex items-center justify-center gap-2 transition-all ${
              isExactly11Chars && isNumbersOnly
                ? "bg-[#0046A7] text-white cursor-pointer"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {buttonText}
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </>
  );
}
