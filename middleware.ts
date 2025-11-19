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
  // "/verify-email",
  // "/verification-success",
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

// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// export function middleware(req: NextRequest) {
//   const { pathname } = req.nextUrl;

//   // COOKIES YOU MUST SET FROM BACKEND / FRONTEND AFTER EACH VERIFICATION STEP
//   const userToken = req.cookies.get("userToken")?.value ?? null;
//   const emailVerified = req.cookies.get("emailVerified")?.value === "true";
//   const bvnVerified = req.cookies.get("bvnVerified")?.value === "true";
//   const businessStatus = req.cookies.get("businessStatus")?.value;
//   const verificationSuccessSeen =
//     req.cookies.get("verificationSuccessSeen")?.value === "true";

//   const isLoggedIn = Boolean(userToken);

//   // ROUTE GROUPS
//   const dashboardRoutes = [
//     "/analytics",
//     "/audit-logs",
//     "/customers",
//     "/invoices",
//     "/payment-links",
//     "/settings",
//     "/transactions",
//     "/wallet",
//     "/create-disbursement",
//   ];

//   const authRoutes = ["/login", "/register"];
//   const verifyEmailRoute = "/verify-email";
//   const verifyBVNRoute = "/verify-bvn";
//   const verifyBusinessRoute = "/verify-business";
//   const verificationSuccessRoute = "/verification-success";

//   // =============== AUTH ROUTES ===============
//   if (authRoutes.includes(pathname)) {
//     if (isLoggedIn) {
//       return NextResponse.redirect(new URL("/analytics", req.url));
//     }
//     return NextResponse.next();
//   }

//   if (pathname === verifyEmailRoute) {
//     if (!isLoggedIn) {
//       return NextResponse.redirect(new URL("/analytics", req.url));
//     }
//     return NextResponse.next();
//   }

//   // =============== REQUIRE LOGIN FOR DASHBOARD ROUTES ===============
//   if (dashboardRoutes.includes(pathname)) {
//     if (!isLoggedIn) {
//       return NextResponse.redirect(new URL("/login", req.url));
//     }
//     return NextResponse.next();
//   }

//   // =============== EMAIL NOT VERIFIED ===============
//   if (!emailVerified) {
//     // Only allow access to verify-email
//     if (pathname !== verifyEmailRoute) {
//       return NextResponse.redirect(new URL("/verify-email", req.url));
//     }

//     // Logged-in users should not access login/register
//     if (authRoutes.includes(pathname)) {
//       return NextResponse.redirect(new URL("/verify-email", req.url));
//     }

//     return NextResponse.next();
//   }

//   // =============== EMAIL VERIFIED ===============

//   // Prevent verified users from re-accessing verify-email
//   if (pathname === verifyEmailRoute) {
//     if (isLoggedIn) {
//       return NextResponse.redirect(new URL("/analytics", req.url));
//     }
//     return NextResponse.redirect(new URL("/login", req.url));
//   }

//   // Prevent re-accessing verification success page
//   if (pathname === verificationSuccessRoute && verificationSuccessSeen) {
//     if (isLoggedIn)
//       return NextResponse.redirect(new URL("/analytics", req.url));
//     return NextResponse.redirect(new URL("/login", req.url));
//   }

//   // =============== BVN VERIFICATION ===============
//   if (pathname === verifyBVNRoute) {
//     if (!isLoggedIn) {
//       return NextResponse.redirect(new URL("/login", req.url));
//     }
//     if (bvnVerified) {
//       return NextResponse.redirect(new URL("/wallet", req.url));
//     }
//     return NextResponse.next();
//   }

//   // =============== BUSINESS VERIFICATION ===============
//   if (pathname === verifyBusinessRoute) {
//     if (!isLoggedIn) {
//       return NextResponse.redirect(new URL("/login", req.url));
//     }

//     // Only allow when REJECTED
//     if (businessStatus !== "rejected") {
//       return NextResponse.redirect(new URL("/wallet", req.url));
//     }

//     return NextResponse.next();
//   }

//   return NextResponse.next();
// }
