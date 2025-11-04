// src/components/ProtectedRoute.tsx
"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import type { RootState } from "@/redux/store";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const {
    loading,
    error,
    message,
    isAuthenticated,
    isRegistered,
    isVerified,
    token,
  } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    // ======= RULE 1: Unregistered users cannot access verify-email or dashboard =======
    if (
      !isRegistered &&
      (pathname === "/verify-email" ||
        pathname.startsWith("/analytics") ||
        pathname.startsWith("/audit-logs") ||
        pathname.startsWith("/customers") ||
        pathname.startsWith("/invoices") ||
        pathname.startsWith("/payment-links") ||
        pathname.startsWith("/settings") ||
        pathname.startsWith("/transactions") ||
        pathname.startsWith("/wallet") ||
        pathname.startsWith("/verify-business"))
    ) {
      router.replace("/register");
      return;
    }

    // ======= RULE 2: Verified users cannot access verify-email again =======
    if (isVerified && pathname === "/verify-email") {
      if (token) {
        router.replace(
          "/analytics" ||
            "audit-logs" ||
            "/analytics" ||
            "/audit-logs" ||
            "/customers" ||
            "/invoices" ||
            "/payment-links" ||
            "/settings" ||
            "/transactions" ||
            "/wallet" ||
            "/verify-business"
        ); // logged in + verified → dashboard
      } else {
        router.replace("/login"); // verified but not logged in → login
      }
      return;
    }

    // ======= RULE 3: Logged-in users cannot access register/login/verify-email =======
    if (token && ["/login", "/register", "/verify-email"].includes(pathname)) {
      router.replace(
        "/analytics" ||
          "audit-logs" ||
          "/analytics" ||
          "/audit-logs" ||
          "/customers" ||
          "/invoices" ||
          "/payment-links" ||
          "/settings" ||
          "/transactions" ||
          "/wallet" ||
          "/verify-business"
      );
      return;
    }

    // ======= RULE 4: Unauthenticated verified users cannot access dashboard =======
    if (
      !token &&
      (pathname.startsWith("/analytics") ||
        pathname.startsWith("/audit-logs") ||
        pathname.startsWith("/customers") ||
        pathname.startsWith("/invoices") ||
        pathname.startsWith("/payment-links") ||
        pathname.startsWith("/settings") ||
        pathname.startsWith("/transactions") ||
        pathname.startsWith("/wallet") ||
        pathname.startsWith("/verify-business")) &&
      isVerified
    ) {
      router.replace("/login");
      return;
    }
  }, [token, isRegistered, isVerified, pathname, router]);

  return <>{children}</>;
}
