"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Copy } from "lucide-react";
import { ReusableModal } from "@/components/ReusableModal";

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
  {
    id: "02",
    name: "Account 02",
    accountNumber: "12345678901",
    accountName: "Business Account",
    bankName: "GTBank",
  },
];

export function WalletFundModal({
  isOpen,
  onClose,
  onSubmit,
}: FundWalletModalProps) {
  const [expandedAccount, setExpandedAccount] = useState<string>("01");

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
      <div className="bg-blue-50 rounded-lg p-6 mb-6">
        <p className="text-sm font-medium text-gray-600 mb-2">
          Maximum Transfer Amount
        </p>
        <p className="text-2xl font-bold text-foreground mb-4">
          NGN 99,000,000.00
        </p>
        <p className="text-sm text-gray-600">
          Note: For larger transfers, make multiple payments or send an email to{" "}
          <a
            href="mailto:info@echopay.com"
            className="text-blue-600 hover:underline"
          >
            info@echopay.com
          </a>
        </p>
      </div>

      {/* Accounts Section */}
      <div className="space-y-4 mb-8">
        {accounts.map((account) => (
          <div
            key={account.id}
            className="border-l-4 border-blue-600 bg-gray-50 rounded-lg overflow-hidden"
          >
            {/* Account Header */}
            <button
              onClick={() =>
                setExpandedAccount(
                  expandedAccount === account.id ? "" : account.id
                )
              }
              className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-100 transition-colors"
            >
              <h3 className="text-lg font-semibold text-foreground">
                {account.name}
              </h3>
              {expandedAccount === account.id ? (
                <ChevronUp size={24} className="text-gray-600" />
              ) : (
                <ChevronDown size={24} className="text-gray-600" />
              )}
            </button>

            {/* Account Details */}
            {expandedAccount === account.id && (
              <div className="border-t border-gray-200 px-6 py-4 bg-white space-y-4">
                {/* Account Number */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Account Number</p>
                    <p className="text-base font-medium text-foreground">
                      {account.accountNumber}
                    </p>
                  </div>
                  <button
                    onClick={() => handleCopy(account.accountNumber)}
                    className="text-gray-500 hover:text-gray-700 transition-colors"
                    aria-label="Copy account number"
                  >
                    <Copy size={20} />
                  </button>
                </div>

                {/* Account Name */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Account Name</p>
                    <p className="text-base font-medium text-foreground">
                      {account.accountName}
                    </p>
                  </div>
                  <button
                    onClick={() => handleCopy(account.accountName)}
                    className="text-gray-500 hover:text-gray-700 transition-colors"
                    aria-label="Copy account name"
                  >
                    <Copy size={20} />
                  </button>
                </div>

                {/* Bank Name */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Bank Name</p>
                    <p className="text-base font-medium text-foreground">
                      {account.bankName}
                    </p>
                  </div>
                  <button
                    onClick={() => handleCopy(account.bankName)}
                    className="text-gray-500 hover:text-gray-700 transition-colors"
                    aria-label="Copy bank name"
                  >
                    <Copy size={20} />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </ReusableModal>
  );
}
