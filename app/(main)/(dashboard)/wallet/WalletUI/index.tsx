"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { ECHOPAY_SVG } from "@/assets/svgs";
import { CheckCircle, ChevronDown, Info, XCircle } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchBusinessVerificationStatus } from "@/redux/features/business/businessSlice";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { fetchWallets } from "@/redux/features/wallet/walletSlice";
import { WalletFundModal } from "../components/WalletFundModal";
import { fetchBvnStatus } from "@/redux/features/bvn/bvnSlice";
import { fetchTransactions } from "@/redux/features/transaction/transactionSlice";
import { format } from "date-fns";
import { Pagination } from "@/types/transaction";
import PaginationWrapper from "@/components/Pagination";
import { fetchVirtualAccount } from "@/redux/features/account/accountSlice";

const WalletUI = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { verificationStatus, business } = useSelector(
    (state: RootState) => state.business
  );
  const { wallets } = useSelector((state: RootState) => state.wallet);
  const { bvnStatus } = useSelector((state: RootState) => state.bvn);
  const { transactions } = useSelector((state: RootState) => state.transaction);

  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(true);
  const [activeWalletId, setActiveWalletId] = useState<string | null>(() => {
    const saved = localStorage.getItem("activeWalletId");
    return saved || null;
  });

  const [isFundWalletDialogOpen, setIsFundWalletDialogOpen] = useState(false);
  const [pagination, setPagination] = useState<Pagination>({
    current_page: 1,
    per_page: 10,
    total_items: 0,
    total_pages: 1,
    has_next: false,
    has_previous: false,
  });

  const handlePageChange = (page: number) => {
    setPagination((prev) => ({ ...prev, current_page: page }));
    if (activeWalletId) {
      dispatch(fetchTransactions({ id: activeWalletId, page }));
    }
  };

  const handleFetchVirtualAccount = useCallback(async () => {
    if (business?.id) {
      await dispatch(fetchVirtualAccount(business.id));
    }
  }, [dispatch, business]);

  useEffect(() => {
    handleFetchVirtualAccount();
  }, [handleFetchVirtualAccount]);

  const fetchWalletsData = useCallback(async () => {
    if (!business?.id) return;
    await dispatch(fetchWallets(business.id));
  }, [dispatch, business?.id]);

  useEffect(() => {
    fetchWalletsData();
  }, [fetchWalletsData]);

  useEffect(() => {
    const loadBvnStatus = async () => {
      await dispatch(fetchBvnStatus());
    };
    loadBvnStatus();
  }, [dispatch]);

  const fetchVerification = useCallback(async () => {
    if (!business?.id) return;
    await dispatch(fetchBusinessVerificationStatus(business.id));
  }, [dispatch, business?.id]);

  useEffect(() => {
    fetchVerification();
  }, [fetchVerification]);

  useEffect(() => {
    const handleTnx = async () => {
      if (!activeWalletId) return;
      await dispatch(
        fetchTransactions({ id: activeWalletId, page: pagination.current_page })
      );
    };
    handleTnx();
  }, [dispatch, activeWalletId]);

  useEffect(() => {
    if (!wallets || wallets.length === 0) return;

    // If user hasn't selected any wallet yet
    if (!activeWalletId) {
      const ngnWallet = wallets.find(
        (w) => w.currency_symbol.toUpperCase() === "NGN"
      );
      setActiveWalletId(ngnWallet?.id || wallets[0].id);
    }
  }, [wallets, activeWalletId]);

  const activeWallet = useMemo(() => {
    return (
      wallets.find((wallet) => wallet.id === activeWalletId) ||
      wallets[0] ||
      null
    );
  }, [wallets, activeWalletId]);

  const formattedBalance = useMemo(
    () => activeWallet?.balance.toLocaleString() || "",
    [activeWallet]
  );

  const currencyName = useMemo(
    () => activeWallet?.currency_symbol.toUpperCase() || "",
    [activeWallet]
  );

  const capitalizeFirst = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

  const formatNarration = (str: string) =>
    str
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");

  const handleSelectWallet = useCallback((id: string) => {
    setActiveWalletId(id);
    localStorage.setItem("activeWalletId", id); // persist selection
  }, []);

  const currentStatus = useMemo(
    () => verificationStatus?.data?.status || "unknown",
    [verificationStatus]
  );

  const isBusinessVerified = useMemo(
    () => verificationStatus?.data?.status === "verified",
    [verificationStatus]
  );

  const isBvnVerified = useMemo(
    () => bvnStatus?.data?.bvn_verified === true,
    [bvnStatus?.data?.bvn_verified]
  );

  const buttonDisabled = useMemo(
    () => bvnStatus?.data.bvn_verified === false,
    [bvnStatus?.data.bvn_verified]
  );

  const showAccordion = useMemo(() => {
    return !(currentStatus === "in_review" || isBusinessVerified);
  }, [currentStatus, isBusinessVerified]);

  const getStatusMessage = useMemo(() => {
    if (!isBvnVerified) {
      return {
        text: "Verify your BVN to proceed",
        color: "#fdf4e2",
        icon: Info,
      };
    }

    switch (currentStatus) {
      case "pending":
        return {
          text: "Proceed to verify your business",
          color: "#fdf4e2",
          icon: Info,
        };
      case "in_review":
        return {
          text: "Your business verification is under review",
          color: "#d9f0ff",
          icon: Info,
        };
      case "verified":
        return {
          text: "Your business has been verified",
          color: "#cdf4e4",
          icon: CheckCircle,
        };
      case "rejected":
        return {
          text: "Your verification was rejected. Please verify again.",
          color: "#ffdddd",
          icon: XCircle,
        };
      default:
        return { text: "", color: "transparent", icon: Info };
    }
  }, [currentStatus, isBvnVerified]);

  const StatusIcon = getStatusMessage.icon;

  const handleBVNVerifyClick = useCallback(() => {
    router.push("/verify-bvn");
  }, [router]);

  const handleBusinessVerifyClick = useCallback(() => {
    router.push("/verify-business");
  }, [router]);

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
    <div>
      <div className="p-3 lg:p-[24px]">
        {getStatusMessage.text && (
          <div
            className="flex items-center gap-2 p-3 rounded-md mb-8"
            style={{ backgroundColor: getStatusMessage.color }}
          >
            <StatusIcon className="w-5 h-5" />
            <p className="text-sm text-[#010721] font-medium">
              {getStatusMessage.text}
            </p>
          </div>
        )}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-7 gap-4">
          <div>
            <div className="flex flex-row items-center gap-2 lg:gap-4 mb-2">
              <h1 className="text-2xl lg:text-[32px] font-medium leading-[32px] lg:leading-[40px] text-[#010721] align-middle tracking-[0px]">
                Wallet
              </h1>
              <Select
                value={activeWallet?.id}
                onValueChange={handleSelectWallet}
              >
                <SelectTrigger className="w-full lg:w-[70px] h-8 border rounded-[32px] px-[5px] py-[5px] lg:p-[8px] border-[#E0E0E0] focus:ring-0 focus:ring-offset-0 text-xs lg:text-sm">
                  <SelectValue>
                    {activeWallet ? (
                      <div className="flex items-center space-x-2">
                        <span className="text-[12px] lg:text-[14px] font-[400] leading-[16px] lg:leading-[20px] tracking-[0.25px] text-[#010721]">
                          {activeWallet.currency_symbol.toUpperCase()}
                        </span>
                      </div>
                    ) : null}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {wallets.map((wallet) => (
                      <SelectItem key={wallet.id} value={wallet.id}>
                        <div className="flex items-center space-x-2">
                          <span className="text-[12px] lg:text-[14px] font-[400] leading-[16px] lg:leading-[20px] tracking-[0.25px] text-[#010721]">
                            {wallet.currency_symbol.toUpperCase()}
                          </span>
                        </div>
                      </SelectItem>
                    ))}
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
            <button
              disabled={verificationStatus?.data.status !== "verified"}
              onClick={() => setIsFundWalletDialogOpen(true)}
              className="bg-[#0046A7] h-10 lg:h-[56px] px-3 lg:px-[26px] flex items-center justify-center gap-2 border border-[#D9D9D9] rounded-[8px] lg:rounded-[12px] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <p className="font-medium text-[12px] lg:text-[14px] leading-[16px] lg:leading-[20px] tracking-[0.1px] align-middle text-[#FFFFFF]">
                Fund Wallet
              </p>
              <p>
                {ECHOPAY_SVG().addIcon({
                  className: "w-[18px] h-[18px] lg:w-[24px] lg:h-[24px]",
                })}
              </p>
            </button>
            <button
              disabled={verificationStatus?.data.status !== "verified"}
              onClick={() => router.push("/create-disbursement")}
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

        <div className="flex flex-col lg:flex-row gap-4 mb-6 items-start">
          <div className="w-full border border-[#E0E0E0] rounded-[8px] lg:rounded-[12px] p-3 lg:p-[16px] flex-1">
            <div className="mb-4 flex gap-[6px] items-center">
              <p className="font-normal text-sm lg:text-[16px] leading-[20px] lg:leading-[24px] tracking-[0.5px] align-middle text-[#010721]">
                {currencyName} BALANCE
              </p>
            </div>

            <div className="w-full py-3 lg:py-[16px] px-3 lg:px-[16px] border border-[#E5E5E5] rounded-[6px] lg:rounded-[8px]">
              <p className="text-[10px] lg:text-[12px] font-normal leading-[14px] lg:leading-[16px] tracking-[0.4px] align-middle text-[#010721] mb-2 lg:mb-4">
                Payout Balance
              </p>

              <div className="flex items-center gap-2 mb-2">
                <h2 className="text-xl lg:text-[32px] leading-[28px] lg:leading-[40px] tracking-[0px] align-middle font-bold text-[#010721]">
                  {currencyName} {formattedBalance}
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

          {showAccordion && (
            <div className="w-full border border-[#E5E5E5] p-3 lg:p-[16px] rounded-[8px] lg:rounded-[8px] flex-1">
              <div className="flex items-center gap-2 lg:gap-3 pb-3 lg:pb-4 border-b border-[#E5E5E5]">
                <h1 className="text-lg lg:text-[22px] font-medium leading-[24px] lg:leading-[28px] tracking-[0px] text-[#010721]">
                  Your action items
                </h1>
                <div className="flex items-center justify-center w-6 h-6 lg:w-7 lg:h-7 bg-[#0046A7] text-white rounded-full text-sm lg:text-[16px] font-semibold">
                  {isBvnVerified ? "1" : "2"}
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

                {!isBvnVerified && (
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="border-t border-gray-200 pt-3 lg:pt-4 bg-white">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4">
                        <div className="flex items-center gap-2 lg:gap-4">
                          {ECHOPAY_SVG().checkOutline({
                            className:
                              "w-[18px] h-[18px] lg:w-[24px] lg:h-[24px]",
                          })}
                          <span className="text-sm lg:text-base leading-[20px] text-[#010721]">
                            Verify your BVN
                          </span>
                        </div>
                        <Button
                          onClick={handleBVNVerifyClick}
                          className="bg-[#0046A7] hover:bg-[#0046A7] h-10 lg:h-[56px] text-white rounded-[8px] lg:rounded-[12px] px-4 lg:px-6"
                        >
                          Verify BVN
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="border-t border-gray-200 pt-3 lg:pt-4 bg-white">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-2 lg:gap-4">
                        {ECHOPAY_SVG().checkOutline({
                          className:
                            "w-[18px] h-[18px] lg:w-[24px] lg:h-[24px]",
                        })}
                        <span className="text-sm lg:text-base leading-[20px] text-[#010721]">
                          Verify your Business
                        </span>
                      </div>
                      <Button
                        onClick={handleBusinessVerifyClick}
                        disabled={buttonDisabled}
                        className={`${
                          buttonDisabled ? "opacity-60 cursor-not-allowed" : ""
                        } bg-[#0046A7] hover:bg-[#0046A7] h-10 lg:h-[56px] text-white rounded-[8px] lg:rounded-[12px] px-4 lg:px-6`}
                      >
                        Verify Business
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="p-3 lg:p-6 rounded-lg border border-[#e0e0e0] overflow-hidden mb-6">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-4 gap-2">
            <p className="font-normal text-sm lg:text-[16px] leading-[20px] lg:leading-[24px] tracking-[0.5px] align-middle text-[#010721]">
              RECENT TRANSACTIONS
            </p>
            <div className="flex gap-2 lg:gap-4 w-full lg:w-auto">
              <Select defaultValue="allStatus">
                <SelectTrigger className="w-full lg:w-[168px] border rounded-[32px] p-[8px] border-[#E0E0E0] focus:ring-0 focus:ring-offset-0 text-xs lg:text-sm">
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
                <SelectTrigger className="w-full lg:w-[168px] border rounded-[32px] p-[8px] border-[#E0E0E0] focus:ring-0 focus:ring-offset-0 text-xs lg:text-sm">
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

          {transactions?.data.length === 0 ? (
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
                    <th className="px-2 lg:px-[16px] py-3 lg:py-[16px] text-left">
                      <p className="text-[11px] lg:text-[14px] leading-[16px] lg:leading-[20px] tracking-[0.25px] align-middle font-normal text-[#010721]">
                        Reference
                      </p>
                    </th>
                    <th className="px-[5px] py-[16px] text-left text-[11px] lg:text-[14px] leading-[16px] lg:leading-[20px] tracking-[0.25px] align-middle font-normal text-[#010721]">
                      Amount
                    </th>
                    <th className="px-[5px] py-[16px] text-left text-[11px] lg:text-[14px] leading-[16px] lg:leading-[20px] tracking-[0.25px] align-middle font-normal text-[#010721]">
                      Type
                    </th>
                    <th className="px-2 lg:px-[5px] py-3 lg:py-[16px] text-left text-[11px] lg:text-[14px] leading-[16px] lg:leading-[20px] tracking-[0.25px] align-middle font-normal text-[#010721]">
                      Status
                    </th>
                    <th className="px-[5px] py-[16px] text-left text-[11px] lg:text-[14px] leading-[16px] lg:leading-[20px] tracking-[0.25px] align-middle font-normal text-[#010721]">
                      Description
                    </th>
                    <th className="px-2 lg:px-[5px] py-3 lg:py-[16px] text-left text-[11px] lg:text-[14px] leading-[16px] lg:leading-[20px] tracking-[0.25px] align-middle font-normal text-[#010721]">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {transactions?.data.map((tx, idx) => (
                    <tr
                      key={idx}
                      className="border-b border-[#E0E0E0] hover:bg-[#f8f8f8]"
                    >
                      <td className="px-2 lg:px-[16px] py-3 lg:py-[16px]">
                        <p className="text-[11px] lg:text-[14px] leading-[16px] lg:leading-[20px] tracking-[0.25px] align-middle font-normal text-[#010721]">
                          {tx.reference.length > 8
                            ? `${tx.reference.slice(
                                0,
                                4
                              )}...${tx.reference.slice(-4)}`.toUpperCase()
                            : tx.reference.toUpperCase()}
                        </p>
                      </td>
                      <td className="px-[5px] py-[16px] text-[11px] lg:text-[14px] leading-[16px] lg:leading-[20px] tracking-[0.25px] align-middle font-normal text-[#010721]">
                        {/* {activeWallet.currency_symbol.toUpperCase()} */}
                        {capitalizeFirst(String(tx.amount))}
                      </td>
                      <td className="px-[5px] py-[16px] text-[11px] lg:text-[14px] leading-[16px] lg:leading-[20px] tracking-[0.25px] align-middle font-normal text-[#010721]">
                        {capitalizeFirst(tx.transaction_type)}
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
                      <td className="px-[5px] py-[16px] text-[11px] lg:text-[14px] leading-[16px] lg:leading-[20px] tracking-[0.25px] align-middle font-normal text-[#010721]">
                        {formatNarration(tx.narration)}
                      </td>
                      <td className="px-2 lg:px-[5px] py-3 lg:py-[16px] text-[11px] lg:text-[14px] leading-[16px] lg:leading-[20px] tracking-[0.25px] align-middle font-normal text-[#010721]">
                        {format(new Date(tx.initiated_at), "dd/MM/yyyy HH:mm")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        {transactions?.data.length !== 0 && (
          <div className="mb-2 w-full flex justify-center md:justify-end lg:justify-end">
            <PaginationWrapper
              pagination={transactions?.pagination ?? pagination}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
      <WalletFundModal
        isOpen={isFundWalletDialogOpen}
        onClose={() => setIsFundWalletDialogOpen(false)}
      />
    </div>
  );
};

export default WalletUI;
