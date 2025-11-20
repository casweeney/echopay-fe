"use client";

import { useSelector } from "react-redux";
import { selectGlobalLoading } from "@/redux/selectors/loadingSelector";

export default function LoadingOverlay() {
  const loading = useSelector(selectGlobalLoading);

  if (!loading) return null;

  return (
    <div className="absolute inset-0 z-[9999] bg-white/10 backdrop-blur-[8px] flex items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-[4px] border-[#0046A7] border-t-transparent" />
    </div>
  );
}
