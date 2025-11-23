"use client";

import { ECHOPAY_SVG } from "@/assets/svgs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchBvnStatus, verifyUserBvn } from "@/redux/features/bvn/bvnSlice";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const VerifyBVNUI = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.bvn);
  const [formData, setFormData] = useState({
    bvn: "",
    firstName: "",
    lastName: "",
  });

  const bvnRequirements = [
    { label: "11 characters", met: formData.bvn.length === 11 },
    { label: "Numbers (123...)", met: /^\d*$/.test(formData.bvn) },
  ];

  const areAllBVNRequirementsMet = () => {
    return bvnRequirements.every((req) => req.met);
  };

  const requirementsValid = () =>
    formData.bvn &&
    formData.firstName &&
    formData.lastName &&
    areAllBVNRequirementsMet();

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement> | string, name?: string) => {
      if (typeof e === "string" && name) {
        setFormData((prev) => ({ ...prev, [name]: e }));
      } else {
        const event = e as React.ChangeEvent<HTMLInputElement>;
        setFormData((prev) => ({
          ...prev,
          [event.target.name]: event.target.value,
        }));
      }
    },
    []
  );

  const handleContinue = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      // map camelCase form fields to the expected payload keys (first_name, last_name)
      try {
        const response = await dispatch(
          verifyUserBvn({
            bvn: formData.bvn,
            first_name: formData.firstName,
            last_name: formData.lastName,
          })
        ).unwrap();

        if (response.status === "success") {
          toast(response.message, { type: "success" });
          await dispatch(fetchBvnStatus());
          router.push("/wallet");
        }
      } catch (err: unknown) {
        // console.error(err);

        if (typeof err === "object" && err !== null && "message" in err) {
          const message = String((err as { message: string }).message);

          if (
            message === "Cannot read properties of undefined (reading 'data')"
          ) {
            toast("Check your internet connection", { type: "error" });
            return;
          }
        }

        const message =
          err instanceof Error
            ? err.message
            : typeof err === "string"
            ? err
            : JSON.stringify(err) || "An unexpected error occurred";

        toast(message, { type: "error" });
      }
    },
    [dispatch, formData.bvn, formData.firstName, formData.lastName, router]
  );

  return (
    <div>
      <div className="flex items-center gap-2 mb-14">
        <Link href="/wallet">
          <ArrowLeft className="w-4 h-4 lg:w-5 lg:h-5" />
        </Link>
        <p className="text-[#010721] font-medium text-[22px] md:text-[26px] lg:text-[30px] leading-[40px] tracking-[0px] align-middle">
          Verify Your BVN
        </p>
      </div>

      <div className="max-w-[464px] mx-auto">
        <form onSubmit={handleContinue} className="space-y-8">
          <p className="text-[#404040] font-normal text-[12px] lg:text-base leading-[24px] tracking-[0.5px] mb-6">
            We need your bank verification to create a virtual bank account for
            your business. You will be able to fund your wallet and start
            disbursing funds after your BVN is connected.
          </p>
          <div>
            <fieldset className="group border border-[#828783] rounded-lg px-2 py-0 focus-within:ring-[1.5px] hover:border-[#3b3b3b] focus-within:ring-[#0046A7] transition-all">
              <legend className="group-focus-within:text-[#0046A7] font-[400] bg-[#f8f8f8] text-[#010721] px-1 text-[12px] leading-[100%] font-instrument">
                Bank Verification Number
              </legend>
              <div className="flex items-center gap-2">
                <Input
                  id="bvn"
                  name="bvn"
                  type="number"
                  placeholder="Enter your BVN"
                  value={formData.bvn}
                  onChange={handleInputChange}
                  className="font-instrument text-[#1D1B20] border-0 px-2 pb-4 pt-2 h-auto focus-visible:ring-0 focus-visible:ring-offset-0 text-[12px] lg:text-[15px] bg-transparent flex-1 placeholder:text-[#828783] placeholder:font-instrument placeholder:align-bottom placeholder:text-[12px] lg:placeholder:text-[15px]"
                />
              </div>
            </fieldset>
          </div>

          {/* BVN Requirements */}
          <div className="p-[12px] rounded-[8px] border border-[#E2E2E2] space-y-3">
            <p className="text-[12px] lg:text-[14px] font-medium leading-[20px] tracking-[0.1px] text-[#010721] mb-4">
              Your BVN should be:
            </p>
            <div className="space-y-2 font-instrument">
              {bvnRequirements.map((req, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  {req.met ? (
                    <div>
                      {ECHOPAY_SVG().fillCheck({
                        className: "w-[18px] h-[18px] lg:w-[20px] lg:h-[20px]",
                      })}
                    </div>
                  ) : (
                    <div>
                      {ECHOPAY_SVG().circleOutline({
                        className: "w-[18px] h-[18px] lg:w-[20px] lg:h-[20px]",
                      })}
                    </div>
                  )}
                  <span
                    className={`text-[12px] lg:text-[14px] font-normal leading-[20px] tracking-[0.25px] ${
                      req.met ? "text-[#010721]" : "text-[#828783]"
                    }`}
                  >
                    {req.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <fieldset className="group border border-[#828783] rounded-lg px-2 py-0 focus-within:ring-[1.5px] hover:border-[#3b3b3b] focus-within:ring-[#0046A7] transition-all">
              <legend className="group-focus-within:text-[#0046A7] font-[400] bg-[#f8f8f8] text-[#010721] px-1 text-[12px] leading-[100%] font-instrument">
                First Name
              </legend>
              <div className="flex items-center gap-2">
                <Input
                  id="firstName"
                  name="firstName"
                  type="text"
                  placeholder="Enter your first name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="font-instrument text-[#1D1B20] border-0 px-2 pb-4 pt-2 h-auto focus-visible:ring-0 focus-visible:ring-offset-0 text-[12px] lg:text-[15px] bg-transparent flex-1 placeholder:text-[#828783] placeholder:font-instrument placeholder:align-bottom placeholder:text-[12px] lg:placeholder:text-[15px]"
                />
              </div>
            </fieldset>
          </div>

          <div>
            <fieldset className="group border border-[#828783] rounded-lg px-2 py-0 focus-within:ring-[1.5px] hover:border-[#3b3b3b] focus-within:ring-[#0046A7] transition-all">
              <legend className="group-focus-within:text-[#0046A7] font-[400] bg-[#f8f8f8] text-[#010721] px-1 text-[12px] leading-[100%] font-instrument">
                Last Name
              </legend>
              <div className="flex items-center gap-2">
                <Input
                  id="lastName"
                  name="lastName"
                  type="text"
                  placeholder="Enter your last name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="font-instrument text-[#1D1B20] border-0 px-2 pb-4 pt-2 h-auto focus-visible:ring-0 focus-visible:ring-offset-0 text-[12px] lg:text-[15px] bg-transparent flex-1 placeholder:text-[#828783] placeholder:font-instrument placeholder:align-bottom placeholder:text-[12px] lg:placeholder:text-[15px]"
                />
              </div>
            </fieldset>
          </div>

          <Button
            type="submit"
            disabled={!requirementsValid() || loading}
            className="w-full h-14 bg-[#0046A7] text-[#FFFEF8] rounded-lg text-[12px] lg:text-base font-medium mt-8 font-instrument hover:bg-[#0046A7] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="h-5 w-5 animate-spin border-2 border-white rounded-full border-t-transparent"></span>
            ) : (
              "Continue"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default VerifyBVNUI;
