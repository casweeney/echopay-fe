import React from "react";
import LoginUI from "./loginUI";
import ProtectedRoute from "@/components/ProtectedRoute";

export default async function LoginPage() {
  return (
    <ProtectedRoute>
      <LoginUI />
    </ProtectedRoute>
  );
}
