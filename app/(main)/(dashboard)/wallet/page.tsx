"use client";

import { useState } from "react";
import { ECHOPAY_SVG } from "@/assets/svgs";
import { ChevronDown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import ProtectedRoute from "@/components/ProtectedRoute";

const Payouts = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  const transactions = [
    {
      amount: "-NGN 256,000",
      beforeBal: "500,000.00",
      afterBal: "234,567.00",
      details: "Byakuya Kuchiki",
      date: "01/01/2025 20:40",
      status: "Success",
    },
    {
      amount: "-NGN 256,000",
      beforeBal: "500,000.00",
      afterBal: "234,567.00",
      details: "Byakuya Kuchiki",
      date: "01/01/2025 20:40",
      status: "Success",
    },
    {
      amount: "-NGN 256,000",
      beforeBal: "500,000.00",
      afterBal: "234,567.00",
      details: "Byakuya Kuchiki",
      date: "01/01/2025 20:40",
      status: "Success",
    },
    {
      amount: "-NGN 256,000",
      beforeBal: "500,000.00",
      afterBal: "234,567.00",
      details: "Byakuya Kuchiki",
      date: "01/01/2025 20:40",
      status: "Success",
    },
    {
      amount: "-NGN 256,000",
      beforeBal: "500,000.00",
      afterBal: "234,567.00",
      details: "Byakuya Kuchiki",
      date: "01/01/2025 20:40",
      status: "Success",
    },
    {
      amount: "-NGN 256,000",
      beforeBal: "500,000.00",
      afterBal: "234,567.00",
      details: "Byakuya Kuchiki",
      date: "01/01/2025 20:40",
      status: "Success",
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
    <ProtectedRoute>
      <div className="p-3 lg:p-[24px]">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-7 gap-4">
          <div>
            <div className="flex flex-row items-center gap-2 lg:gap-4 mb-2">
              <h1 className="text-2xl lg:text-[32px] font-medium leading-[32px] lg:leading-[40px] text-[#010721] align-middle tracking-[0px]">
                Wallet
              </h1>
              <Select defaultValue="myBusiness">
                <SelectTrigger className="w-full lg:w-[105px] border rounded-[32px] h-full px-[5px] py-[5px] lg:p-[8px] border-[#E0E0E0] focus:ring-0 focus:outline-0 text-xs lg:text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="myBusiness">
                      <div className="flex items-center space-x-2">
                        <div>
                          {ECHOPAY_SVG().nigeriaIcon({
                            className:
                              "w-[18px] h-[18px] lg:w-[24px] lg:h-[24px]",
                          })}
                        </div>
                        <span className="text-[12px] lg:text-[14px] font-[400] leading-[16px] lg:leading-[20px] tracking-[0.25px] text-[#010721]">
                          NGN
                        </span>
                      </div>
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <p className="text-xs lg:text-[14px] font-normal leading-[16px] lg:leading-[20px] tracking-[0.25px] align-middle text-[#010721]">
              Overview of your finance
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full lg:w-auto">
            <button className="h-10 lg:h-[56px] px-3 lg:px-[26px] flex items-center justify-center gap-2 border border-[#D9D9D9] rounded-[8px] lg:rounded-[12px] text-xs lg:text-sm">
              <p className="font-medium text-[12px] lg:text-[14px] leading-[16px] lg:leading-[20px] tracking-[0.1px] align-middle text-[#010721]">
                Export Data
              </p>
              <p>
                {ECHOPAY_SVG().downloadIcon({
                  className: "w-[18px] h-[18px] lg:w-[24px] lg:h-[24px]",
                })}
              </p>
            </button>
            <button className="bg-[#0046A7] h-10 lg:h-[56px] px-3 lg:px-[26px] flex items-center justify-center gap-2 border border-[#D9D9D9] rounded-[8px] lg:rounded-[12px]">
              <p className="font-medium text-[12px] lg:text-[14px] leading-[16px] lg:leading-[20px] tracking-[0.1px] align-middle text-[#FFFFFF]">
                Fund Wallet
              </p>
              <p>
                {ECHOPAY_SVG().addIcon({
                  className: "w-[18px] h-[18px] lg:w-[24px] lg:h-[24px]",
                })}
              </p>
            </button>
            <button className="bg-[#0046A7] h-10 lg:h-[56px] px-3 lg:px-[26px] flex items-center justify-center gap-2 border border-[#D9D9D9] rounded-[8px] lg:rounded-[12px]">
              <p className="font-medium text-[12px] lg:text-[14px] leading-[16px] lg:leading-[20px] tracking-[0.1px] align-middle text-[#FFFFFF]">
                Create Disbursement
              </p>
              <p>
                {ECHOPAY_SVG().sendIcon({
                  className: "w-[18px] h-[18px] lg:w-[24px] lg:h-[24px]",
                })}
              </p>
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="w-full border border-[#E0E0E0] rounded-[8px] lg:rounded-[12px] p-3 lg:p-[16px]">
            <div className="mb-4">
              <p className="font-normal text-sm lg:text-[16px] leading-[20px] lg:leading-[24px] tracking-[0.5px] align-middle text-[#010721]">
                NGN BALANCE
              </p>
            </div>

            <div className="w-full py-3 lg:py-[16px] px-3 lg:px-[16px] border border-[#E5E5E5] rounded-[6px] lg:rounded-[8px]">
              <p className="text-[10px] lg:text-[12px] font-normal leading-[14px] lg:leading-[16px] tracking-[0.4px] align-middle text-[#010721] mb-2 lg:mb-4">
                Payout Balance
              </p>

              <div className="flex items-center gap-2 mb-2">
                <h2 className="text-xl lg:text-[32px] leading-[28px] lg:leading-[40px] tracking-[0px] align-middle font-bold text-[#010721]">
                  NGN 100,240
                </h2>
                <span className="text-[9px] lg:text-[11px] leading-[12px] lg:leading-[16px] tracking-[0.5px] align-middle font-medium text-[#0C614E] bg-[#CDF4E4] p-1 lg:p-[4px] rounded-[100px]">
                  +10%
                </span>
              </div>

              <p className="text-[10px] lg:text-[12px] leading-[14px] lg:leading-[16px] tracking-[0.4px] align-middle text-[#010721]">
                <span className="font-bold">+400</span> vs last month
              </p>
            </div>
          </div>

          <div className="w-full border border-[#E5E5E5] p-3 lg:p-[16px] rounded-[8px] lg:rounded-[8px]">
            <div className="flex items-center gap-2 lg:gap-3 pb-3 lg:pb-4 border-b border-[#E5E5E5]">
              <h1 className="text-lg lg:text-[22px] font-medium leading-[24px] lg:leading-[28px] tracking-[0px] text-[#010721]">
                Your action items
              </h1>
              <div className="flex items-center justify-center w-6 h-6 lg:w-7 lg:h-7 bg-[#0046A7] text-white rounded-full text-sm lg:text-[16px] font-semibold">
                1
              </div>
            </div>

            <div className="overflow-hidden">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full flex items-center justify-between py-3 lg:py-4 bg-white hover:bg-gray-50 transition-colors"
              >
                <span className="text-sm lg:text-base tracking-[0.5px] font-normal text-[#404040]">
                  Finish setting up your account
                </span>
                <ChevronDown
                  size={20}
                  className={`text-gray-600 transition-transform duration-300 ease-in-out flex-shrink-0 ${
                    isExpanded ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="border-t border-gray-200 pt-3 lg:pt-4 bg-white">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-2 lg:gap-4">
                      {ECHOPAY_SVG().checkOutline({
                        className: "w-[18px] h-[18px] lg:w-[24px] lg:h-[24px]",
                      })}
                      <span className="text-sm lg:text-base leading-[20px] text-[#010721]">
                        Verify your Business
                      </span>
                    </div>
                    <Link
                      href="/verify-business"
                      className="bg-[#0046A7] flex items-center h-10 lg:h-[56px] text-white rounded-[8px] lg:rounded-[12px] px-4 lg:px-6 font-medium text-[12px] lg:text-[14px] leading-[16px] lg:leading-[20px] tracking-[0.1px] align-middle whitespace-nowrap"
                    >
                      Verify Business
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-3 lg:p-6 rounded-lg border border-[#e0e0e0] overflow-hidden mb-6">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-4 gap-2">
            <p className="font-normal text-sm lg:text-[16px] leading-[20px] lg:leading-[24px] tracking-[0.5px] align-middle text-[#010721]">
              RECENT TRANSACTIONS
            </p>
            <div className="flex gap-2 lg:gap-4 w-full lg:w-auto">
              <Select defaultValue="allStatus">
                <SelectTrigger className="w-full lg:w-[168px] border rounded-[32px] p-[8px] border-[#E0E0E0] focus:ring-0 focus:outline-0 text-xs lg:text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="allStatus">
                      <div className="flex items-center space-x-2">
                        <div>
                          {ECHOPAY_SVG().clockIcon({
                            className:
                              "w-[18px] h-[18px] lg:w-[24px] lg:h-[24px]",
                          })}
                        </div>
                        <span className="text-[12px] lg:text-[14px] font-[400] leading-[16px] lg:leading-[20px] tracking-[0.25px] text-[#010721]">
                          All Status
                        </span>
                      </div>
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Select defaultValue="7Days">
                <SelectTrigger className="w-full lg:w-[168px] border rounded-[32px] p-[8px] border-[#E0E0E0] focus:ring-0 focus:outline-0 text-xs lg:text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="7Days">
                      <div className="flex items-center space-x-2">
                        <div>
                          {ECHOPAY_SVG().calendarIcon({
                            className:
                              "w-[18px] h-[18px] lg:w-[24px] lg:h-[24px]",
                          })}
                        </div>
                        <span className="text-[12px] lg:text-[14px] font-[400] leading-[16px] lg:leading-[20px] tracking-[0.25px] text-[#010721]">
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
            <table className="w-full min-w-max">
              <thead>
                <tr className="border-b border-[#CAC4D0] bg-[#F4F4F3]">
                  <th className="px-2 lg:px-[16px] py-3 lg:py-[16px] text-left">
                    <p className="text-[11px] lg:text-[14px] leading-[16px] lg:leading-[20px] tracking-[0.25px] align-middle font-normal text-[#010721]">
                      Amount
                    </p>
                  </th>
                  <th className="px-[5px] py-[16px] text-left text-[11px] lg:text-[14px] leading-[16px] lg:leading-[20px] tracking-[0.25px] align-middle font-normal text-[#010721]">
                    Balance Before
                  </th>
                  <th className="px-[5px] py-[16px] text-left text-[11px] lg:text-[14px] leading-[16px] lg:leading-[20px] tracking-[0.25px] align-middle font-normal text-[#010721]">
                    Balance After
                  </th>
                  <th className="px-2 lg:px-[5px] py-3 lg:py-[16px] text-left text-[11px] lg:text-[14px] leading-[16px] lg:leading-[20px] tracking-[0.25px] align-middle font-normal text-[#010721]">
                    Details
                  </th>
                  <th className="px-[5px] py-[16px] text-left text-[11px] lg:text-[14px] leading-[16px] lg:leading-[20px] tracking-[0.25px] align-middle font-normal text-[#010721]">
                    Date
                  </th>
                  <th className="px-2 lg:px-[5px] py-3 lg:py-[16px] text-left text-[11px] lg:text-[14px] leading-[16px] lg:leading-[20px] tracking-[0.25px] align-middle font-normal text-[#010721]">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx, idx) => (
                  <tr
                    key={idx}
                    className="border-b border-[#E0E0E0] hover:bg-[#f8f8f8]"
                  >
                    <td className="px-2 lg:px-[16px] py-3 lg:py-[16px]">
                      <p className="text-[11px] lg:text-[14px] leading-[16px] lg:leading-[20px] tracking-[0.25px] align-middle font-normal text-[#FF5F57]">
                        {tx.amount}
                      </p>
                    </td>
                    <td className="px-[5px] py-[16px] text-[11px] lg:text-[14px] leading-[16px] lg:leading-[20px] tracking-[0.25px] align-middle font-normal text-[#010721]">
                      {tx.beforeBal}
                    </td>
                    <td className="px-[5px] py-[16px] text-[11px] lg:text-[14px] leading-[16px] lg:leading-[20px] tracking-[0.25px] align-middle font-normal text-[#010721]">
                      {tx.afterBal}
                    </td>
                    <td className="px-2 lg:px-[5px] py-3 lg:py-[16px] text-[11px] lg:text-[14px] leading-[16px] lg:leading-[20px] tracking-[0.25px] align-middle font-normal text-[#010721]">
                      {tx.details}
                    </td>
                    <td className="px-[5px] py-[16px] text-[11px] lg:text-[14px] leading-[16px] lg:leading-[20px] tracking-[0.25px] align-middle font-normal text-[#010721]">
                      {tx.date}
                    </td>
                    <td className="px-2 lg:px-[5px] py-3 lg:py-[16px]">
                      <span
                        className={`inline-block px-2 lg:px-3 py-1 rounded-full text-[10px] lg:text-xs font-medium ${getStatusColor(
                          tx.status
                        )}`}
                      >
                        {tx.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 lg:mt-6 mb-2 text-center">
            <Link
              href="#"
              className="text-[#0046a7] hover:underline text-xs lg:text-sm font-medium leading-[16px] lg:leading-[20px] tracking-[0.1px] align-middle"
            >
              View All Balance
            </Link>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Payouts;
