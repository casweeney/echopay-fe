import React from "react";
import Header from "./components/Header";
import { Providers } from "@/app/providers";

export const metadata = {
  title: "Verify Business - Resolva",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <div className="font-instrument">
        <Header />
        <main className="overflow-auto p-[24px]">{children}</main>
      </div>
    </Providers>
  );
}
