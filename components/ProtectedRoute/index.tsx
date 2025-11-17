"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import type { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { getAuthToken } from "@/utils/token";
import { decodeJWT } from "@/utils/jwt";

const PROTECTED_ROUTES = [
  "/analytics",
  "/audit-logs",
  "/customers",
  "/invoices",
  "/payment-links",
  "/settings",
  "/transactions",
  "/wallet",
  "/verify-business",
];

const PUBLIC_ROUTES = ["/login", "/register", "/"];

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, token } = useSelector(
    (state: RootState) => state.auth
  );
  const { user } = useSelector((state: RootState) => state.user);
  console.log("ProtectedRoute user:", user?.email_verified_at);
  const dispatch = useDispatch<AppDispatch>();

  const [isAuthVerified, setIsAuthVerified] = useState(false);

  const recentlyVerified =
    typeof window !== "undefined"
      ? localStorage.getItem("emailVerifiedRecently")
      : null;

  useEffect(() => {
    const handleProtectedRoute = async () => {
      const jwt = getAuthToken();

      // Determine if this is a protected route
      const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
        pathname.startsWith(route)
      );
      const isPublicRoute = PUBLIC_ROUTES.includes(pathname);

      try {
        // ======= RULE 1: Unauthenticated users cannot access protected routes =======
        if (isProtectedRoute && !jwt && !token) {
          router.replace("/login");
          return;
        }

        // ======= RULE 2: If email not verified, redirect to verify-email =======
        if (jwt && token && !user?.email_verified_at) {
          const decoded = decodeJWT(jwt);
          if (decoded?.email) {
            localStorage.setItem("pendingEmail", decoded.email);
          }

          if (pathname !== "/verify-email") {
            router.replace("/verify-email");
            return;
          }
        }

        // ======= RULE 3: Verified users cannot access verify-email again =======
        if (user?.email_verified_at && pathname === "/verify-email") {
          if (token) {
            router.replace("/analytics");
            return;
          } else {
            router.replace("/login");
            return;
          }
        }

        // ======= RULE 4: Logged-in verified users cannot access register/login =======
        if (
          token &&
          user?.email_verified_at &&
          ["/login", "/register"].includes(pathname)
        ) {
          router.replace("/analytics");
          return;
        }

        // ======= RULE 5: Unauthenticated verified users cannot access dashboard =======
        if (!token && isProtectedRoute && user?.email_verified_at) {
          router.replace("/login");
          return;
        }

        // ======= RULE 6: Email verification success page =======
        if (pathname === "/verification-success") {
          if (!recentlyVerified) {
            router.replace("/login");
            return;
          }
        }

        setIsAuthVerified(true);
      } catch (error) {
        console.error("[v0] Route protection error:", error);
        router.replace("/login");
      }
    };

    handleProtectedRoute();
  }, [
    token,
    pathname,
    router,
    dispatch,
    isAuthenticated,
    recentlyVerified,
    user,
  ]);

  // For public routes (login, register, home), render immediately
  // For protected routes, wait for verification
  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);
  if (!isPublicRoute && !isAuthVerified) {
    return null;
  }

  return <>{children}</>;
}
