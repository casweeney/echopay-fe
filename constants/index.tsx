import { ECHOPAY_SVG } from "@/assets/svgs";
import { TabsProps, SideTabsProps } from "@/lib/types";

export const TABS: TabsProps[] = [
  {
    name: "How we work",
    link: "/how-we-work",
  },
  {
    name: "About Us",
    link: "/about",
  },
];

export const MENUTABS: SideTabsProps[] = [
  {
    icon: ECHOPAY_SVG().analyticsIcon({
      className: "w-[18px] h-[18px] lg:w-[24px] lg:h-[24px]",
    }),
    name: "Analytics",
    link: "/analytics",
  },
  // {
  //   icon: ECHOPAY_SVG().linkIcon({
  //     className: "w-[18px] h-[18px] lg:w-[24px] lg:h-[24px]",
  //   }),
  //   name: "Payment Links",
  //   link: "/payment-links",
  // },
  {
    icon: ECHOPAY_SVG().walletIcon({
      className: "w-[18px] h-[18px] lg:w-[24px] lg:h-[24px]",
    }),
    name: "Wallet",
    link: "/wallet",
  },
  {
    icon: ECHOPAY_SVG().tnxIcon({
      className: "w-[18px] h-[18px] lg:w-[24px] lg:h-[24px]",
    }),
    name: "Transactions",
    link: "/transactions",
  },
  // {
  //   icon: ECHOPAY_SVG().invoiceIcon({
  //     className: "w-[18px] h-[18px] lg:w-[24px] lg:h-[24px]",
  //   }),
  //   name: "Invoices",
  //   link: "/invoices",
  // },
  {
    icon: ECHOPAY_SVG().groupIcon({
      className: "w-[18px] h-[18px] lg:w-[24px] lg:h-[24px]",
    }),
    name: "Customers",
    link: "/customers",
  },
];

export const SETTINGTABS: SideTabsProps[] = [
  {
    icon: ECHOPAY_SVG().searchListIcon({
      className: "w-[18px] h-[18px] lg:w-[24px] lg:h-[24px]",
    }),
    name: "Audit Logs",
    link: "/audit-logs",
  },
  {
    icon: ECHOPAY_SVG().settingsIcon({
      className: "w-[18px] h-[18px] lg:w-[24px] lg:h-[24px]",
    }),
    name: "Settings",
    link: "/settings",
  },
];
