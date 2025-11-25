"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrencies } from "@/redux/features/currency/currencySlice";
import { fetchBankDetails, fetchBanks } from "@/redux/features/bank/bankSlice";
import { SelectGroup } from "@radix-ui/react-select";
import Link from "next/link";
import { initiateDisbursement } from "@/redux/features/disbursement/disbursementSlice";
import DisbursementSuccessDialog from "../components/PayoutSuccessModal";
import { toast } from "react-toastify";
import { fetchApiKeys } from "@/redux/features/apiKey/apiKeySlice";

const CreateDisbursementUI = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { banks, bankDetails, fetchingDetails, error } = useSelector(
    (state: RootState) => state.bank
  );
  const { keys } = useSelector((state: RootState) => state.apiKey);
  const { currencies } = useSelector((state: RootState) => state.currency);
  const { business } = useSelector((state: RootState) => state.business);
  const { loading } = useSelector((state: RootState) => state.payout);
  const [tnxRef, setTnxRef] = useState("");
  const router = useRouter();

  console.log(bankDetails);

  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [formData, setFormData] = useState({
    amount: "",
    bank_code: "",
    account_number: "",
    currency: "",
    merchant_reference: `MERCH-REF-${new Date().toISOString()}`,
    biz_number: business?.biz_number || "",
  });

  const isValidAccountNumber = (value: string) => /^\d{10}$/.test(value);

  useEffect(() => {
    const handleBankDetails = async () => {
      if (isValidAccountNumber(formData.account_number) && formData.bank_code) {
        await dispatch(
          fetchBankDetails({
            account_number: formData?.account_number,
            bank_code: formData?.bank_code,
          })
        );
      }
    };

    handleBankDetails();
  }, [dispatch, formData?.account_number, formData?.bank_code]);

  useEffect(() => {
    if (business?.biz_number) {
      setFormData((prev) => ({ ...prev, biz_number: business.biz_number }));
    }
  }, [business?.biz_number]);

  useEffect(() => {
    const handleApiKeys = async () => {
      if (business?.id) {
        await dispatch(fetchApiKeys(business.id)).unwrap();
      }
    };
    dispatch(fetchCurrencies());
    dispatch(fetchBanks());

    handleApiKeys();
  }, [dispatch, business?.id]);

  const steps = useMemo(
    () => [
      { number: 1, name: "Disbursement Details" },
      { number: 2, name: "Confirm Disbursement" },
    ],
    []
  );

  const isStepValid = useMemo(() => {
    return (
      formData.amount &&
      formData.bank_code &&
      formData.account_number &&
      formData.currency &&
      formData.merchant_reference &&
      formData.biz_number
    );
  }, [
    formData.amount,
    formData.bank_code,
    formData.account_number,
    formData.currency,
    formData.merchant_reference,
    formData.biz_number,
  ]);

  const selectedBankName = useMemo(() => {
    if (!formData.bank_code || !banks?.banks) return "";
    const found = banks.banks.find((bank) => bank.code === formData.bank_code);
    return found?.name || "";
  }, [formData.bank_code, banks?.banks]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement> | string, name?: string) => {
      setFormData((prev) => {
        if (typeof e === "string" && name) {
          return { ...prev, [name]: e };
        } else {
          const event = e as React.ChangeEvent<HTMLInputElement>;
          return { ...prev, [event.target.name]: event.target.value };
        }
      });
    },
    []
  );

  const handleContinue = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (currentStep === 1) {
        if (isStepValid) {
          setCompletedSteps((prev) => [...prev, 1]);
          setCurrentStep(2);
        }
      } else if (currentStep === 2) {
        setCompletedSteps((prev) => [...prev, 2]);

        try {
          const payload = {
            amount: Number(formData.amount),
            bank_code: formData.bank_code,
            account_number: formData.account_number,
            currency: formData.currency.toUpperCase(),
            merchant_reference: formData.merchant_reference,
            biz_number: formData.biz_number,
          };

          const response = await dispatch(
            initiateDisbursement({ ...payload, apiKey: keys[0].secret_key })
          ).unwrap();

          if (response.status === "success") {
            setTnxRef(response.data.reference);
            setShowSuccessDialog(true);
          }
        } catch (err: unknown) {
          // console.error("Payout error:", err);

          if (typeof err === "object" && err !== null && "message" in err) {
            const message = String((err as { message: string }).message);

            if (
              message === "Cannot read properties of undefined (reading 'data')"
            ) {
              toast("Check your internet connection", { type: "error" });
              return;
            }
          }

          if (err === "External service error") {
            toast("Failed to Disburse. Please try again later", {
              type: "error",
            });
          } else if (
            err ===
            "Insufficient funds. Required: ₦115 (Transfer: ₦100 + Fee: ₦15)"
          ) {
            toast("Insuficient funds", { type: "error" });
          } else {
            const message =
              err instanceof Error
                ? err.message
                : typeof err === "string"
                ? err
                : JSON.stringify(err);
            toast.error(message, { type: "error" });
          }
        }
      }
    },
    [currentStep, isStepValid, formData, dispatch, keys]
  );

  const handleViewAllDisbursements = () => {
    setShowSuccessDialog(false);
    router.push("/transactions");
  };

  const handleBack = () => {
    setCurrentStep(1);
  };

  const progressWidth = useMemo(
    () => `${(currentStep / 2) * 100}%`,
    [currentStep]
  );

  return (
    <div className="min-h-screen p-6">
      <DisbursementSuccessDialog
        open={showSuccessDialog}
        onOpenChange={setShowSuccessDialog}
        amount={formData.amount}
        currency={formData.currency}
        merchantReference={formData.merchant_reference}
        transactionReference={tnxRef.toUpperCase()}
        onViewAll={handleViewAllDisbursements}
      />
      <div className="max-w-[45rem]">
        {/* Header */}
        <div className="flex items-center gap-2 mb-14">
          <Link href="/wallet">
            <ArrowLeft className="w-4 h-4 lg:w-5 lg:h-5" />
          </Link>
          <p className="text-[#010721] font-medium text-[22px] md:text-[26px] lg:text-[30px] leading-[40px] tracking-[0px] align-middle">
            Create Disbursement
          </p>
        </div>

        {/* Main Card */}
        <Card className="p-6">
          {/* Stepper */}
          <div className="mb-10">
            <div className="flex items-center justify-between mb-3">
              {steps.map((step) => (
                <span
                  key={step.number}
                  className={`font-normal font-instrument text-[10px] md:text-[12px] lg:text-[14px] leading-[100%] text-center w-1/2 ${
                    currentStep === step.number ||
                    completedSteps.includes(step.number)
                      ? "text-[#010721]"
                      : "text-[#8c8c8c]"
                  }`}
                >
                  {step.name}
                  <div
                    className={`w-[3px] h-[3px] ${
                      currentStep === step.number ||
                      completedSteps.includes(step.number)
                        ? "bg-[#010721]"
                        : "bg-[#CDDBEF]"
                    } rounded-full mx-auto mt-1`}
                  ></div>
                </span>
              ))}
            </div>
            <div className="relative h-2 bg-[#CDDBEF] rounded-full">
              <div
                className="absolute left-0 top-0 h-full bg-[#0046A7] rounded-full transition-all duration-300"
                style={{ width: progressWidth }}
              ></div>
            </div>
          </div>

          <form onSubmit={handleContinue} className="space-y-6">
            {currentStep === 1 && (
              <>
                {/* Instructions */}
                <p className="text-foreground mb-6">
                  Enter disbursement details to send funds.
                </p>

                {/* Form */}
                <div className="space-y-6">
                  {/* Amount */}
                  <div>
                    <fieldset className="group border border-[#828783] rounded-lg px-2 py-0 focus-within:ring-[1.5px] hover:border-[#3b3b3b] focus-within:ring-[#0046A7] transition-all">
                      <legend className="group-focus-within:text-[#0046A7] font-[400] bg-[#f8f8f8] text-[#010721] px-1 text-[12px] leading-[100%] font-instrument">
                        Amount
                      </legend>
                      <Input
                        id="amount"
                        name="amount"
                        type="number"
                        placeholder="Enter the amount you want to send"
                        value={formData.amount}
                        onChange={handleInputChange}
                        className="font-instrument text-[#1D1B20] border-0 px-2 pb-4 pt-2 h-auto focus-visible:ring-0 focus-visible:ring-offset-0 text-[12px] lg:text-[15px] bg-transparent placeholder:text-[#828783] placeholder:font-instrument placeholder:text-[12px] lg:placeholder:text-[15px]"
                        min={0}
                        onKeyDown={(e) => {
                          if (e.key === "-" || e.key === "e") {
                            e.preventDefault();
                          }
                        }}
                        onPaste={(e) => {
                          const paste = e.clipboardData.getData("text");
                          if (paste.includes("-")) {
                            e.preventDefault();
                          }
                        }}
                      />
                    </fieldset>
                  </div>

                  {/* Currency */}
                  <div>
                    <fieldset className="group border border-[#828783] rounded-lg px-2 py-0 focus-within:ring-[1.5px] hover:border-[#3b3b3b] focus-within:ring-[#0046A7] transition-all">
                      <legend className="group-focus-within:text-[#0046A7] font-[400] bg-[#f8f8f8] text-[#010721] px-1 text-[12px] leading-[100%] font-instrument">
                        Currency
                      </legend>
                      <Select
                        name="currency"
                        value={formData.currency}
                        onValueChange={(value) =>
                          handleInputChange(value, "currency")
                        }
                      >
                        <SelectTrigger className="text-[#828783] text-[12px] lg:text-[14px] w-full border-none outline-0 focus:ring-0 focus:ring-offset-0">
                          <SelectValue placeholder="Select currency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {currencies.map((currency) => (
                              <SelectItem
                                key={currency.symbol}
                                value={currency.symbol}
                              >
                                <span className="font-instrument text-[12px] lg:text-[14px] font-[400] leading-[20px] tracking-[0.25px] text-[#010721]">
                                  {currency.name} ({currency.icon})
                                </span>
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </fieldset>
                  </div>

                  {/* Bank Name */}
                  <div>
                    <fieldset className="group border border-[#828783] rounded-lg px-2 py-0 focus-within:ring-[1.5px] hover:border-[#3b3b3b] focus-within:ring-[#0046A7] transition-all">
                      <legend className="group-focus-within:text-[#0046A7] font-[400] bg-[#f8f8f8] text-[#010721] px-1 text-[12px] leading-[100%] font-instrument">
                        Bank Name
                      </legend>
                      <Select
                        name="bank"
                        value={formData.bank_code}
                        onValueChange={(value) =>
                          handleInputChange(value, "bank_code")
                        }
                      >
                        <SelectTrigger className="text-[#828783] text-[12px] lg:text-[14px] w-full border-none outline-0 focus:ring-0 focus:ring-offset-0">
                          <SelectValue placeholder="Select your bank" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {banks?.banks.map((bank) => (
                              <SelectItem key={bank.code} value={bank.code}>
                                <span className="font-instrument text-[12px] lg:text-[14px] font-[400] leading-[20px] tracking-[0.25px] text-[#010721]">
                                  {bank.name}
                                </span>
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </fieldset>
                  </div>

                  {/* Account Number */}
                  <div>
                    <fieldset className="group border border-[#828783] rounded-lg px-2 py-0 focus-within:ring-[1.5px] hover:border-[#3b3b3b] focus-within:ring-[#0046A7] transition-all">
                      <legend className="group-focus-within:text-[#0046A7] font-[400] bg-[#f8f8f8] text-[#010721] px-1 text-[12px] leading-[100%] font-instrument">
                        Account Number
                      </legend>
                      <Input
                        id="account_number"
                        name="account_number"
                        type="number"
                        placeholder="Enter account number"
                        value={formData.account_number}
                        onChange={handleInputChange}
                        className="font-instrument text-[#1D1B20] border-0 px-2 pb-4 pt-2 h-auto focus-visible:ring-0 focus-visible:ring-offset-0 text-[12px] lg:text-[15px] bg-transparent placeholder:text-[#828783] placeholder:font-instrument placeholder:text-[12px] lg:placeholder:text-[15px]"
                        min={0}
                        onKeyDown={(e) => {
                          if (e.key === "-" || e.key === "e") {
                            e.preventDefault();
                          }
                        }}
                        onPaste={(e) => {
                          const paste = e.clipboardData.getData("text");
                          if (paste.includes("-")) {
                            e.preventDefault();
                          }
                        }}
                      />
                    </fieldset>
                    {/* Account Name Verification Status */}
                    {isValidAccountNumber(formData.account_number) &&
                      formData.bank_code && (
                        <div className="mt-2 px-3 py-2.5 rounded-lg border bg-gradient-to-r from-[#E9F6FF] to-[#F0F9FF] border-[#CDDBEF] flex items-center justify-between animate-in fade-in duration-300">
                          {fetchingDetails ? (
                            <div className="flex items-center gap-2.5">
                              <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#0046A7] border-t-transparent"></div>
                              <span className="text-[13px] text-[#404040] font-instrument font-medium">
                                Verifying account...
                              </span>
                            </div>
                          ) : bankDetails !== null ? (
                            <div className="flex items-center gap-3 w-full">
                              <div className="flex items-center justify-center w-5 h-5 rounded-full bg-[#CDF4E4] flex-shrink-0">
                                <svg
                                  className="w-3 h-3 text-[#0C614E]"
                                  fill="none"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2.5"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path d="M5 13l4 4L19 7"></path>
                                </svg>
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-[14px] text-[#010721] font-semibold font-instrument truncate">
                                  {bankDetails?.data?.account_name}
                                </p>
                              </div>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2.5">
                              <div className="flex items-center justify-center w-5 h-5 rounded-full bg-[#ffafaf] flex-shrink-0">
                                <svg
                                  className="w-3 h-3 text-[#B3261E]"
                                  fill="none"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2.5"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                              </div>
                              <span className="text-[13px] text-[#B3261E] font-instrument font-medium">
                                Unable to verify account. Please check details
                                or Internet connection
                              </span>
                            </div>
                          )}
                        </div>
                      )}
                  </div>

                  {/* Merchant Reference */}
                  <div>
                    <fieldset className="group border border-[#828783] rounded-lg px-2 py-0 focus-within:ring-[1.5px] hover:border-[#3b3b3b] focus-within:ring-[#0046A7] transition-all">
                      <legend className="group-focus-within:text-[#0046A7] font-[400] bg-[#f8f8f8] text-[#010721] px-1 text-[12px] leading-[100%] font-instrument">
                        Mechant Reference
                      </legend>
                      <Input
                        id="merchant_reference"
                        name="merchant_reference"
                        type="text"
                        placeholder="E.g., 123456"
                        value={formData.merchant_reference}
                        onChange={handleInputChange}
                        className="font-instrument text-[#1D1B20] border-0 px-2 pb-4 pt-2 h-auto focus-visible:ring-0 focus-visible:ring-offset-0 text-[12px] lg:text-[15px] bg-transparent placeholder:text-[#828783] placeholder:font-instrument placeholder:text-[12px] lg:placeholder:text-[15px]"
                      />
                    </fieldset>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 mt-8">
                  <Button
                    variant="outline"
                    className="flex-1 h-14 w-1/2 rounded-[8px] border border-[#CAC5CD] font-medium text-base tracking-[0.15px] text-[#010721]"
                    onClick={() => router.push("/wallet")}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={
                      (currentStep === 1 && !isStepValid) ||
                      (currentStep === 1 &&
                        !isValidAccountNumber(formData.account_number)) ||
                      (currentStep === 1 && bankDetails === null)
                    }
                    className="w-1/2 h-14 bg-[#0046A7] text-[#FFFEF8] rounded-lg text-[12px] lg:text-base font-medium font-instrument hover:bg-[#0046A7] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Continue
                  </Button>
                </div>
              </>
            )}

            {currentStep === 2 && (
              <>
                {/* Confirmation Summary */}
                <p className="text-[#404040] bg-[#E9F6FF] rounded-[8px] py-[12px] px-[16px] mb-6 text-base tracking-[0.5px]">
                  Please review the details below before confirming. This action
                  cannot be undone.
                </p>

                <div className="mb-8">
                  {/* Amount */}
                  <div className="flex justify-between py-4 border-b border-border">
                    <span className="text-sm text-[#4D4D4D]">Amount</span>
                    <span className="text-sm font-medium text-foreground">
                      {Number(formData.amount).toFixed(2)}
                    </span>
                  </div>

                  {/* Currency */}
                  <div className="flex justify-between py-4 border-b border-border">
                    <span className="text-sm text-[#4D4D4D]">Currency</span>
                    <span className="text-sm font-medium text-foreground">
                      {formData.currency.toUpperCase()}
                    </span>
                  </div>

                  {/* Bank Name */}
                  <div className="flex justify-between py-4 border-b border-border">
                    <span className="text-sm text-[#4D4D4D]">Bank Name</span>
                    <span className="text-sm font-medium text-foreground">
                      {selectedBankName}
                    </span>
                  </div>

                  {/* Account Number */}
                  <div className="flex justify-between py-4 border-b border-border">
                    <span className="text-sm text-[#4D4D4D]">
                      Account Number
                    </span>
                    <span className="text-sm font-medium text-foreground">
                      {formData.account_number}
                    </span>
                  </div>

                  <div className="flex justify-between py-4 border-b border-border">
                    <span className="text-sm text-[#4D4D4D]">Account Name</span>
                    <span className="text-sm font-medium text-foreground">
                      {bankDetails?.data.account_name}
                    </span>
                  </div>

                  {/* Merchant Reference */}
                  <div className="flex justify-between py-4 border-b border-border">
                    <span className="text-sm text-[#4D4D4D]">
                      Merchant Reference
                    </span>
                    <span className="text-sm font-medium text-foreground text-right">
                      {formData.merchant_reference}
                    </span>
                  </div>

                  {/* Total Debit */}
                  <div className="flex justify-between py-4">
                    <span className="text-sm text-[#010721]">Total Debit</span>
                    <span className="text-sm font-medium text-foreground">
                      {Number(formData.amount).toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    onClick={handleBack}
                    className="flex-1 h-14 w-1/2 rounded-[8px] border border-[#CAC5CD] font-medium text-base tracking-[0.15px] text-[#010721]"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-1/2 h-14 bg-[#0046A7] text-[#FFFEF8] rounded-lg text-[12px] lg:text-base font-medium font-instrument hover:bg-[#0046A7] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <span className="h-5 w-5 animate-spin border-2 border-white rounded-full border-t-transparent"></span>
                    ) : (
                      "Confirm & Send"
                    )}
                  </Button>
                </div>
              </>
            )}
          </form>
        </Card>
      </div>
    </div>
  );
};

export default CreateDisbursementUI;
