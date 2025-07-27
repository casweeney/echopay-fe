import type { Metadata } from "next";
import "./globals.css";
import "@/assets/fonts/Clash_Grotesk/Clash Grotesk/Fonts/WEB/css/clash-grotesk.css";
import "@/assets/fonts/Clash_Display/Clash Display/Fonts/WEB/css/clash-display.css";

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
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
