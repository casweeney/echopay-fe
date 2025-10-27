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
    icon: ECHOPAY_SVG().analyticsIcon(),
    name: "Analytics",
    link: "/analytics",
  },
  {
    icon: ECHOPAY_SVG().linkIcon(),
    name: "Payment Links",
    link: "/payment-links",
  },
  {
    icon: ECHOPAY_SVG().walletIcon(),
    name: "Wallet",
    link: "/wallet",
  },
  {
    icon: ECHOPAY_SVG().tnxIcon(),
    name: "Transactions",
    link: "/transactions",
  },
  {
    icon: ECHOPAY_SVG().invoiceIcon(),
    name: "Invoices",
    link: "/invoices",
  },
  {
    icon: ECHOPAY_SVG().groupIcon(),
    name: "Customers",
    link: "/customers",
  },
];

export const SETTINGTABS: SideTabsProps[] = [
  {
    icon: ECHOPAY_SVG().searchListIcon(),
    name: "Audit Logs",
    link: "/audit-logs",
  },
  {
    icon: ECHOPAY_SVG().settingsIcon(),
    name: "Settings",
    link: "/settings",
  },
];
