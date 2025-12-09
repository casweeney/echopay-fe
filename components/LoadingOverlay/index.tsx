"use client";

import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { selectGlobalLoading } from "@/redux/selectors/loadingSelector";

export default function LoadingOverlay({
  parentRef,
}: {
  parentRef: React.RefObject<HTMLDivElement>;
}) {
  const loading = useSelector(selectGlobalLoading);
  const [overlayStyle, setOverlayStyle] = useState<React.CSSProperties>({});

  useEffect(() => {
    if (!loading || !parentRef.current) return;

    const update = () => {
      const rect = parentRef.current!.getBoundingClientRect();

      setOverlayStyle({
        position: "fixed",
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
        pointerEvents: "none",
      });
    };

    update();
    window.addEventListener("scroll", update, true);
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", update, true);
      window.removeEventListener("resize", update);
    };
  }, [loading, parentRef]);

  if (!loading) return null;

  return (
    <div
      style={overlayStyle}
      className="z-[99] bg-white/20 backdrop-blur-[5px] flex items-center justify-center"
    >
      <div className="h-8 w-8 animate-spin-fast rounded-full border-[4px] border-[#0046A7] border-t-transparent" />
    </div>
  );
}
