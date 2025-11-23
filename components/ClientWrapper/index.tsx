"use client";

import { useRef } from "react";
import LoadingOverlay from "@/components/LoadingOverlay";
import ProtectedRoute from "@/components/ProtectedRoute";
import Sidebar from "@/app/(main)/(dashboard)/components/Sidebar";
import Header from "@/app/(main)/(dashboard)/components/Header";

export default function ClientDashboardWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const mainRef = useRef<HTMLDivElement>(null!);

  return (
    <div className="flex h-screen items-baseline overflow-hidden bg-[#F8F8F8] p-0 lg:p-6 font-instrument gap-2">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden border lg:border-[#CAC4D0] bg-white rounded-[12px] h-full">
        <Header />

        <main ref={mainRef} className="flex-1 overflow-auto relative">
          <ProtectedRoute>{children}</ProtectedRoute>
          <LoadingOverlay parentRef={mainRef} />
        </main>
      </div>
    </div>
  );
}
