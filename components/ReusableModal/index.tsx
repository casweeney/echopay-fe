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
        className="fixed inset-0 bg-black/50 z-40 animate-fade-in-overlay"
        onClick={handleBackdropClick}
      />

      <div className="fixed inset-0 flex items-center justify-center p-4 z-50 pointer-events-none">
        <div className="bg-white rounded-2xl max-w-2xl w-full p-8 shadow-lg pointer-events-auto animate-modal-pop my-8">
          {/* Header with close button */}
          <div className="flex items-start justify-between mb-6">
            <h2 className="text-3xl font-bold text-foreground">{title}</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors"
              aria-label="Close modal"
            >
              <X size={28} />
            </button>
          </div>

          {/* Description */}
          {description && (
            <p className="text-gray-600 text-base leading-relaxed mb-8">
              {description}
            </p>
          )}

          {/* Custom content */}
          {children}

          {/* Submit button */}
          {showButton && (
            <button
              onClick={onSubmit}
              className="w-full py-4 rounded-lg font-semibold text-lg flex items-center justify-center gap-2 transition-all bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
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
