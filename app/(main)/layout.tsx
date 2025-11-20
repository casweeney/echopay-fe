"use client";
import { ReactNode } from "react";
import { Providers } from "../providers";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function MainAppLayout({ children }: { children: ReactNode }) {
  return (
    <Providers>
      <ProtectedRoute>{children}</ProtectedRoute>
    </Providers>
  );
}
