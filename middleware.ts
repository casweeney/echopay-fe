import { NextResponse } from "next/server";

const protectedRoutes = [
  "/analytics",
  "/audit-logs",
  "/customers",
  "/invoices",
  "/payment-links",
  "/settings",
  "/transactions",
  "/wallet",
  "/verify-business",
  "/verify-bvn",
  "/verify-email",
  "/verification-success",
  "create-disbursement",
];

const publicRoutes = ["/login", "/register"];

export default function middleware(req: any) {
  const sessionStatus = req.cookies.get("userToken");
  if (!sessionStatus && protectedRoutes.includes(req.nextUrl.pathname)) {
    const absoluteURL = new URL("/login", req.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }

  const isPublicRoute = publicRoutes.some(
    (route) => req.nextUrl.pathname === route
  );
  if (isPublicRoute && sessionStatus) {
    return NextResponse.redirect(new URL("/analytics", req.nextUrl.origin));
  }
}
