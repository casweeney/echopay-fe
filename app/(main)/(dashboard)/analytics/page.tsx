import { ECHOPAY_SVG } from "@/assets/svgs";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import React from "react";
import { TransactionVolume } from "./components/BarChart";
import { Payouts } from "./components/PieChart";

const Analytics = () => {
  const transactions = [
    {
      id: "DSB-2025-001",
      customer: "Kurosaki Ishinn",
      amount: "234,567.00",
      method: "Card",
      date: "01/01/2025 20:40",
      status: "Pending",
      reference: "INV-2025-001",
    },
    {
      id: "DSB-2025-002",
      customer: "Byakuya Kuchiki",
      amount: "234,567.00",
      method: "Transfer",
      date: "01/01/2025 20:40",
      status: "Processing",
      reference: "INV-2025-002",
    },
    {
      id: "DSB-2025-003",
      customer: "Asta Clover",
      amount: "234,567.00",
      method: "Transfer",
      date: "01/01/2025 20:40",
      status: "Failed",
      reference: "INV-2025-003",
    },
    {
      id: "DSB-2025-005",
      customer: "Byakuya Kuchiki",
      amount: "234,567.00",
      method: "Card",
      date: "01/01/2025 20:40",
      status: "Success",
      reference: "INV-2025-005",
    },
    {
      id: "DSB-2025-005",
      customer: "Byakuya Kuchiki",
      amount: "234,567.00",
      method: "Card",
      date: "01/01/2025 20:40",
      status: "Success",
      reference: "INV-2025-005",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-[#fdf4e2] text-[#513f1a]";
      case "Processing":
        return "bg-[#d9f0ff] text-[#0c2d61]";
      case "Failed":
        return "bg-[#ffdddd] text-[#b3261e]";
      case "Success":
        return "bg-[#cdf4e4] text-[#0c614e]";
      default:
        return "bg-[#e5e5e5] text-[#49454f]";
    }
  };

  return (
    <div className="p-[24px]">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-[32px] font-medium leading-[40px] text-[#010721] mb-2 align-middle tracking-[0px]">
            Analytics
          </h1>
          <p className="text-[14px] font-normal leading-[20px] tracking-[0.25px] align-middle text-[#010721]">
            Overview of your disbursements
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="h-[56px] p-[26px] flex items-center justify-center gap-2 border border-[#D9D9D9] rounded-[12px]">
            <p className="font-medium text-[14px] leading-[20px] tracking-[0.1px] align-middle text-[#010721]">
              Create Invoice
            </p>
            <p>{ECHOPAY_SVG().invoiceIcon()}</p>
          </button>
          <button className="h-[56px] p-[26px] flex items-center justify-center gap-2 border border-[#D9D9D9] rounded-[12px]">
            <p className="font-medium text-[14px] leading-[20px] tracking-[0.1px] align-middle text-[#010721]">
              Export Data
            </p>
            <p>{ECHOPAY_SVG().downloadIcon()}</p>
          </button>
          <button className="bg-[#0046A7] h-[56px] p-[26px] flex items-center justify-center gap-2 border border-[#D9D9D9] rounded-[12px]">
            <p className="font-medium text-[14px] leading-[20px] tracking-[0.1px] align-middle text-[#FFFFFF]">
              Create Payment Link
            </p>
            <p>{ECHOPAY_SVG().addIcon()}</p>
          </button>
        </div>
      </div>
      <div className="border border-[#E0E0E0] rounded-[12px] p-[16px] mb-6">
        <div className="mb-4">
          <p className="font-normal text-[16px] leading-[24px] tracking-[0.5px] align-middle text-[#010721]">
            QUICK INSIGHTS
          </p>
        </div>
        <div className="grid grid-cols-4 gap-4">
          <div className="w-full py-[16px] px-[16px] border border-[#E5E5E5] rounded-[8px]">
            {/* Label */}
            <p className="text-[12px] font-normal leading-[16px] tracking-[0.4px] align-middle text-[#010721] mb-4">
              Total Balance
            </p>

            {/* Main value with percentage badge */}
            <div className="flex items-center gap-2 mb-2">
              <h2 className="text-[26px] leading-[40px] tracking-[0px] align-middle font-bold text-[#010721]">
                20,800,956
              </h2>
              <span className="text-[11px] leading-[16px] tracking-[0.5px] align-middle font-medium text-[#0C614E] bg-[#CDF4E4] p-[4px] rounded-[100px]">
                +27%
              </span>
            </div>

            {/* Subtext */}
            <p className="text-[12px] leading-[16px] tracking-[0.4px] align-middle text-[#010721]">
              <span className="font-bold">+2.3 M</span> vs last month
            </p>
          </div>
          <div className="w-full py-[16px] px-[16px] border border-[#E5E5E5] rounded-[8px]">
            {/* Label */}
            <p className="text-[12px] font-normal leading-[16px] tracking-[0.4px] align-middle text-[#010721] mb-4">
              Total Transactions
            </p>

            {/* Main value with percentage badge */}
            <div className="flex items-center gap-2 mb-2">
              <h2 className="text-[26px] leading-[40px] tracking-[0px] align-middle font-bold text-[#010721]">
                1240
              </h2>
              <span className="text-[11px] leading-[16px] tracking-[0.5px] align-middle font-medium text-[#0C614E] bg-[#CDF4E4] p-[4px] rounded-[100px]">
                +10%
              </span>
            </div>

            {/* Subtext */}
            <p className="text-[12px] leading-[16px] tracking-[0.4px] align-middle text-[#010721]">
              <span className="font-bold">+400</span> vs last month
            </p>
          </div>
          <div className="w-full py-[16px] px-[16px] border border-[#E5E5E5] rounded-[8px]">
            {/* Label */}
            <p className="text-[12px] font-normal leading-[16px] tracking-[0.4px] align-middle text-[#010721] mb-4">
              Total Disbursed
            </p>

            {/* Main value with percentage badge */}
            <div className="flex items-center gap-2 mb-2">
              <h2 className="text-[26px] leading-[40px] tracking-[0px] align-middle font-bold text-[#010721]">
                20,800,956
              </h2>
              <span className="text-[11px] leading-[16px] tracking-[0.5px] align-middle font-medium text-[#B3261E] bg-[#FFDDDD] p-[4px] rounded-[100px]">
                +27%
              </span>
            </div>

            {/* Subtext */}
            <p className="text-[12px] leading-[16px] tracking-[0.4px] align-middle text-[#010721]">
              <span className="font-bold">-20</span> vs last month
            </p>
          </div>
          <div className="w-full py-[16px] px-[16px] border border-[#E5E5E5] rounded-[8px]">
            {/* Label */}
            <p className="text-[12px] font-normal leading-[16px] tracking-[0.4px] align-middle text-[#010721] mb-4">
              Total Customers
            </p>

            {/* Main value with percentage badge */}
            <div className="flex items-center gap-2 mb-2">
              <h2 className="text-[26px] leading-[40px] tracking-[0px] align-middle font-bold text-[#010721]">
                3,459
              </h2>
              <span className="text-[11px] leading-[16px] tracking-[0.5px] align-middle font-medium text-[#0C614E] bg-[#CDF4E4] p-[4px] rounded-[100px]">
                +10%
              </span>
            </div>

            {/* Subtext */}
            <p className="text-[12px] leading-[16px] tracking-[0.4px] align-middle text-[#010721]">
              <span className="font-bold">+15</span> vs last month
            </p>
          </div>
        </div>
      </div>

      <div className="p-6 rounded-lg border border-[#e0e0e0] overflow-hidden mb-6">
        <div className="flex items-center justify-between mb-4">
          <p className="font-normal text-[16px] leading-[24px] tracking-[0.5px] align-middle text-[#010721]">
            RECENT TRANSACTIONS
          </p>
          <div className="flex gap-4">
            <Select defaultValue="myBusiness">
              <SelectTrigger className="w-[168px] border rounded-[32px] p-[8px] border-[#E0E0E0] focus:ring-0 focus:outline-0 ">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="myBusiness">
                    <div className="flex items-center space-x-2">
                      <div>{ECHOPAY_SVG().clockIcon()}</div>
                      <span className="text-[14px] font-[400] leading-[20px] tracking-[0.25px] text-[#010721]">
                        All Status
                      </span>
                    </div>
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Select defaultValue="myBusiness">
              <SelectTrigger className="w-[168px] border rounded-[32px] p-[8px] border-[#E0E0E0] focus:ring-0 focus:outline-0 ">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="myBusiness">
                    <div className="flex items-center space-x-2">
                      <div>{ECHOPAY_SVG().calendarIcon()}</div>
                      <span className="text-[14px] font-[400] leading-[20px] tracking-[0.25px] text-[#010721]">
                        Last 7 Days
                      </span>
                    </div>
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="overflow-x-auto rounded-t-[8px]">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#CAC4D0] bg-[#F4F4F3]">
                <th className="px-[16px] py-[16px] text-left flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-[#49454F] rounded-[2px]"></div>
                  <p className="text-[14px] leading-[20px] tracking-[0.25px] align-middle font-normal text-[#010721]">
                    Transaction id
                  </p>
                </th>
                <th className="px-[5px] py-[16px] text-left text-[14px] leading-[20px] tracking-[0.25px] align-middle font-normal text-[#010721]">
                  Customer
                </th>
                <th className="px-[5px] py-[16px] text-left text-[14px] leading-[20px] tracking-[0.25px] align-middle font-normal text-[#010721]">
                  Amount
                </th>
                <th className="px-[5px] py-[16px] text-left text-[14px] leading-[20px] tracking-[0.25px] align-middle font-normal text-[#010721]">
                  Method
                </th>
                <th className="px-[5px] py-[16px] text-left text-[14px] leading-[20px] tracking-[0.25px] align-middle font-normal text-[#010721]">
                  Date
                </th>
                <th className="px-[5px] py-[16px] text-left text-[14px] leading-[20px] tracking-[0.25px] align-middle font-normal text-[#010721]">
                  Status
                </th>
                <th className="px-[5px] py-[16px] text-left text-[14px] leading-[20px] tracking-[0.25px] align-middle font-normal text-[#010721]">
                  Reference
                </th>
                <th className="px-[16px] py-[16px] text-left text-[14px] leading-[20px] tracking-[0.25px] align-middle font-normal text-[#010721]"></th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx, idx) => (
                <tr
                  key={idx}
                  className="border-b border-[#E0E0E0] hover:bg-[#f8f8f8]"
                >
                  <td className="px-[16px] py-[16px] flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-[#49454F] rounded-[2px]"></div>
                    <p className="text-[14px] leading-[20px] tracking-[0.25px] align-middle font-normal text-[#010721]">
                      {tx.id}
                    </p>
                  </td>
                  <td className="px-[5px] py-[16px] text-[14px] leading-[20px] tracking-[0.25px] align-middle font-normal text-[#010721]">
                    {tx.customer}
                  </td>
                  <td className="px-[5px] py-[16px] text-[14px] leading-[20px] tracking-[0.25px] align-middle font-normal text-[#010721]">
                    {tx.amount}
                  </td>
                  <td className="px-[5px] py-[16px] text-[14px] leading-[20px] tracking-[0.25px] align-middle font-normal text-[#010721]">
                    {tx.method}
                  </td>
                  <td className="px-[5px] py-[16px] text-[14px] leading-[20px] tracking-[0.25px] align-middle font-normal text-[#010721]">
                    {tx.date}
                  </td>
                  <td className="px-[5px] py-[16px]">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        tx.status
                      )}`}
                    >
                      {tx.status}
                    </span>
                  </td>
                  <td className="px-[5px] py-[16px] text-sm text-[#010721]">
                    {tx.reference}
                  </td>
                  <td className="px-[16px] py-[16px] text-center">
                    <button className="text-[#49454f] hover:text-[#010721]">
                      {ECHOPAY_SVG().moreIcon()}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 mb-2 text-center">
          <Link
            href="/transactions"
            className="text-[#0046a7] hover:underline text-sm font-medium leading-[20px] tracking-[0.1px] align-middle"
          >
            View All Transactions
          </Link>
        </div>
      </div>
      <div className="flex gap-4">
        <TransactionVolume />
        <Payouts />
      </div>
    </div>
  );
};

export default Analytics;
