import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"], // Choose your weights
  display: "swap",
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: "ECHOPAY",
  description:
    "We provide everything you need to collect and disburse payments across multiple entities.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={dmSans.variable}>
      <body>{children}</body>
    </html>
  );
}
