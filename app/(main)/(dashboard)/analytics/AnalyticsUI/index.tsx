"use client";

import { ECHOPAY_SVG } from "@/assets/svgs";
import Link from "next/link";
import { TransactionVolume } from "../components/BarChart";
import { Payouts } from "../components/PieChart";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { useEffect } from "react";
import { fetchAnalytics } from "@/redux/features/analytics/analyticsSlice";
import { useRouter } from "next/navigation";
import { timeAgo } from "@/utils/timeAgo";

const AnalyticsUI = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { verificationStatus, business } = useSelector(
    (state: RootState) => state.business
  );
  const { analytics } = useSelector((state: RootState) => state.analytics);

  useEffect(() => {
    const handleAnalytics = async () => {
      if (business?.id) {
        await dispatch(fetchAnalytics(business.id));
      }
    };

    handleAnalytics();
  }, [dispatch, business?.id]);

  const capitalizeFirst = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-[#fdf4e2] text-[#513f1a]";
      case "processing":
        return "bg-[#d9f0ff] text-[#0c2d61]";
      case "failed":
        return "bg-[#ffdddd] text-[#b3261e]";
      case "completed":
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
              Export Data
            </p>
            <p>
              {ECHOPAY_SVG().downloadIcon({
                className: "w-[18px] h-[18px] lg:w-[24px] lg:h-[24px]",
              })}
            </p>
          </button>
          <button
            onClick={() => router.push("/create-disbursement")}
            disabled={verificationStatus?.data.status !== "verified"}
            className="bg-[#0046A7] h-10 lg:h-[56px] px-3 lg:px-[26px] flex items-center justify-center gap-2 border border-[#D9D9D9] rounded-[8px] lg:rounded-[12px] disabled:opacity-60 disabled:cursor-not-allowed"
          >
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

      <div className="border border-[#E0E0E0] rounded-[8px] lg:rounded-[12px] p-3 lg:p-[16px] mb-6">
        <div className="mb-4">
          <p className="font-normal text-sm lg:text-[16px] leading-[20px] lg:leading-[24px] tracking-[0.5px] align-middle text-[#010721]">
            QUICK INSIGHTS
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-4">
          {analytics?.quick_insights.total_balance.balances.map((bal) => (
            <div
              key={bal.currency}
              className="w-full py-3 lg:py-[16px] px-3 lg:px-[16px] border border-[#E5E5E5] rounded-[6px] lg:rounded-[8px]"
            >
              <p className="text-[10px] lg:text-[12px] font-normal leading-[14px] lg:leading-[16px] tracking-[0.4px] align-middle text-[#010721] mb-2">
                {bal.currency.toUpperCase()} Balance
              </p>
              <div className="flex items-center gap-1 lg:gap-2 mb-1 lg:mb-2">
                <h2 className="text-lg lg:text-[26px] leading-[28px] lg:leading-[40px] tracking-[0px] align-middle font-bold text-[#010721]">
                  {bal.amount}
                </h2>
                <span
                  className={`text-[9px] lg:text-[11px] leading-[12px] lg:leading-[16px] tracking-[0.5px] align-middle font-medium p-1 lg:p-[4px] rounded-[100px] ${
                    bal.percentage_change
                      ? "text-[#0C614E] bg-[#CDF4E4]"
                      : "text-[#B3261E] bg-[#FFDDDD]"
                  }`}
                >
                  {`${Number(bal.percentage_change.toFixed(1))}%`}
                </span>
              </div>
              <p className="text-[10px] lg:text-[12px] leading-[14px] lg:leading-[16px] tracking-[0.4px] align-middle text-[#010721]">
                {bal.comparison_text}
              </p>
            </div>
          ))}

          {analytics?.quick_insights.total_disbursed.disbursements.map(
            (disbursed) => (
              <div
                key={disbursed.currency}
                className="w-full py-3 lg:py-[16px] px-3 lg:px-[16px] border border-[#E5E5E5] rounded-[6px] lg:rounded-[8px]"
              >
                <p className="text-[10px] lg:text-[12px] font-normal leading-[14px] lg:leading-[16px] tracking-[0.4px] align-middle text-[#010721] mb-2">
                  {disbursed.currency.toUpperCase()} Total Disbursed
                </p>
                <div className="flex items-center gap-1 lg:gap-2 mb-1 lg:mb-2">
                  <h2 className="text-lg lg:text-[26px] leading-[28px] lg:leading-[40px] tracking-[0px] align-middle font-bold text-[#010721]">
                    {disbursed.amount}
                  </h2>
                  <span
                    className={`text-[9px] lg:text-[11px] leading-[12px] lg:leading-[16px] tracking-[0.5px] align-middle font-medium p-1 lg:p-[4px] rounded-[100px] ${
                      disbursed.percentage_change
                        ? "text-[#0C614E] bg-[#CDF4E4]"
                        : "text-[#B3261E] bg-[#FFDDDD]"
                    }`}
                  >
                    {`${Number(disbursed.percentage_change.toFixed(1))}%`}
                  </span>
                </div>
                <p className="text-[10px] lg:text-[12px] leading-[14px] lg:leading-[16px] tracking-[0.4px] align-middle text-[#010721]">
                  {disbursed.comparison_text}
                </p>
              </div>
            )
          )}

          <div className="w-full py-3 lg:py-[16px] px-3 lg:px-[16px] border border-[#E5E5E5] rounded-[6px] lg:rounded-[8px]">
            <p className="text-[10px] lg:text-[12px] font-normal leading-[14px] lg:leading-[16px] tracking-[0.4px] align-middle text-[#010721] mb-2 lg:mb-4">
              Total Transactions
            </p>
            <div className="flex items-center gap-1 lg:gap-2 mb-1 lg:mb-2">
              <h2 className="text-lg lg:text-[26px] leading-[28px] lg:leading-[40px] tracking-[0px] align-middle font-bold text-[#010721]">
                {analytics?.quick_insights.total_transactions.current}
              </h2>
              <span
                className={`text-[9px] lg:text-[11px] leading-[12px] lg:leading-[16px] tracking-[0.5px] align-middle font-medium p-1 lg:p-[4px] rounded-[10px] ${
                  analytics?.quick_insights.total_transactions.percentage_change
                    ? "text-[#0C614E] bg-[#CDF4E4]"
                    : "text-[#B3261E] bg-[#FFDDDD]"
                }`}
              >
                {`${Number(
                  analytics?.quick_insights.total_transactions.percentage_change.toFixed(
                    1
                  )
                )}%`}
              </span>
            </div>
            <p className="text-[10px] lg:text-[12px] leading-[14px] lg:leading-[16px] tracking-[0.4px] align-middle text-[#010721]">
              {analytics?.quick_insights.total_transactions.comparison_text}
            </p>
          </div>

          <div className="w-full py-3 lg:py-[16px] px-3 lg:px-[16px] border border-[#E5E5E5] rounded-[6px] lg:rounded-[8px]">
            <p className="text-[10px] lg:text-[12px] font-normal leading-[14px] lg:leading-[16px] tracking-[0.4px] align-middle text-[#010721] mb-2 lg:mb-4">
              Total Customers
            </p>
            <div className="flex items-center gap-1 lg:gap-2 mb-1 lg:mb-2">
              <h2 className="text-lg lg:text-[26px] leading-[28px] lg:leading-[40px] tracking-[0px] align-middle font-bold text-[#010721]">
                {analytics?.quick_insights.total_customers.current}
              </h2>
              <span
                className={`text-[9px] lg:text-[11px] leading-[12px] lg:leading-[16px] tracking-[0.5px] align-middle font-medium p-1 lg:p-[4px] rounded-[10px] ${
                  analytics?.quick_insights.total_customers.percentage_change
                    ? "text-[#0C614E] bg-[#CDF4E4]"
                    : "text-[#B3261E] bg-[#FFDDDD]"
                }`}
              >
                {`${Number(
                  analytics?.quick_insights.total_customers.percentage_change.toFixed(
                    1
                  )
                )}%`}
              </span>
            </div>
            <p className="text-[10px] lg:text-[12px] leading-[14px] lg:leading-[16px] tracking-[0.4px] align-middle text-[#010721]">
              {analytics?.quick_insights.total_customers.comparison_text}
            </p>
          </div>
        </div>
      </div>

      <div className="p-3 lg:p-6 rounded-lg border border-[#e0e0e0] overflow-hidden mb-6">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-4 gap-2">
          <p className="font-normal text-sm lg:text-[16px] leading-[20px] lg:leading-[24px] tracking-[0.5px] align-middle text-[#010721]">
            RECENT PAYOUT TRANSACTIONS
          </p>
        </div>

        {analytics?.recent_payout_transactions.length === 0 ? (
          <div className="w-full flex justify-center mb-4">
            {ECHOPAY_SVG().emptyIcon({
              className: "w-[180px] h-[176.5px]",
            })}
          </div>
        ) : (
          <div className="overflow-x-auto rounded-t-[8px]">
            <table className="w-full min-w-max">
              <thead>
                <tr className="border-b border-[#CAC4D0] bg-[#F4F4F3]">
                  <th className="px-2 lg:px-[16px] py-3 lg:py-[16px] text-left flex items-center gap-2">
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
                    Date
                  </th>
                  <th className="px-2 lg:px-[5px] py-3 lg:py-[16px] text-left text-[11px] lg:text-[14px] leading-[16px] lg:leading-[20px] tracking-[0.25px] align-middle font-normal text-[#010721]">
                    Status
                  </th>
                  <th className="px-2 lg:px-[5px] py-3 lg:py-[16px] text-left text-[11px] lg:text-[14px] leading-[16px] lg:leading-[20px] tracking-[0.25px] align-middle font-normal text-[#010721]">
                    Merchant Ref
                  </th>
                </tr>
              </thead>
              <tbody>
                {analytics?.recent_payout_transactions.map((tx, idx) => (
                  <tr
                    key={idx}
                    className="border-b border-[#E0E0E0] hover:bg-[#f8f8f8]"
                  >
                    <td className="px-2 lg:px-[16px] pt-5 lg:py-[19px] text-[11px] lg:text-[14px] leading-[16px] lg:leading-[20px] tracking-[0.25px] align-middle font-normal text-[#010721] flex items-center gap-2">
                      <p className="text-[11px] lg:text-[14px] leading-[16px] lg:leading-[20px] tracking-[0.25px] align-middle font-normal text-[#010721]">
                        {tx.transaction_id.length > 8
                          ? `${tx.transaction_id.slice(
                              0,
                              4
                            )}...${tx.transaction_id.slice(-4)}`.toUpperCase()
                          : tx.transaction_id.toUpperCase()}
                      </p>
                    </td>
                    <td className="px-2 lg:px-[5px] py-3 lg:py-[16px] text-[11px] lg:text-[14px] leading-[16px] lg:leading-[20px] tracking-[0.25px] align-middle font-normal text-[#010721]">
                      {tx.beneficiary}
                    </td>
                    <td className="px-2 lg:px-[5px] py-3 lg:py-[16px] text-[11px] lg:text-[14px] leading-[16px] lg:leading-[20px] tracking-[0.25px] align-middle font-normal text-[#010721]">
                      {`${tx.currency.toUpperCase()}${tx.amount}`}
                    </td>

                    <td className="px-2 lg:px-[5px] py-3 lg:py-[16px] text-[11px] lg:text-[14px] leading-[16px] lg:leading-[20px] tracking-[0.25px] align-middle font-normal text-[#010721]">
                      {timeAgo(tx.date)}
                    </td>
                    <td className="px-2 lg:px-[5px] py-3 lg:py-[16px]">
                      <span
                        className={`inline-block px-2 lg:px-3 py-1 rounded-full text-[10px] lg:text-xs font-medium ${getStatusColor(
                          tx.status
                        )}`}
                      >
                        {capitalizeFirst(tx.status)}
                      </span>
                    </td>
                    <td className="px-2 lg:px-[5px] py-3 lg:py-[16px] text-[11px] lg:text-[14px] leading-[16px] lg:leading-[20px] tracking-[0.25px] align-middle font-normal text-[#010721]">
                      {tx.merchant_reference.length > 8
                        ? `${tx.merchant_reference.slice(
                            0,
                            4
                          )}...${tx.merchant_reference.slice(-4)}`.toUpperCase()
                        : tx.merchant_reference.toUpperCase()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {analytics?.recent_payout_transactions.length !== 0 && (
          <div className="mt-4 lg:mt-6 mb-2 text-center">
            <Link
              href="/transactions"
              className="text-[#0046a7] hover:underline text-xs lg:text-sm font-medium leading-[16px] lg:leading-[20px] tracking-[0.1px] align-middle"
            >
              View All Transactions
            </Link>
          </div>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-4">
        <TransactionVolume />
        <Payouts />
      </div>
    </div>
  );
};

export default AnalyticsUI;
