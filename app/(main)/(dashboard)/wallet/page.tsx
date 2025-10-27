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
import { BVNModal } from "./components/BVNModal";
import { WalletFundModal } from "./components/WalletFundModal";
import React from "react";
import Link from "next/link";

const Payouts = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFundWalletOpen, setIsFundWalletOpen] = useState(false);

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

  const handleBVNSubmit = (bvn: string) => {
    console.log("BVN submitted:", bvn);
    setIsModalOpen(false);
    // Add your submission logic here
  };

  return (
    <div className="p-[24px]">
      <div className="flex justify-between items-center mb-6">
        <div>
          <div className="flex items-center gap-4 mb-2">
            <h1 className="text-[32px] font-medium leading-[40px] text-[#010721] align-middle tracking-[0px]">
              Wallet
            </h1>
            <Select defaultValue="myBusiness">
              <SelectTrigger className="w-[105px] border rounded-[32px] p-[8px] border-[#E0E0E0] focus:ring-0 focus:outline-0 ">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="myBusiness">
                    <div className="flex items-center space-x-2">
                      <div>{ECHOPAY_SVG().nigeriaIcon()}</div>
                      <span className="text-[14px] font-[400] leading-[20px] tracking-[0.25px] text-[#010721]">
                        NGN
                      </span>
                    </div>
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <p className="text-[14px] font-normal leading-[20px] tracking-[0.25px] align-middle text-[#010721]">
            Overview of your finance
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="h-[56px] p-[26px] flex items-center justify-center gap-2 border border-[#D9D9D9] rounded-[12px]">
            <p className="font-medium text-[14px] leading-[20px] tracking-[0.1px] align-middle text-[#010721]">
              Export Data
            </p>
            <p>{ECHOPAY_SVG().downloadIcon()}</p>
          </button>
          <button
            className="bg-[#0046A7] h-[56px] p-[26px] flex items-center justify-center gap-2 border border-[#D9D9D9] rounded-[12px]"
            onClick={() => setIsFundWalletOpen(true)}
          >
            <p className="font-medium text-[14px] leading-[20px] tracking-[0.1px] align-middle text-[#FFFFFF]">
              Fund Wallet
            </p>
            <p>{ECHOPAY_SVG().addIcon()}</p>
          </button>
          <button className="bg-[#0046A7] h-[56px] p-[26px] flex items-center justify-center gap-2 border border-[#D9D9D9] rounded-[12px]">
            <p className="font-medium text-[14px] leading-[20px] tracking-[0.1px] align-middle text-[#FFFFFF]">
              Create Disbursement
            </p>
            <p>{ECHOPAY_SVG().sendIcon()}</p>
          </button>
        </div>
      </div>
      <div className="mb-6 border border-[#E5E5E5] p-[16px] rounded-[8px]">
        <div className="flex items-center gap-3 pb-6 border-b border-[#E5E5E5]">
          <h1 className="text-[22px] font-medium leading-[28px] tracking-[0px] text-[#010721]">
            Your action items
          </h1>
          <div className="flex items-center justify-center w-7 h-7 bg-[#0046A7] text-white rounded-full text-[16px] font-semibold">
            1
          </div>
        </div>

        {/* Expandable section */}
        <div className="overflow-hidden">
          {/* Section header */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full flex items-center justify-between py-6 bg-white hover:bg-gray-50 transition-colors"
          >
            <span className="text-base tracking-[0.5px] font-normal text-[#404040]">
              Finish setting up your account
            </span>
            <ChevronDown
              size={24}
              className={`text-gray-600 transition-transform duration-300 ease-in-out ${
                isExpanded ? "rotate-180" : ""
              }`}
            />
          </button>

          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="border-t border-gray-200 pt-6 bg-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {ECHOPAY_SVG().checkOutline()}
                  <span className="text-base leading-[0.5px] text-[#010721]">
                    Verify your BVN
                  </span>
                </div>
                <button
                  className="bg-[#0046A7] h-[56px] text-white rounded-[12px] px-6 font-medium text-[14px] leading-[20px] tracking-[0.1px] align-middle"
                  onClick={() => setIsModalOpen(true)}
                >
                  Verify BVN
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="border border-[#E0E0E0] rounded-[12px] p-[16px] mb-6">
        <div className="mb-4">
          <p className="font-normal text-[16px] leading-[24px] tracking-[0.5px] align-middle text-[#010721]">
            NGN BALANCE
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="w-full py-[16px] px-[16px] border border-[#E5E5E5] rounded-[8px]">
            {/* Label */}
            <p className="text-[12px] font-normal leading-[16px] tracking-[0.4px] align-middle text-[#010721] mb-4">
              Collection Balance
            </p>

            {/* Main value with percentage badge */}
            <div className="flex items-center gap-2 mb-2">
              <h2 className="text-[32px] leading-[40px] tracking-[0px] align-middle font-bold text-[#010721]">
                NGN 20,800,956
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
              Payout Balance
            </p>

            {/* Main value with percentage badge */}
            <div className="flex items-center gap-2 mb-2">
              <h2 className="text-[32px] leading-[40px] tracking-[0px] align-middle font-bold text-[#010721]">
                NGN 100,240
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
        </div>
      </div>
      <div className="p-6 rounded-lg border border-[#e0e0e0] overflow-hidden mb-6">
        <div className="flex items-center justify-between mb-4">
          <p className="font-normal text-[16px] leading-[24px] tracking-[0.5px] align-middle text-[#010721]">
            RECENT TRANSACTIONS
          </p>
          <div className="flex gap-4">
            <Select defaultValue="allStatus">
              <SelectTrigger className="w-[168px] border rounded-[32px] p-[8px] border-[#E0E0E0] focus:ring-0 focus:outline-0 ">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="allStatus">
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
            <Select defaultValue="7Days">
              <SelectTrigger className="w-[168px] border rounded-[32px] p-[8px] border-[#E0E0E0] focus:ring-0 focus:outline-0 ">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="7Days">
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
                  <p className="text-[14px] leading-[20px] tracking-[0.25px] align-middle font-normal text-[#010721]">
                    Amount
                  </p>
                </th>
                <th className="px-[5px] py-[16px] text-left text-[14px] leading-[20px] tracking-[0.25px] align-middle font-normal text-[#010721]">
                  Balance Before
                </th>
                <th className="px-[5px] py-[16px] text-left text-[14px] leading-[20px] tracking-[0.25px] align-middle font-normal text-[#010721]">
                  Balance After
                </th>
                <th className="px-[5px] py-[16px] text-left text-[14px] leading-[20px] tracking-[0.25px] align-middle font-normal text-[#010721]">
                  Details
                </th>
                <th className="px-[5px] py-[16px] text-left text-[14px] leading-[20px] tracking-[0.25px] align-middle font-normal text-[#010721]">
                  Date
                </th>
                <th className="px-[5px] py-[16px] text-left text-[14px] leading-[20px] tracking-[0.25px] align-middle font-normal text-[#010721]">
                  Status
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
                    <p className="text-[14px] leading-[20px] tracking-[0.25px] align-middle font-normal text-[#010721]">
                      {tx.amount}
                    </p>
                  </td>
                  <td className="px-[5px] py-[16px] text-[14px] leading-[20px] tracking-[0.25px] align-middle font-normal text-[#010721]">
                    {tx.beforeBal}
                  </td>
                  <td className="px-[5px] py-[16px] text-[14px] leading-[20px] tracking-[0.25px] align-middle font-normal text-[#010721]">
                    {tx.afterBal}
                  </td>
                  <td className="px-[5px] py-[16px] text-[14px] leading-[20px] tracking-[0.25px] align-middle font-normal text-[#010721]">
                    {tx.details}
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
            href="#"
            className="text-[#0046a7] hover:underline text-sm font-medium leading-[20px] tracking-[0.1px] align-middle"
          >
            View All Balance
          </Link>
        </div>
      </div>
      <BVNModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleBVNSubmit}
      />
      <WalletFundModal
        isOpen={isFundWalletOpen}
        onClose={() => setIsFundWalletOpen(false)}
      />
    </div>
  );
};

export default Payouts;
