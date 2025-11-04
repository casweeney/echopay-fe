import React from "react";
import Header from "./components/Header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="font-instrument">
      <Header />
      <main className="overflow-auto p-[24px]">{children}</main>
    </div>
  );
}
