"use client";

import type React from "react";
import { ArrowRight } from "lucide-react";

interface ReusableModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: () => void;
  children?: React.ReactNode;
  buttonText?: string;
  showButton?: boolean;
  closeOnBackdropClick?: boolean;
}

export function ReusableModal({
  isOpen,
  onClose,
  onSubmit,
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

      <div className="fixed top-0 inset-0 flex items-center justify-center p-4 z-50 pointer-events-none">
        <div className="bg-white h-full rounded-2xl max-w-2xl w-full p-8 shadow-lg pointer-events-auto animate-modal-pop my-8 flex flex-col overflow-y-auto">
          {children}
          {showButton && (
            <button
              onClick={onSubmit}
              className="w-full py-[16px] h-[56px] rounded-[12px] font-medium text-[14px] leading-[20px] tracking-[0.25px] align-middle flex items-center justify-center gap-2 transition-all bg-[#0046A7] text-white cursor-pointer mt-4"
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
