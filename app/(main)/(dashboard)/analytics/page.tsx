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
    <div className="p-3 lg:p-[24px]">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl lg:text-[32px] font-medium leading-[32px] lg:leading-[40px] text-[#010721] mb-2 align-middle tracking-[0px]">
            Analytics
          </h1>
          <p className="text-xs lg:text-[14px] font-normal leading-[16px] lg:leading-[20px] tracking-[0.25px] align-middle text-[#010721]">
            Overview of your disbursements
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full lg:w-auto">
          <button className="h-10 lg:h-[56px] px-3 lg:px-[26px] flex items-center justify-center gap-2 border border-[#D9D9D9] rounded-[8px] lg:rounded-[12px] text-xs lg:text-sm">
            <p className="font-medium text-[12px] lg:text-[14px] leading-[16px] lg:leading-[20px] tracking-[0.1px] align-middle text-[#010721]">
              Create Invoice
            </p>
            <p>
              {ECHOPAY_SVG().invoiceIcon({
                className: "w-[18px] h-[18px] lg:w-[24px] lg:h-[24px]",
              })}
            </p>
          </button>
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
              Create Payment Link
            </p>
            <p>
              {ECHOPAY_SVG().addIcon({
                className: "w-[18px] h-[18px] lg:w-[24px] lg:h-[24px]",
              })}
            </p>
          </button>
        </div>
      </div>

      <div className="border border-[#E0E0E0] rounded-[8px] lg:rounded-[12px] p-3 lg:p-[16px] mb-6">
        <div className="mb-4">
          <p className="font-normal text-sm lg:text-[16px] leading-[20px] lg:leading-[24px] tracking-[0.5px] align-middle text-[#010721]">
            QUICK INSIGHTS
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-4">
          {[
            {
              label: "Total Balance",
              value: "20,800,956",
              change: "+27%",
              positive: true,
            },
            {
              label: "Total Transactions",
              value: "1240",
              change: "+10%",
              positive: true,
            },
            {
              label: "Total Disbursed",
              value: "20,800,956",
              change: "+27%",
              positive: false,
            },
            {
              label: "Total Customers",
              value: "3,459",
              change: "+10%",
              positive: true,
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="w-full py-3 lg:py-[16px] px-3 lg:px-[16px] border border-[#E5E5E5] rounded-[6px] lg:rounded-[8px]"
            >
              <p className="text-[10px] lg:text-[12px] font-normal leading-[14px] lg:leading-[16px] tracking-[0.4px] align-middle text-[#010721] mb-2 lg:mb-4">
                {item.label}
              </p>
              <div className="flex items-center gap-1 lg:gap-2 mb-1 lg:mb-2">
                <h2 className="text-lg lg:text-[26px] leading-[28px] lg:leading-[40px] tracking-[0px] align-middle font-bold text-[#010721]">
                  {item.value}
                </h2>
                <span
                  className={`text-[9px] lg:text-[11px] leading-[12px] lg:leading-[16px] tracking-[0.5px] align-middle font-medium p-1 lg:p-[4px] rounded-[100px] ${
                    item.positive
                      ? "text-[#0C614E] bg-[#CDF4E4]"
                      : "text-[#B3261E] bg-[#FFDDDD]"
                  }`}
                >
                  {item.change}
                </span>
              </div>
              <p className="text-[10px] lg:text-[12px] leading-[14px] lg:leading-[16px] tracking-[0.4px] align-middle text-[#010721]">
                <span className="font-bold">
                  {item.change.replace("+", "")}
                </span>{" "}
                vs last month
              </p>
            </div>
          ))}
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
                <th className="px-2 lg:px-[16px] py-3 lg:py-[16px] text-left flex items-center gap-2">
                  <div className="w-3 h-3 lg:w-4 lg:h-4 border lg:border-2 border-[#49454F] rounded-[2px]"></div>
                  <p className="text-[11px] lg:text-[14px] leading-[16px] lg:leading-[20px] tracking-[0.25px] align-middle font-normal text-[#010721]">
                    Transaction id
                  </p>
                </th>
                <th className="px-2 lg:px-[5px] py-3 lg:py-[16px] text-left text-[11px] lg:text-[14px] leading-[16px] lg:leading-[20px] tracking-[0.25px] align-middle font-normal text-[#010721]">
                  Customer
                </th>
                <th className="px-2 lg:px-[5px] py-3 lg:py-[16px] text-left text-[11px] lg:text-[14px] leading-[16px] lg:leading-[20px] tracking-[0.25px] align-middle font-normal text-[#010721]">
                  Amount
                </th>
                <th className="px-2 lg:px-[5px] py-3 lg:py-[16px] text-left text-[11px] lg:text-[14px] leading-[16px] lg:leading-[20px] tracking-[0.25px] align-middle font-normal text-[#010721]">
                  Method
                </th>
                <th className="px-2 lg:px-[5px] py-3 lg:py-[16px] text-left text-[11px] lg:text-[14px] leading-[16px] lg:leading-[20px] tracking-[0.25px] align-middle font-normal text-[#010721]">
                  Date
                </th>
                <th className="px-2 lg:px-[5px] py-3 lg:py-[16px] text-left text-[11px] lg:text-[14px] leading-[16px] lg:leading-[20px] tracking-[0.25px] align-middle font-normal text-[#010721]">
                  Status
                </th>
                <th className="px-2 lg:px-[5px] py-3 lg:py-[16px] text-left text-[11px] lg:text-[14px] leading-[16px] lg:leading-[20px] tracking-[0.25px] align-middle font-normal text-[#010721]">
                  Reference
                </th>
                <th className="px-2 lg:px-[5px] py-3 lg:py-[16px] text-left text-[11px] lg:text-[14px] leading-[16px] lg:leading-[20px] tracking-[0.25px] align-middle font-normal text-[#010721]"></th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx, idx) => (
                <tr
                  key={idx}
                  className="border-b border-[#E0E0E0] hover:bg-[#f8f8f8]"
                >
                  <td className="px-2 lg:px-[16px] pt-5 lg:py-[19px] text-[11px] lg:text-[14px] leading-[16px] lg:leading-[20px] tracking-[0.25px] align-middle font-normal text-[#010721] flex items-center gap-2">
                    <div className="w-3 h-3 lg:w-4 lg:h-4 border lg:border-2 border-[#49454F] rounded-[2px]"></div>
                    <p className="text-[11px] lg:text-[14px] leading-[16px] lg:leading-[20px] tracking-[0.25px] align-middle font-normal text-[#010721]">
                      {tx.id}
                    </p>
                  </td>
                  <td className="px-2 lg:px-[5px] py-3 lg:py-[16px] text-[11px] lg:text-[14px] leading-[16px] lg:leading-[20px] tracking-[0.25px] align-middle font-normal text-[#010721]">
                    {tx.customer}
                  </td>
                  <td className="px-2 lg:px-[5px] py-3 lg:py-[16px] text-[11px] lg:text-[14px] leading-[16px] lg:leading-[20px] tracking-[0.25px] align-middle font-normal text-[#010721]">
                    {tx.amount}
                  </td>
                  <td className="px-2 lg:px-[5px] py-3 lg:py-[16px] text-[11px] lg:text-[14px] leading-[16px] lg:leading-[20px] tracking-[0.25px] align-middle font-normal text-[#010721]">
                    {tx.method}
                  </td>
                  <td className="px-2 lg:px-[5px] py-3 lg:py-[16px] text-[11px] lg:text-[14px] leading-[16px] lg:leading-[20px] tracking-[0.25px] align-middle font-normal text-[#010721]">
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
                  <td className="px-2 lg:px-[5px] py-3 lg:py-[16px] text-[11px] lg:text-[14px] leading-[16px] lg:leading-[20px] tracking-[0.25px] align-middle font-normal text-[#010721]">
                    {tx.reference}
                  </td>
                  <td className="px-[16px] py-[16px] text-center">
                    <button className="text-[#49454f] hover:text-[#010721]">
                      {ECHOPAY_SVG().moreIcon({
                        className: "w-[12px] h-[12px] lg:w-[16px] lg:h-[16px]",
                      })}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 lg:mt-6 mb-2 text-center">
          <Link
            href="/transactions"
            className="text-[#0046a7] hover:underline text-xs lg:text-sm font-medium leading-[16px] lg:leading-[20px] tracking-[0.1px] align-middle"
          >
            View All Transactions
          </Link>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-4">
        <TransactionVolume />
        <Payouts />
      </div>
    </div>
  );
};

export default Analytics;
