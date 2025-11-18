"use client";

import { useSelector } from "react-redux";
import { selectGlobalLoading } from "@/redux/selectors/loadingSelector";
import { useEffect, useState, useRef } from "react";
import { applyMinDelay } from "@/utils/applyDelay";

export default function LoadingOverlay() {
  const loading = useSelector(selectGlobalLoading);
  const [visible, setVisible] = useState(false);
  const lastChangeRef = useRef<number>(Date.now());

  useEffect(() => {
    let cancelled = false;

    const showOverlay = async () => {
      if (loading) {
        setVisible(true);
        lastChangeRef.current = Date.now();
      } else {
        const elapsed = Date.now() - lastChangeRef.current;
        const remaining = Math.max(0, 4000 - elapsed); // ensure 4s min delay
        await new Promise((res) => setTimeout(res, remaining));
        if (!cancelled) setVisible(false);
      }
    };

    showOverlay();

    return () => {
      cancelled = true;
    };
  }, [loading]);

  if (!visible) return null;

  return (
    <div className="absolute inset-0 z-[9999] bg-white/10 backdrop-blur-[3px] flex items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-[4px] border-[#0046A7] border-t-transparent" />
    </div>
  );
}
