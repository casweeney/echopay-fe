"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import type { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const { token } = useSelector((state: RootState) => state.auth);
  const { bvnStatus } = useSelector((state: RootState) => state.bvn);
  const { verificationStatus } = useSelector(
    (state: RootState) => state.business
  );

  const isBvnVerified = bvnStatus?.data?.bvn_verified === true;
  const isBusinessVerified = verificationStatus?.data?.status === "verified";
  const isBusinessInreview = verificationStatus?.data?.status === "in_review";

  useEffect(() => {
    const handleProtectedRoute = async () => {
      if (!isBvnVerified && pathname === "/verify-business") {
        router.replace("/wallet");
        return;
      }

      if (!isBusinessVerified && pathname === "/create-disbursement") {
        router.replace("/wallet");
        return;
      }

      if ((isBusinessVerified || isBusinessInreview) && isBvnVerified) {
        if (pathname === "/verify-bvn" || pathname === "/verify-business") {
          router.replace("/wallet");
          return;
        }
      }
    };

    handleProtectedRoute();
  }, [token, pathname, router, isBvnVerified, isBusinessVerified]);

  return <>{children}</>;
}
