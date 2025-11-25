import type { Metadata } from "next";
import { DM_Sans, Roboto, Instrument_Sans, Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Slide, ToastContainer } from "react-toastify";
import ProtectedRoute from "@/components/ProtectedRoute";

export const metadata: Metadata = {
  title: "Echopay",
};

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"], // Choose your weights
  display: "swap",
  variable: "--font-dm-sans",
});

const roboto = Roboto({
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-roboto",
  display: "swap",
});

const instrumentSans = Instrument_Sans({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-instrument-sans",
  display: "swap",
});

const inter = Inter({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${roboto.variable} ${instrumentSans.variable} ${inter.variable}`}
    >
      <body>
        <Providers>
          <ProtectedRoute>{children}</ProtectedRoute>
          <ToastContainer hideProgressBar transition={Slide} />
        </Providers>
      </body>
    </html>
  );
}
