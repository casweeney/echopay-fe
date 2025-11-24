"use client";

import { ECHOPAY_SVG } from "@/assets/svgs";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { useEffect, useState } from "react";
import { fetchBusinessTransactions } from "@/redux/features/transaction/transactionSlice";
import { Pagination } from "@/types/transaction";
import PaginationWrapper from "@/components/Pagination";
import { timeAgo } from "@/utils/timeAgo";
import { useRouter } from "next/navigation";

const TransactionsUI = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { verificationStatus, business } = useSelector(
    (state: RootState) => state.business
  );
  const { businessTransactions } = useSelector(
    (state: RootState) => state.transaction
  );

  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");

  const [pagination, setPagination] = useState<Pagination>({
    current_page: 1,
    per_page: 10,
    total_items: 0,
    total_pages: 1,
    has_next: false,
    has_previous: false,
  });

  useEffect(() => {
    const handleBusinessTnx = async () => {
      if (business?.id) {
        await dispatch(
          fetchBusinessTransactions({
            id: business.id,
            page: pagination.current_page,
            status: statusFilter,
            type: typeFilter,
          })
        );
        if (businessTransactions?.pagination) {
          setPagination(businessTransactions.pagination);
        }
      }
    };

    handleBusinessTnx();
  }, [business?.id]);

  const handlePageChange = (page: number) => {
    setPagination((prev) => ({ ...prev, current_page: page }));
    if (business?.id) {
      dispatch(
        fetchBusinessTransactions({
          id: business.id,
          page,
          status: statusFilter,
          type: typeFilter,
        })
      );
    }
  };

  const handleStatusChange = (v: string): void => {
    setStatusFilter(v);
    setTypeFilter("all");
    setPagination((p) => ({
      ...p,
      current_page: 1,
    }));
    if (business?.id) {
      dispatch(
        fetchBusinessTransactions({
          id: business.id,
          page: 1,
          status: v,
          type: "all",
        })
      );
    }
  };

  const handleTypeChange = (v: string): void => {
    setTypeFilter(v);
    setStatusFilter("all");
    setPagination((p) => ({
      ...p,
      current_page: 1,
    }));
    if (business?.id) {
      dispatch(
        fetchBusinessTransactions({
          id: business.id,
          page: 1,
          status: "all",
          type: v,
        })
      );
    }
  };

  const capitalizeFirst = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

  const formatNarration = (str: string) =>
    str
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");

  const getShowingText = () => {
    const currentPage =
      businessTransactions?.pagination?.current_page ?? pagination.current_page;
    const perPage =
      businessTransactions?.pagination?.per_page ?? pagination.per_page;
    const totalItems =
      businessTransactions?.pagination?.total_items ?? pagination.total_items;

    const shown = Math.min(currentPage * perPage, totalItems);

    return `Shown ${shown} out of ${totalItems} results`;
  };

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

  const statuses = [
    {
      value: "all",
      item: "All Status",
    },
    {
      value: "pending",
      item: "Pending",
    },
    {
      value: "processing",
      item: "Processing",
    },
    {
      value: "failed",
      item: "Failed",
    },
    {
      value: "completed",
      item: "Completed",
    },
  ];

  return (
    <div className="p-3 lg:p-[24px]">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl lg:text-[32px] font-medium leading-[32px] lg:leading-[40px] text-[#010721] mb-2 align-middle tracking-[0px]">
            Transactions
          </h1>
          <p className="text-xs lg:text-[14px] font-normal leading-[16px] lg:leading-[20px] tracking-[0.25px] align-middle text-[#010721]">
            Create and manage payment links for your customers
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

      <div className="p-3 lg:p-6 rounded-lg border border-[#e0e0e0] overflow-hidden">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-4 gap-2">
          <p className="font-normal text-xs lg:text-[16px] leading-[16px] lg:leading-[24px] tracking-[0.5px] align-middle text-[#010721]">
            {getShowingText()}
          </p>
          <div className="flex gap-2 lg:gap-4 w-full lg:w-auto">
            <Select value={statusFilter} onValueChange={handleStatusChange}>
              <SelectTrigger className="w-full lg:w-[168px] rounded-[32px] border p-2 focus:ring-0 focus:ring-offset-0">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {statuses.map((status) => (
                    <SelectItem key={status.value} value={status.value}>
                      {status.item}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            <Select value={typeFilter} onValueChange={handleTypeChange}>
              <SelectTrigger className="w-full lg:w-[168px] border rounded-[32px] p-[8px] border-[#E0E0E0] focus:ring-0 focus:ring-offset-0 text-xs lg:text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="all">All Type</SelectItem>
                  <SelectItem value="credit">Credit</SelectItem>
                  <SelectItem value="debit">Debit</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        {businessTransactions?.data.length === 0 ? (
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
                    Descripton
                  </th>
                  <th className="px-2 lg:px-[5px] py-3 lg:py-[16px] text-left text-[11px] lg:text-[14px] leading-[16px] lg:leading-[20px] tracking-[0.25px] align-middle font-normal text-[#010721]">
                    Amount
                  </th>
                  <th className="px-2 lg:px-[5px] py-3 lg:py-[16px] text-left text-[11px] lg:text-[14px] leading-[16px] lg:leading-[20px] tracking-[0.25px] align-middle font-normal text-[#010721]">
                    Type
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
                </tr>
              </thead>
              <tbody>
                {businessTransactions?.data.map((tx, idx) => (
                  <tr
                    key={idx}
                    className="border-b border-[#E0E0E0] hover:bg-[#f8f8f8]"
                  >
                    <td className="px-2 lg:px-[16px] pt-5 lg:py-[19px] text-[11px] lg:text-[14px] leading-[16px] lg:leading-[20px] tracking-[0.25px] align-middle font-normal text-[#010721] flex items-center gap-2">
                      <p className="text-[11px] lg:text-[14px] leading-[16px] lg:leading-[20px] tracking-[0.25px] align-middle font-normal text-[#010721]">
                        {tx.id.length > 8
                          ? `${tx.id.slice(0, 4)}...${tx.id.slice(
                              -4
                            )}`.toUpperCase()
                          : tx.id.toUpperCase()}
                      </p>
                    </td>
                    <td className="px-2 lg:px-[5px] py-3 lg:py-[16px] text-[11px] lg:text-[14px] leading-[16px] lg:leading-[20px] tracking-[0.25px] align-middle font-normal text-[#010721]">
                      {formatNarration(tx.narration)}
                    </td>
                    <td className="px-2 lg:px-[5px] py-3 lg:py-[16px] text-[11px] lg:text-[14px] leading-[16px] lg:leading-[20px] tracking-[0.25px] align-middle font-normal text-[#010721]">
                      {tx.currency.toUpperCase()}
                      {capitalizeFirst(String(tx.amount))}
                    </td>
                    <td className="px-2 lg:px-[5px] py-3 lg:py-[16px] text-[11px] lg:text-[14px] leading-[16px] lg:leading-[20px] tracking-[0.25px] align-middle font-normal text-[#010721]">
                      {capitalizeFirst(tx.transaction_type)}
                    </td>
                    <td className="px-2 lg:px-[5px] py-3 lg:py-[16px] text-[11px] lg:text-[14px] leading-[16px] lg:leading-[20px] tracking-[0.25px] align-middle font-normal text-[#010721]">
                      {timeAgo(tx.initiated_at)}
                    </td>
                    <td className="px-2 lg:px-[5px] py-3 lg:py-[16px]">
                      <span
                        className={`inline-block px-2 lg:px-3 py-1 rounded-full text-[10px] lg:text-xs font-medium ${getStatusColor(
                          tx.transaction_status
                        )}`}
                      >
                        {capitalizeFirst(tx.transaction_status)}
                      </span>
                    </td>
                    <td className="px-2 lg:px-[5px] py-3 lg:py-[16px] text-[11px] lg:text-[14px] leading-[16px] lg:leading-[20px] tracking-[0.25px] align-middle font-normal text-[#010721]">
                      {tx.reference.length > 8
                        ? `${tx.reference.slice(0, 4)}...${tx.reference.slice(
                            -4
                          )}`.toUpperCase()
                        : tx.reference.toUpperCase()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {businessTransactions?.data.length !== 0 && (
          <div className="mb-2 w-full flex justify-center md:justify-end lg:justify-end">
            <PaginationWrapper
              pagination={businessTransactions?.pagination ?? pagination}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionsUI;
