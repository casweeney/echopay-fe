"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import type { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { getAuthToken } from "@/utils/token";
import { decodeJWT } from "@/utils/jwt";
import { fetchUser } from "@/redux/features/user/userSlice";
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
  const dispatch = useDispatch<AppDispatch>();
  const recentlyVerified =
    typeof window !== "undefined"
      ? localStorage.getItem("emailVerifiedRecently")
      : null;

  useEffect(() => {
    const handleProtectedRoute = async () => {
      const jwt = getAuthToken();
      await dispatch(fetchUser()).unwrap();
      console.log(user);

      if (jwt) {
        // If email not verified
        if (token && !user?.email_verified_at) {
          const decoded = decodeJWT(jwt);

          if (decoded?.email) {
            localStorage.setItem("pendingEmail", decoded.email);
          }

          router.push("/verify-email");
        } else if ((!token || !isAuthenticated) && !user?.email_verified_at) {
          router.push("/login");
        } else if (pathname === "/verify-email" && user) {
          router.push("/analytics");
        }
      } else {
        // Not logged in
        if (pathname.startsWith("/analytics")) {
          router.push("/login");
        }
      }

      // ======= RULE 1: Unregistered users cannot access verify-email or dashboard =======
      if (
        !user?.created_at &&
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
      if (user?.email_verified_at && pathname === "/verify-email") {
        if (isAuthenticated || token) {
          router.replace("/analytics"); // logged in + verified → dashboard
        } else if (!isAuthenticated || !token) {
          router.replace("/login"); // verified but not logged in → login
        }
        return;
      }

      // ======= RULE 3: Logged-in users cannot access register/login/verify-email =======
      if (
        (isAuthenticated || token) &&
        user?.email_verified_at &&
        ["/login", "/register", "/verify-email"].includes(pathname)
      ) {
        router.replace("/analytics");
        return;
      }

      // ======= RULE 4: Unauthenticated verified users cannot access dashboard =======
      if (
        (!isAuthenticated || !token) &&
        (pathname.startsWith("/analytics") ||
          pathname.startsWith("/audit-logs") ||
          pathname.startsWith("/customers") ||
          pathname.startsWith("/invoices") ||
          pathname.startsWith("/payment-links") ||
          pathname.startsWith("/settings") ||
          pathname.startsWith("/transactions") ||
          pathname.startsWith("/wallet") ||
          pathname.startsWith("/verify-business")) &&
        user?.email_verified_at
      ) {
        router.replace("/login");
        return;
      }

      // ======= RULE 5: Email verification success page =======
      if (pathname === "/verification-success") {
        // If user has not just verified email or not logged in
        if (!recentlyVerified) {
          router.push("/login");
          return;
        }
      }
    };

    handleProtectedRoute();
  }, [token, pathname, router, dispatch, isAuthenticated, recentlyVerified]);

  return <>{children}</>;
}
