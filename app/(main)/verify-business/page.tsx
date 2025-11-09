"use client";

import { ECHOPAY_SVG } from "@/assets/svgs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import {
  fetchCountries,
  fetchStates,
} from "@/redux/features/region/regionSlice";
import {
  fetchBusinessCategories,
  verifyBusiness,
} from "@/redux/features/business/businessSlice";

const VerifyBusiness = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { countries, states } = useSelector((state: RootState) => state.region);
  const { business, businessCategories, verifyData } = useSelector(
    (state: RootState) => state.business
  );

  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [formData, setFormData] = useState({
    businessCategory: "",
    businessWebsite: "",
    phone: "",
    country: "",
    state: "",
    city: "",
    address: "",
    postalCode: "",
    // bvn: "",
  });

  useEffect(() => {
    const response = dispatch(fetchBusinessCategories());
    console.log(response);

    const handleRegions = async () => {
      await dispatch(fetchCountries());
      if (formData.country) {
        await dispatch(fetchStates(formData.country));
      }
    };

    handleRegions();
  }, [dispatch, formData]);

  // const bvnRequirements = [
  //   { label: "11 characters", met: formData.bvn.length === 11 },
  //   { label: "Numbers (123...)", met: /^\d*$/.test(formData.bvn) },
  // ];

  const steps = [
    { number: 1, name: "Business Details" },
    { number: 2, name: "Contact Details" },
    // { number: 3, name: "BVN" },
  ];

  const isStep1Valid = () =>
    formData.businessCategory && formData.businessWebsite;

  const isStep2Valid = () =>
    formData.phone &&
    formData.country &&
    formData.state &&
    formData.city &&
    formData.address &&
    formData.postalCode;

  // const areAllBVNRequirementsMet = () => {
  //   return bvnRequirements.every((req) => req.met);
  // };

  // const isStep3Valid = () => formData.bvn && areAllBVNRequirementsMet();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement> | string,
    name?: string
  ) => {
    if (typeof e === "string" && name) {
      setFormData({
        ...formData,
        [name]: e,
      });
    } else {
      const event = e as React.ChangeEvent<HTMLInputElement>;
      setFormData({
        ...formData,
        [event.target.name]: event.target.value,
      });
    }
  };

  const handleContinue = async (e: React.FormEvent) => {
    e.preventDefault();

    if (currentStep === 1) {
      if (isStep1Valid()) {
        setCompletedSteps([...completedSteps, 1]);
        setCurrentStep(2);
      }
    } else if (currentStep === 2) {
      if (isStep2Valid()) {
        setCompletedSteps([...completedSteps, 2]);

        const payload = {
          phone: formData.phone,
          city: formData.city,
          address: formData.address,
          postal_code: Number(formData.postalCode),
          website: formData.businessWebsite,
          business_category_id: formData.businessCategory,
          state_id: formData.state,
          country_id: formData.country,
        };

        const response = await dispatch(
          verifyBusiness({
            id: business?.id || "",
            payload,
          })
        ).unwrap();
        console.log("Form submitted:", response);
        if (response.status === "success") {
          router.push("/wallet");
        }
      }
    }
  };

  const progressWidth = `${(currentStep / 2) * 100}%`;

  return (
    <ProtectedRoute>
      <div>
        <div className="flex items-center gap-2 mb-14">
          <Link href="/wallet">
            <ArrowLeft className="w-4 h-4 lg:w-5 lg:h-5" />
          </Link>
          <p className="text-[#010721] font-medium text-[22px] md:text-[26px] lg:text-[30px] leading-[40px] tracking-[0px] align-middle">
            Verify Your Business
          </p>
        </div>

        <div className="max-w-[464px] mx-auto">
          {/* Progress Steps */}
          <div className="mb-10">
            <div className="flex items-center justify-between mb-3">
              {steps.map((step) => (
                <span
                  key={step.number}
                  className={`font-normal font-instrument text-[10px] md:text-[12px] lg:text-[12px] leading-[100%] text-center ${
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

          <form onSubmit={handleContinue} className="space-y-8">
            {/* Step 1: Business Identity */}
            {currentStep === 1 && (
              <>
                <p className="text-[#404040] font-normal text-sm lg:text-base leading-[24px] tracking-[0.5px] mb-6">
                  Let’s get to know your business
                </p>
                <div>
                  <fieldset className="group border border-[#828783] rounded-lg px-2 py-0 focus-within:ring-[1.5px] hover:border-[#3b3b3b] focus-within:ring-[#0046A7] transition-all">
                    <legend className="group-focus-within:text-[#0046A7] font-[400] bg-[#f8f8f8] text-[#010721] px-1 text-[12px] leading-[100%] font-instrument">
                      Business Category
                    </legend>
                    <Select
                      name="businessCategory"
                      value={formData.businessCategory}
                      onValueChange={(value) =>
                        handleInputChange(value, "businessCategory")
                      }
                    >
                      <SelectTrigger className="text-[#828783] text-[12px] lg:text-[14px] w-full border-none outline-0 focus:ring-0 focus:ring-offset-0">
                        <SelectValue placeholder="Select business category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {businessCategories.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              <span className="font-instrument text-[12px] lg:text-[14px] font-[400] leading-[20px] tracking-[0.25px] !text-[#010721]">
                                {category.name}
                              </span>
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </fieldset>
                </div>

                <div>
                  <fieldset className="group border border-[#828783] rounded-lg px-2 py-0 focus-within:ring-[1.5px] hover:border-[#3b3b3b] focus-within:ring-[#0046A7] transition-all">
                    <legend className="group-focus-within:text-[#0046A7] font-[400] bg-[#f8f8f8] text-[#010721] px-1 text-[12px] leading-[100%] font-instrument">
                      Business Website
                    </legend>
                    <Input
                      type="text"
                      id="businessWebsite"
                      name="businessWebsite"
                      placeholder="Enter your business website"
                      value={formData.businessWebsite}
                      onChange={handleInputChange}
                      className="font-instrument text-[#1D1B20] border-0 px-2 pb-4 pt-2 h-auto focus-visible:ring-0 focus-visible:ring-offset-0 text-[12px] lg:text-[15px] bg-transparent placeholder:text-[#828783] placeholder:font-instrument placeholder:text-[12px] lg:placeholder:text-[15px]"
                    />
                  </fieldset>
                </div>
              </>
            )}

            {/* Step 2: Contact Details */}
            {currentStep === 2 && (
              <>
                <p className="text-[#404040] font-normal text-sm lg:text-base leading-[24px] tracking-[0.5px] mb-6">
                  Provide your contact details here.
                </p>
                <div>
                  <fieldset className="group border border-[#828783] rounded-lg px-2 py-0 focus-within:ring-[1.5px] hover:border-[#3b3b3b] focus-within:ring-[#0046A7] transition-all">
                    <legend className="group-focus-within:text-[#0046A7] font-[400] bg-[#f8f8f8] text-[#010721] px-1 text-[12px] leading-[100%] font-instrument">
                      Phone Number
                    </legend>
                    <Input
                      id="phone"
                      name="phone"
                      type="phone"
                      placeholder="Enter your phone number"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="font-instrument text-[#1D1B20] border-0 px-2 pb-4 pt-2 h-auto focus-visible:ring-0 focus-visible:ring-offset-0 text-[12px] lg:text-[15px] bg-transparent placeholder:text-[#828783] placeholder:font-instrument placeholder:text-[12px] lg:placeholder:text-[15px]"
                    />
                  </fieldset>
                </div>

                <div>
                  <fieldset className="group border border-[#828783] rounded-lg px-2 py-0 focus-within:ring-[1.5px] hover:border-[#3b3b3b] focus-within:ring-[#0046A7] transition-all">
                    <legend className="group-focus-within:text-[#0046A7] font-[400] bg-[#f8f8f8] text-[#010721] px-1 text-[12px] leading-[100%] font-instrument">
                      Country
                    </legend>
                    <Select
                      name="country"
                      value={formData.country}
                      onValueChange={(value) =>
                        handleInputChange(value, "country")
                      }
                    >
                      <SelectTrigger className="text-[#828783] text-[12px] lg:text-[14px] w-full border-none outline-0 focus:ring-0 focus:ring-offset-0">
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {countries.map((country) => (
                            <SelectItem key={country.id} value={country.id}>
                              <span className="font-instrument text-[12px] lg:text-[14px] font-[400] leading-[20px] tracking-[0.25px] text-[#010721]">
                                {country.name}
                              </span>
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </fieldset>
                </div>

                <div>
                  <fieldset className="group border border-[#828783] rounded-lg px-2 py-0 focus-within:ring-[1.5px] hover:border-[#3b3b3b] focus-within:ring-[#0046A7] transition-all">
                    <legend className="group-focus-within:text-[#0046A7] font-[400] bg-[#f8f8f8] text-[#010721] px-1 text-[12px] leading-[100%] font-instrument">
                      State
                    </legend>
                    <Select
                      name="state"
                      value={formData.state}
                      onValueChange={(value) =>
                        handleInputChange(value, "state")
                      }
                    >
                      <SelectTrigger className="text-[#828783] text-[12px] lg:text-[14px] w-full border-none outline-0 focus:ring-0 focus:ring-offset-0">
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {states.map((state) => (
                            <SelectItem key={state.id} value={state.id}>
                              <span className="font-instrument text-[12px] lg:text-[14px] font-[400] leading-[20px] tracking-[0.25px] text-[#010721]">
                                {state.name}
                              </span>
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </fieldset>
                </div>

                <div>
                  <fieldset className="group border border-[#828783] rounded-lg px-2 py-0 focus-within:ring-[1.5px] hover:border-[#3b3b3b] focus-within:ring-[#0046A7] transition-all">
                    <legend className="group-focus-within:text-[#0046A7] font-[400] bg-[#f8f8f8] text-[#010721] px-1 text-[12px] leading-[100%] font-instrument">
                      City
                    </legend>
                    <Input
                      id="city"
                      name="city"
                      type="text"
                      placeholder="Enter your city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="font-instrument text-[#1D1B20] border-0 px-2 pb-4 pt-2 h-auto focus-visible:ring-0 focus-visible:ring-offset-0 text-[12px] lg:text-[15px] bg-transparent placeholder:text-[#828783] placeholder:font-instrument placeholder:text-[12px] lg:placeholder:text-[15px]"
                    />
                  </fieldset>
                </div>
                <div>
                  <fieldset className="group border border-[#828783] rounded-lg px-2 py-0 focus-within:ring-[1.5px] hover:border-[#3b3b3b] focus-within:ring-[#0046A7] transition-all">
                    <legend className="group-focus-within:text-[#0046A7] font-[400] bg-[#f8f8f8] text-[#010721] px-1 text-[12px] leading-[100%] font-instrument">
                      Address
                    </legend>
                    <Input
                      id="address"
                      name="address"
                      type="text"
                      placeholder="Enter your current address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="font-instrument text-[#1D1B20] border-0 px-2 pb-4 pt-2 h-auto focus-visible:ring-0 focus-visible:ring-offset-0 text-[12px] lg:text-[15px] bg-transparent placeholder:text-[#828783] placeholder:font-instrument placeholder:text-[12px] lg:placeholder:text-[15px]"
                    />
                  </fieldset>
                </div>
                <div>
                  <fieldset className="group border border-[#828783] rounded-lg px-2 py-0 focus-within:ring-[1.5px] hover:border-[#3b3b3b] focus-within:ring-[#0046A7] transition-all">
                    <legend className="group-focus-within:text-[#0046A7] font-[400] bg-[#f8f8f8] text-[#010721] px-1 text-[12px] leading-[100%] font-instrument">
                      Postal Code
                    </legend>
                    <Input
                      id="postalCode"
                      name="postalCode"
                      type="text"
                      placeholder="Enter area postal code"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      className="font-instrument text-[#1D1B20] border-0 px-2 pb-4 pt-2 h-auto focus-visible:ring-0 focus-visible:ring-offset-0 text-[12px] lg:text-[15px] bg-transparent placeholder:text-[#828783] placeholder:font-instrument placeholder:text-[12px] lg:placeholder:text-[15px]"
                    />
                  </fieldset>
                </div>
              </>
            )}

            {/* Step 3: BVN */}
            {/* {currentStep === 3 && (
              // <>
              //   <p className="text-[#404040] font-normal text-[12px] lg:text-base leading-[24px] tracking-[0.5px] mb-6">
              //     We need your bank verification to create a virtual bank
              //     account for your business. You will be able to fund your
              //     wallet and start disbursing funds after your BVN is connected.
              //   </p>
              //   <div>
              //     <fieldset className="group border border-[#828783] rounded-lg px-2 py-0 focus-within:ring-[1.5px] hover:border-[#3b3b3b] focus-within:ring-[#0046A7] transition-all">
              //       <legend className="group-focus-within:text-[#0046A7] font-[400] bg-[#f8f8f8] text-[#010721] px-1 text-[12px] leading-[100%] font-instrument">
              //         Bank Verification Number
              //       </legend>
              //       <div className="flex items-center gap-2">
              //         <Input
              //           id="bvn"
              //           name="bvn"
              //           type="number"
              //           placeholder="Enter your BVN"
              //           value={formData.bvn}
              //           onChange={handleInputChange}
              //           className="font-instrument text-[#1D1B20] border-0 px-2 pb-4 pt-2 h-auto focus-visible:ring-0 focus-visible:ring-offset-0 text-[12px] lg:text-[15px] bg-transparent flex-1 placeholder:text-[#828783] placeholder:font-instrument placeholder:align-bottom placeholder:text-[12px] lg:placeholder:text-[15px]"
              //         />
              //       </div>
              //     </fieldset>
              //   </div>

              //   {/* BVN Requirements */}
            {/* <div className="p-[12px] rounded-[8px] border border-[#E2E2E2] space-y-3">
              //     <p className="text-[12px] lg:text-[14px] font-medium leading-[20px] tracking-[0.1px] text-[#010721] mb-4">
              //       Your BVN should be:
              //     </p>
              //     <div className="space-y-2 font-instrument">
              //       {bvnRequirements.map((req, idx) => (
              //         <div key={idx} className="flex items-center gap-3">
              //           {req.met ? (
              //             <div>
              //               {ECHOPAY_SVG().fillCheck({
              //                 className:
              //                   "w-[18px] h-[18px] lg:w-[20px] lg:h-[20px]",
              //               })}
              //             </div>
              //           ) : (
              //             <div>
              //               {ECHOPAY_SVG().circleOutline({
              //                 className:
              //                   "w-[18px] h-[18px] lg:w-[20px] lg:h-[20px]",
              //               })}
              //             </div>
              //           )}
              //           <span
              //             className={`text-[12px] lg:text-[14px] font-normal leading-[20px] tracking-[0.25px] ${
              //               req.met ? "text-[#010721]" : "text-[#828783]"
              //             }`}
              //           >
              //             {req.label}
              //           </span>
              //         </div>
              //       ))}
              //     </div>
              //   </div> */}
            {/* // </> */}
            {/* )} */}

            <Button
              type="submit"
              disabled={
                (currentStep === 1 && !isStep1Valid()) ||
                (currentStep === 2 && !isStep2Valid())
                // (currentStep === 3 && !isStep3Valid())
              }
              className={`${
                currentStep === 4 ? "hidden" : "block"
              } w-full h-14 bg-[#0046A7] text-[#FFFEF8] rounded-lg text-[12px] lg:text-base font-medium mt-8 font-instrument hover:bg-[#0046A7] disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              Continue
            </Button>
          </form>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default VerifyBusiness;
