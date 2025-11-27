"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import { ECHOPAY_SVG } from "@/assets/svgs";
import { Eye, EyeOff } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/redux/store";
import { register } from "@/redux/features/auth/authSlice";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function RegisterUI() {
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.auth);

  const route = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [formData, setFormData] = useState({
    businessName: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toggleShowPassword = useCallback(
    () => setShowPassword((prev) => !prev),
    []
  );
  const toggleShowConfirmPassword = useCallback(
    () => setShowConfirmPassword((prev) => !prev),
    []
  );

  const emailValidation = useMemo(() => {
    const robustEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return (
      formData.email.trim() === "" || robustEmailRegex.test(formData.email)
    );
  }, [formData.email]);

  const phoneValidation = useMemo(() => {
    const phoneRegex = /^(\+234\d{10}|0\d{10})$/;
    return formData.phone.trim() === "" || phoneRegex.test(formData.phone);
  }, [formData.phone]);

  const passwordRequirements = useMemo(
    () => [
      { label: "Minimum of 8 characters", met: formData.password.length >= 8 },
      { label: "Lowercase letter(s)", met: /[a-z]/.test(formData.password) },
      { label: "Uppercase letter(s)", met: /[A-Z]/.test(formData.password) },
      {
        label: "A special character (!@#$%*)",
        met: /[!@#$%*]/.test(formData.password),
      },
      { label: "A number (123...)", met: /\d/.test(formData.password) },
    ],
    [formData.password]
  );

  const steps = [
    { number: 1, name: "Business (Identity)" },
    { number: 2, name: "Contact Details" },
    { number: 3, name: "Password" },
  ];

  const isStep1Valid = useMemo(
    () => formData.businessName && formData.firstName && formData.lastName,
    [formData.businessName, formData.firstName, formData.lastName]
  );

  const isStep2Valid = useMemo(
    () =>
      formData.email && formData.phone && emailValidation && phoneValidation,
    [formData.email, formData.phone, emailValidation, phoneValidation]
  );

  const areAllPasswordRequirementsMet = useMemo(
    () => passwordRequirements.every((req) => req.met),
    [passwordRequirements]
  );

  const isStep3Valid = useMemo(
    () =>
      formData.password &&
      formData.confirmPassword &&
      formData.password === formData.confirmPassword &&
      areAllPasswordRequirementsMet,
    [formData.password, formData.confirmPassword, areAllPasswordRequirementsMet]
  );

  const passwordsMatch = useMemo(
    () =>
      formData.confirmPassword === "" ||
      formData.password === formData.confirmPassword,
    [formData.password, formData.confirmPassword]
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  const handleContinue = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (currentStep === 1) {
        if (isStep1Valid) {
          setCompletedSteps((prev) => [...prev, 1]);
          setCurrentStep(2);
        }
      } else if (currentStep === 2) {
        if (isStep2Valid) {
          setCompletedSteps((prev) => [...prev, 2]);
          setCurrentStep(3);
        }
      } else if (currentStep === 3) {
        if (isStep3Valid) {
          setCompletedSteps((prev) => [...prev, 3]);

          try {
            const payload = {
              business_name: formData.businessName,
              name: `${formData.firstName} ${formData.lastName}`,
              email: formData.email,
              phone: formData.phone,
              password: formData.password,
            };

            const resultAction = await dispatch(register(payload)).unwrap();

            if (resultAction && resultAction.status === "success") {
              toast(resultAction.message, {
                type: "success",
              });
              localStorage.setItem(
                "verificationEmail",
                resultAction.data.user.email
              );
              route.push("/verify-email");
            }
          } catch (err: unknown) {
            // console.error("Registration error:", err);
            if (typeof err === "object" && err !== null && "message" in err) {
              const message = String((err as { message: string }).message);

              if (
                message ===
                "Cannot read properties of undefined (reading 'data')"
              ) {
                toast("Check your internet connection", { type: "error" });
                return;
              }
            }

            if (err === "User already exists") {
              toast(err, { type: "error" });
              return;
            }
          }
        }
      }
    },
    [
      currentStep,
      isStep1Valid,
      isStep2Valid,
      isStep3Valid,
      formData,
      dispatch,
      route,
    ]
  );

  const progressWidth = useMemo(
    () => `${(currentStep / 3) * 100}%`,
    [currentStep]
  );

  return (
    <div className="flex min-h-screen">
      {/* Left Side - Branding */}
      <div className="hidden z-50 lg:w-1/2 relative lg:flex bg-[url('/bg-4.svg')] w-full h-full bg-cover bg-no-repeat text-white px-12 py-[10rem] flex-col">
        <div className="max-w-[500px] mx-auto">
          {/* Logo */}
          <Link href="/home">
            <div className="mb-[4.5rem]">{ECHOPAY_SVG().resolvaTwo()}</div>
          </Link>

          {/* Main Content */}
          <div className="flex-1 flex flex-col justify-center">
            {currentStep === 1 && (
              <>
                <h1 className="text-[43px] font-normal leading-[100%] tracking-[0%] mb-3 font-londrina">
                  Fast & Secure
                </h1>
                <p className="text-[1.2rem] text-[#FFFEF8] mb-10 font-roboto tracking-[0.05em]">
                  Fast, secure, and reliable.
                </p>
              </>
            )}

            {currentStep === 2 && (
              <>
                <h1 className="text-[43px] font-normal leading-[100%] tracking-[0%] mb-3 font-londrina">
                  For Small Businesses
                </h1>
                <p className="text-[1.2rem] text-[#FFFEF8] mb-10 font-roboto tracking-[0.05em]">
                  No CAC? No problem.
                </p>
              </>
            )}
          </div>

          <div className="flex-1 flex flex-col justify-center">
            {currentStep === 3 && (
              <>
                <h1 className="text-[43px] font-normal leading-[100%] tracking-[0%] mb-3 font-londrina">
                  Fast & Secure
                </h1>
                <p className="text-[1.2rem] text-[#FFFEF8] mb-10 font-roboto tracking-[0.05em]">
                  Fast, secure, and reliable.
                </p>
              </>
            )}

            {currentStep === 4 && (
              <>
                <h1 className="text-[43px] font-normal leading-[100%] tracking-[0%] mb-3 font-londrina">
                  For Small Businesses
                </h1>
                <p className="text-[1.2rem] text-[#FFFEF8] mb-10 font-roboto tracking-[0.05em]">
                  No CAC? No problem.
                </p>
              </>
            )}

            {/* Hero Image */}
            <div className="mb-10 rounded-2xl overflow-hidden">
              {currentStep === 1 && (
                <img
                  src="/pill2.svg"
                  alt="Crystal spheres with light rays"
                  className="w-full h-auto object-cover"
                />
              )}
              {currentStep === 2 && (
                <img
                  src="/pill3.svg"
                  alt="Crystal spheres with light rays"
                  className="w-full h-auto object-cover"
                />
              )}
              {currentStep === 3 && (
                <img
                  src="/pill2.svg"
                  alt="Crystal spheres with light rays"
                  className="w-full h-auto object-cover"
                />
              )}
              {currentStep === 4 && (
                <img
                  src="/pill3.svg"
                  alt="Crystal spheres with light rays"
                  className="w-full h-auto object-cover"
                />
              )}
            </div>

            {/* Feature Cards */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 bg-[#00193633] rounded-full p-4 backdrop-blur-sm shadow border-[0.5px] border-x-0 border-slate-500">
                <div className="flex-shrink-0 w-12 h-12 rounded-full border-2 border-white flex items-center justify-center">
                  {ECHOPAY_SVG().icon1()}
                </div>
                <p className="text-[15px] leading-relaxed font-roboto">
                  {currentStep === 1 || currentStep === 3
                    ? "Resolva Core uses top-tier security across every disbursement route."
                    : "With just basic KYC, you can start sending payouts instantly."}
                </p>
              </div>

              <div className="flex items-center gap-2 bg-[#00193633] rounded-full p-4 backdrop-blur-sm shadow border-[0.5px] border-x-0 border-slate-500">
                <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center">
                  {ECHOPAY_SVG().icon2()}
                </div>
                <p className="text-[15px] leading-relaxed font-roboto">
                  {currentStep === 1 || currentStep === 3
                    ? "You focus on your payments — we'll handle the safety net."
                    : "Your hustle shouldn't wait for paperwork."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 bg-[#f8f8f8] py-[5.5rem] px-12 lg:p-12 flex items-center justify-center relative">
        <div className="block lg:hidden absolute top-0 left-0 right-0 h-4 bg-[#0046A7]"></div>
        <div className="w-full max-w-md">
          {/* Mobile Logo - Only visible on small screens */}
          <Link href="/home">
            <div className="lg:hidden mb-[5rem] flex justify-center">
              <img src="/logo.svg" alt="logo" className="w-[120px]" />
            </div>
          </Link>
          {/* Progress Steps */}
          <div className="mb-12">
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

          {/* Form Header */}
          <div className="mb-8">
            <h2 className="text-[28px] md:text-[34px] lg:text-[34px] font-medium text-[#010721] mb-2 font-roboto">
              Create Your Account
            </h2>
            <p className="text-[#010721] text-[14px] font-instrument font-normal">
              {"Let's get to know you"}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleContinue} className="space-y-8">
            {/* Step 1: Business Identity */}
            {currentStep === 1 && (
              <>
                <div>
                  <fieldset className="group border border-[#828783] rounded-lg px-2 py-0 focus-within:ring-[1.5px] hover:border-[#3b3b3b] focus-within:ring-[#0046A7] transition-all">
                    <legend className="group-focus-within:text-[#0046A7] font-[400] bg-[#f8f8f8] text-[#010721] px-1 text-[12px] leading-[100%] font-instrument">
                      Business Name
                    </legend>
                    <Input
                      type="text"
                      id="businessName"
                      name="businessName"
                      placeholder="Enter the name of your business here"
                      value={formData.businessName}
                      onChange={handleInputChange}
                      className="font-instrument text-[#1D1B20] border-0 px-2 pb-4 pt-2 h-auto focus-visible:ring-0 focus-visible:ring-offset-0 text-[15px] bg-transparent placeholder:text-[#828783] placeholder:font-instrument"
                    />
                  </fieldset>
                </div>

                <div>
                  <fieldset className="group border border-[#828783] rounded-lg px-2 py-0 focus-within:ring-[1.5px] hover:border-[#3b3b3b] focus-within:ring-[#0046A7] transition-all">
                    <legend className="group-focus-within:text-[#0046A7] font-[400] bg-[#f8f8f8] text-[#010721] px-1 text-[12px] leading-[100%] font-instrument">
                      First Name
                    </legend>
                    <Input
                      type="text"
                      id="firstName"
                      name="firstName"
                      placeholder="What is your first name?"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="font-instrument text-[#1D1B20] border-0 px-2 pb-4 pt-2 h-auto focus-visible:ring-0 focus-visible:ring-offset-0 text-[15px] bg-transparent placeholder:text-[#828783] placeholder:font-instrument"
                    />
                  </fieldset>
                </div>

                <div>
                  <fieldset className="group border border-[#828783] rounded-lg px-2 py-0 focus-within:ring-[1.5px] hover:border-[#3b3b3b] focus-within:ring-[#0046A7] transition-all">
                    <legend className="group-focus-within:text-[#0046A7] font-[400] bg-[#f8f8f8] text-[#010721] px-1 text-[12px] leading-[100%] font-instrument">
                      Last Name
                    </legend>
                    <Input
                      type="text"
                      id="lastName"
                      name="lastName"
                      placeholder="What is your last name?"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="font-instrument text-[#1D1B20] border-0 px-2 pb-4 pt-2 h-auto focus-visible:ring-0 focus-visible:ring-offset-0 text-[15px] bg-transparent placeholder:text-[#828783] placeholder:font-instrument"
                    />
                  </fieldset>
                </div>
              </>
            )}

            {/* Step 2: Contact Details */}
            {currentStep === 2 && (
              <>
                <div>
                  <fieldset
                    className={`group border rounded-lg px-2 py-0 focus-within:ring-[1.5px] transition-all ${
                      !emailValidation
                        ? "border-[#FF383C] focus-within:ring-[#FF383C]"
                        : "border-[#828783] focus-within:ring-[#0046A7]"
                    }`}
                  >
                    <legend
                      className={`group-focus-within:text-[#0046A7] font-[400] bg-[#f8f8f8] px-1 text-[12px] leading-[100%] font-instrument ${
                        !emailValidation
                          ? "text-[#FF383C] group-focus-within:text-[#FF383C]"
                          : "text-[#010721]"
                      }`}
                    >
                      Work Email Address
                    </legend>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="example@email.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="font-instrument text-[#1D1B20] border-0 px-2 pb-4 pt-2 h-auto focus-visible:ring-0 focus-visible:ring-offset-0 text-[15px] bg-transparent placeholder:text-[#828783] placeholder:font-instrument"
                    />
                  </fieldset>
                  <p className="text-[12px] text-[#FF383C] font-instrument pl-3 mt-1">
                    {!emailValidation && "Invalid email address"}
                  </p>
                </div>

                <div>
                  <fieldset
                    className={`group border rounded-lg px-2 py-0 focus-within:ring-[1.5px] transition-all ${
                      !phoneValidation
                        ? "border-[#FF383C] focus-within:ring-[#FF383C]"
                        : "border-[#828783] focus-within:ring-[#0046A7]"
                    }`}
                  >
                    <legend
                      className={`group-focus-within:text-[#0046A7] font-[400] bg-[#f8f8f8] px-1 text-[12px] leading-[100%] font-instrument ${
                        !phoneValidation
                          ? "text-[#FF383C] group-focus-within:text-[#FF383C]"
                          : "text-[#010721]"
                      }`}
                    >
                      Phone Number
                    </legend>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="09144639537"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="font-instrument text-[#1D1B20] border-0 px-2 pb-4 pt-2 h-auto focus-visible:ring-0 focus-visible:ring-offset-0 text-[15px] bg-transparent placeholder:text-[#828783] placeholder:font-instrument"
                    />
                  </fieldset>
                  <p className="text-[12px] text-[#FF383C] font-instrument pl-3 mt-1">
                    {!phoneValidation && "Invalid phone number"}
                  </p>
                </div>
              </>
            )}

            {/* Step 3: Password */}
            {currentStep === 3 && (
              <>
                <div>
                  <fieldset className="group border border-[#828783] rounded-lg px-2 py-0 focus-within:ring-[1.5px] hover:border-[#3b3b3b] focus-within:ring-[#0046A7] transition-all">
                    <legend className="group-focus-within:text-[#0046A7] font-[400] bg-[#f8f8f8] text-[#010721] px-1 text-[12px] leading-[100%] font-instrument">
                      Password
                    </legend>
                    <div className="flex items-center gap-2">
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="****************"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="font-instrument text-[#1D1B20] border-0 px-2 pb-4 pt-2 h-auto focus-visible:ring-0 focus-visible:ring-offset-0 text-[15px] bg-transparent flex-1 placeholder:text-[#828783] placeholder:font-instrument placeholder:align-bottom"
                      />
                      <button
                        type="button"
                        onClick={toggleShowPassword}
                        className="text-[#8c8c8c] hover:text-[#49454f] transition-colors"
                      >
                        {showPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </fieldset>
                </div>

                {/* Password Requirements */}
                <div className="p-[12px] rounded-[8px] border border-[#E2E2E2] space-y-3">
                  <p className="text-sm font-medium text-[#010721] font-instrument ">
                    Your password should contain:
                  </p>
                  <div className="space-y-2 font-instrument">
                    {passwordRequirements.map((req, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        {req.met ? (
                          <div>{ECHOPAY_SVG().fillCheck()}</div>
                        ) : (
                          <div>{ECHOPAY_SVG().circleOutline()}</div>
                        )}
                        <span
                          className={`text-[12px] font-normal ${
                            req.met ? "text-[#010721]" : "text-[#828783]"
                          }`}
                        >
                          {req.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Confirm Password Input */}
                <div>
                  <fieldset
                    className={`group border rounded-lg px-2 py-0 focus-within:ring-[1.5px] transition-all ${
                      !passwordsMatch
                        ? "border-[#FF383C] focus-within:ring-[#FF383C]"
                        : "border-[#828783] focus-within:ring-[#0046A7]"
                    }`}
                  >
                    <legend
                      className={`group-focus-within:text-[#0046A7] font-[400] bg-[#f8f8f8] px-1 text-[12px] leading-[100%] font-instrument ${
                        !passwordsMatch
                          ? "text-[#FF383C] group-focus-within:text-[#FF383C]"
                          : "text-[#010721]"
                      }`}
                    >
                      Confirm Password
                    </legend>
                    <div className="flex items-center gap-2">
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="****************"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className="font-instrument text-[#1D1B20] border-0 px-2 pb-4 pt-2 h-auto focus-visible:ring-0 focus-visible:ring-offset-0 text-[15px] bg-transparent flex-1 placeholder:text-[#828783] placeholder:font-instrument placeholder:align-bottom"
                      />
                      <button
                        type="button"
                        onClick={toggleShowConfirmPassword}
                        className={`transition-colors ${
                          !passwordsMatch
                            ? "text-[#FF383C]"
                            : "text-[#8c8c8c] hover:text-[#49454f]"
                        }`}
                      >
                        {!passwordsMatch ? (
                          <div>{ECHOPAY_SVG().errorIcon()}</div>
                        ) : showConfirmPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </fieldset>
                  <p className="text-[12px] text-[#FF383C] font-instrument pl-3 mt-1">
                    {!passwordsMatch && "Passwords do not match"}
                  </p>
                </div>
              </>
            )}

            <Button
              type="submit"
              disabled={
                (currentStep === 1 && !isStep1Valid) ||
                (currentStep === 2 && !isStep2Valid) ||
                (currentStep === 3 && !isStep3Valid) ||
                loading
              }
              className="w-full h-14 bg-[#0046A7] text-[#FFFEF8] rounded-lg text-base font-medium mt-8 font-instrument hover:bg-[#0046A7] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="h-5 w-5 animate-spin border-2 border-white rounded-full border-t-transparent"></span>
              ) : (
                "Continue"
              )}
            </Button>
          </form>

          {/* Back Button */}
          {currentStep > 1 && (
            <Button
              type="button"
              variant="ghost"
              onClick={() => setCurrentStep(currentStep - 1)}
              className="w-full mt-4 text-[#010721]"
            >
              Back
            </Button>
          )}

          {/* Footer Links */}
          {currentStep === 1 && (
            <div className="mt-8 text-center space-y-6">
              <p className="text-[#8c8c8c] font-instrument">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-[#010721] font-medium underline"
                >
                  Sign in.
                </Link>
              </p>
              <p className="text-sm text-[#8c8c8c] font-instrument">
                By signing up, you agree to our{" "}
                <Link href="/terms" className="text-[#010721] underline">
                  terms of service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-[#010721] underline">
                  data processing policy
                </Link>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
