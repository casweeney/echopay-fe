"use client";

import type React from "react";
import { X, ArrowRight } from "lucide-react";

interface ReusableModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: () => void;
  title: string;
  description?: string;
  children?: React.ReactNode;
  buttonText?: string;
  showButton?: boolean;
  closeOnBackdropClick?: boolean;
}

export function ReusableModal({
  isOpen,
  onClose,
  onSubmit,
  title,
  description,
  children,
  buttonText = "Submit",
  showButton = true,
  closeOnBackdropClick = true,
}: ReusableModalProps) {
  const handleBackdropClick = () => {
    if (closeOnBackdropClick) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 animate-fade-in-overlay"
        onClick={handleBackdropClick}
      />

      <div className="fixed inset-0 flex items-center justify-center p-4 z-50 pointer-events-none overflow-y-auto">
        <div className="bg-white mt-[20rem] rounded-2xl max-w-2xl w-full p-8 shadow-lg pointer-events-auto animate-modal-pop my-8 flex flex-col">
          {/* Header with close button */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[22px] leading-[28px] align-middle tracking-[0px] font-medium text-[#010721]">
              {title}
            </h2>
            <button
              onClick={onClose}
              className="text-[#131313] transition-colors"
              aria-label="Close modal"
            >
              <X size={28} />
            </button>
          </div>

          {/* Description */}
          {description && (
            <p className="text-[#404040] text-base tracking-[0.5px] mb-6">
              {description}
            </p>
          )}

          <div className="flex-1 overflow-y-auto">{children}</div>

          {/* Submit button */}
          {showButton && (
            <button
              onClick={onSubmit}
              className="w-full h-[56px] rounded-[12px] font-medium text-[14px] leading-[20px] tracking-[0.25px] align-middle flex items-center justify-center gap-2 transition-all bg-[#0046A7] text-white cursor-pointer mt-4"
            >
              {buttonText}
              <ArrowRight size={20} />
            </button>
          )}
        </div>
      </div>
    </>
  );
}
