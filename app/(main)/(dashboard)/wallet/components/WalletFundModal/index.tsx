"use client";

import { useCallback, useEffect, useState } from "react";
import { ChevronDown, ChevronUp, Copy } from "lucide-react";
import { ReusableModal } from "@/components/ReusableModal";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/redux/store";
import { fetchVirtualAccount } from "@/redux/features/account/accountSlice";

interface FundWalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: () => void;
}

interface Account {
  id: string;
  name: string;
  accountNumber: string;
  accountName: string;
  bankName: string;
}

const accounts: Account[] = [
  {
    id: "01",
    name: "Account 01",
    accountNumber: "77886543212",
    accountName: "David Egorp Ikwen",
    bankName: "Wema Bank",
  },
];

export function WalletFundModal({
  isOpen,
  onClose,
  onSubmit,
}: FundWalletModalProps) {
  const [expandedAccount, setExpandedAccount] = useState("01");
  const dispatch = useDispatch<AppDispatch>();
  const { virtualAccount } = useSelector((state: RootState) => state.account);
  const { business } = useSelector((state: RootState) => state.business);

  const handleFetchVirtualAccount = useCallback(async () => {
    if (business?.id) {
      await dispatch(fetchVirtualAccount(business.id));
    }
  }, [dispatch, business]);

  useEffect(() => {
    if (isOpen) {
      handleFetchVirtualAccount();
    }
  }, [isOpen, handleFetchVirtualAccount]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const handleSubmit = () => {
    onSubmit?.();
    onClose();
  };

  return (
    <ReusableModal
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title="Fund Your NGN Wallet"
      description="Fund your NGN wallet by making a transfer to any of the account numbers below through your preferred bank app, NIBSS Instant Payment (NIP) on your internet banking platforms."
      buttonText="I Have Paid"
      showButton={true}
    >
      {/* Maximum Transfer Amount Section */}
      <div className="bg-[#E9F6FF] rounded-lg p-6 mb-6">
        <p className="text-base tracking-[0.5px] font-normal text-[#404040] mb-2">
          Maximum Transfer Amount
        </p>
        <p className="text-[22px] leading-[28px] tracking-[0px] font-medium text-[#010721] mb-2 ">
          NGN 99,000,000.00
        </p>
        <p className="text-base tracking-[0.5px] font-normal text-[#404040]">
          Note: For larger transfers, make multiple payments or send an email to{" "}
          <a
            href="mailto:info@echopay.com"
            className="text-[#0046A7] hover:underline"
          >
            info@echopay.com
          </a>
        </p>
      </div>

      {/* Accounts Section */}
      <div className="space-y-4 mb-8">
        <div className="border-l-4 border-[#0046A7] bg-[#F2FAFF] rounded-[8px] overflow-hidden p-[16px]">
          {/* Account Header */}
          <button
            onClick={() =>
              setExpandedAccount(
                expandedAccount === virtualAccount?.account_number
                  ? ""
                  : virtualAccount?.account_number ?? ""
              )
            }
            className="w-full flex items-center justify-between pb-3 transition-colors"
          >
            <h3 className="text-[22px] leading-[28px] tracking-[0px] font-medium text-[#010721]">
              {virtualAccount?.bank_name}
            </h3>
            {expandedAccount === virtualAccount?.account_number ? (
              <ChevronUp size={24} className="text-[#010721]" />
            ) : (
              <ChevronDown size={24} className="text-[#010721]" />
            )}
          </button>

          {/* Account Details */}
          {expandedAccount === virtualAccount?.account_number && (
            <div className="bg-[#F2FAFF]">
              <div className="flex items-center justify-between py-3 border-t border-[#E5E5EA]">
                <p className="text-base tracking-[0.5px] text-[#404040] font-normal">
                  Currency
                </p>
                <div className="flex items-center gap-2">
                  <p className="text-base tracking-[0.5px] text-[#010721] font-normal">
                    {virtualAccount.currency_symbol.toUpperCase()}
                  </p>
                </div>
              </div>

              {/* Account Number */}
              <div className="flex items-center justify-between py-3 border-t border-[#E5E5EA]">
                <p className="text-base tracking-[0.5px] text-[#404040] font-normal">
                  Account Number
                </p>
                <div className="flex items-center gap-2">
                  <p className="text-base tracking-[0.5px] text-[#010721] font-normal">
                    {virtualAccount.account_number}
                  </p>
                  <button
                    onClick={() => handleCopy(virtualAccount.account_number)}
                    className="text-[#010721] transition-colors"
                    aria-label="Copy account number"
                  >
                    <Copy size={20} />
                  </button>
                </div>
              </div>

              {/* Bank Name */}
              <div className="flex items-center justify-between pt-3 border-t border-[#E5E5EA]">
                <p className="text-base tracking-[0.5px] text-[#404040] font-normal">
                  Bank Name
                </p>
                <div className="flex items-center gap-2">
                  <p className="text-base tracking-[0.5px] text-[#010721] font-normal">
                    {virtualAccount.bank_name}
                  </p>
                  <button
                    onClick={() => handleCopy(virtualAccount.bank_name)}
                    className="text-[#010721] transition-colors"
                    aria-label="Copy bank name"
                  >
                    <Copy size={20} />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </ReusableModal>
  );
}
