"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import type { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { getAuthToken } from "@/utils/token";
import { decodeJWT } from "@/utils/jwt";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const { token } = useSelector((state: RootState) => state.auth);
  const { user } = useSelector((state: RootState) => state.user);
  const { bvnStatus } = useSelector((state: RootState) => state.bvn);
  const { verificationStatus } = useSelector(
    (state: RootState) => state.business
  );

  const recentlyVerified =
    typeof window !== "undefined"
      ? localStorage.getItem("emailVerifiedRecently")
      : null;

  // ✅ Compute these normally — no need for memo
  const isEmailVerified = Boolean(user?.data?.user?.email_verified_at);
  const isBvnVerified = bvnStatus?.data?.bvn_verified === true;
  const isBusinessVerified = verificationStatus?.data?.status === "verified";

  useEffect(() => {
    const handleProtectedRoute = async () => {
      const jwt = getAuthToken();

      // 1️⃣ EMAIL VERIFICATION LOGIC
      if ((jwt || token) && !isEmailVerified) {
        const decoded = jwt ? decodeJWT(jwt) : null;

        if (decoded?.email) {
          localStorage.setItem("pendingEmail", decoded.email);
        }

        if (pathname !== "/verify-email") {
          router.replace("/verify-email");
          return;
        }
      }

      if (isEmailVerified && pathname === "/verify-email") {
        router.replace(token ? "/analytics" : "/login");
        return;
      }

      if (pathname === "/verification-success" && !recentlyVerified) {
        router.replace("/login");
        return;
      }

      // 2️⃣ BVN / BUSINESS VERIFICATION RULES

      // ❌ Cannot access verify-business if BVN is NOT verified
      if (!isBvnVerified && pathname === "/verify-business") {
        router.replace("/wallet");
        return;
      }

      // ❌ Cannot access create-disbursement if business NOT verified
      if (!isBusinessVerified && pathname === "/create-disbursement") {
        router.replace("/wallet");
        return;
      }

      // ❌ If both verified → block both verification pages
      if (isBvnVerified && isBusinessVerified) {
        if (pathname === "/verify-bvn" || pathname === "/verify-business") {
          router.replace("/wallet");
          return;
        }
      }
    };

    handleProtectedRoute();
  }, [
    token,
    pathname,
    router,
    recentlyVerified,
    isEmailVerified,
    isBvnVerified,
    isBusinessVerified,
  ]);

  return <>{children}</>;
}
