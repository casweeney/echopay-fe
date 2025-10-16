"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useState } from "react";
import { ECHOPAY_SVG } from "@/assets/svgs";
import { CheckCircle2, Circle, Eye, EyeOff } from "lucide-react";

export default function RegisterUI() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    businessName: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    verificationCode: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const passwordRequirements = [
    { label: "Minimum of 8 characters", met: formData.password.length >= 8 },
    { label: "Lowercase letter(s)", met: /[a-z]/.test(formData.password) },
    { label: "Uppercase letter(s)", met: /[A-Z]/.test(formData.password) },
    {
      label: "A special character (!@#$%*)",
      met: /[!@#$%*]/.test(formData.password),
    },
    { label: "A number (123...)", met: /\d/.test(formData.password) },
  ];

  const steps = [
    { number: 1, name: "Business (Identity)" },
    { number: 2, name: "Contact Details" },
    { number: 3, name: "Password" },
    { number: 4, name: "Verification" },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();

    if (currentStep === 1) {
      if (formData.businessName && formData.firstName && formData.lastName) {
        setCurrentStep(2);
      }
    } else if (currentStep === 2) {
      if (formData.email && formData.phone) {
        setCurrentStep(3);
      }
    } else if (currentStep === 3) {
      if (
        formData.password &&
        formData.confirmPassword &&
        formData.password === formData.confirmPassword
      ) {
        setCurrentStep(4);
      }
    } else if (currentStep === 4) {
      if (formData.verificationCode) {
        console.log("Form submitted:", formData);
      }
    }
  };

  const progressWidth = `${(currentStep / 4) * 100}%`;

  return (
    <div className="flex min-h-screen">
      {/* Left Side - Branding */}
      <div className="hidden z-50 lg:w-1/2 relative lg:flex bg-[url('/bg-4.png')] w-full h-full bg-cover bg-no-repeat text-white px-12 py-[10rem] flex-col">
        <div className="max-w-[500px] mx-auto">
          {/* Logo */}
          <Link href="/home">
            <div className="mb-[4.5rem]">
              <img src="/logo_2.png" alt="logo" className="w-[170px]" />
            </div>
          </Link>

          {/* Main Content */}
          <div className="flex-1 flex flex-col justify-center">
            <h1 className="text-[43px] font-normal leading-[100%] tracking-[0%] mb-3 font-londrina">
              Fast & Secure
            </h1>
            <p className="text-[1.2rem] text-[#FFFEF8] mb-10 font-roboto tracking-[0.05em]">
              Fast, secure, and reliable.
            </p>

            {/* Hero Image */}
            <div className="mb-10 rounded-2xl overflow-hidden">
              <img
                src="/pill2.png"
                alt="Crystal spheres with light rays"
                className="w-full h-auto object-cover"
              />
            </div>

            {/* Feature Cards */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 bg-[#00193633] rounded-full p-4 backdrop-blur-sm shadow border-[0.5px] border-x-0 border-slate-500">
                <div className="flex-shrink-0 w-12 h-12 rounded-full border-2 border-white flex items-center justify-center">
                  {ECHOPAY_SVG().icon1()}
                </div>
                <p className="text-[15px] leading-relaxed font-roboto">
                  Echopay uses top-tier security across every disbursement
                  route.
                </p>
              </div>

              <div className="flex items-center gap-2 bg-[#00193633] rounded-full p-4 backdrop-blur-sm shadow border-[0.5px] border-x-0 border-slate-500">
                <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center">
                  {ECHOPAY_SVG().icon2()}
                </div>
                <p className="text-[15px] leading-relaxed font-roboto">
                  You focus on your payments — we'll handle the safety net.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 bg-[#f8f8f8] p-8 lg:p-12 flex items-center justify-center">
        <div className="w-full max-w-md">
          {/* Progress Steps */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-3">
              {steps.map((step) => (
                <span
                  key={step.number}
                  className={`font-normal font-instrument text-[12px] leading-[100%] ${
                    currentStep === step.number
                      ? "text-[#010721]"
                      : "text-[#8c8c8c]"
                  }`}
                >
                  {step.name}
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
            <h2 className="text-[34px] font-medium text-[#010721] mb-2 font-roboto">
              Create Your Account
            </h2>
            <p className="text-[#010721] text-[14px] font-instrument font-normal">
              Let's get to know you
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleContinue} className="space-y-6">
            {/* Step 1: Business Identity */}
            {currentStep === 1 && (
              <>
                <div>
                  <fieldset className="group border border-[#828783] rounded-lg px-2 py-0 focus-within:ring-[1.5px] hover:border-[#3b3b3b] focus-within:ring-[#4e46e5db] transition-all">
                    <legend className="group-focus-within:text-[#4e46e5db] font-[400] bg-[#f8f8f8] text-[#031300] px-1 text-[12px] leading-[100%] font-instrument">
                      Business Name
                    </legend>
                    <Input
                      type="text"
                      id="businessName"
                      name="businessName"
                      placeholder="Enter the name of your business here"
                      value={formData.businessName}
                      onChange={handleInputChange}
                      className="font-instrument border-0 px-2 pb-4 pt-2 h-auto focus-visible:ring-0 focus-visible:ring-offset-0 text-[15px] bg-transparent placeholder:text-[#828783] placeholder:font-instrument"
                    />
                  </fieldset>
                </div>

                <div>
                  <fieldset className="group border border-[#828783] rounded-lg px-2 py-0 focus-within:ring-[1.5px] hover:border-[#3b3b3b] focus-within:ring-[#4e46e5db] transition-all">
                    <legend className="group-focus-within:text-[#4e46e5db] font-[400] bg-[#f8f8f8] text-[#031300] px-1 text-[12px] leading-[100%] font-instrument">
                      First Name
                    </legend>
                    <Input
                      type="text"
                      id="firstName"
                      name="firstName"
                      placeholder="What is your first name?"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="font-instrument border-0 px-2 pb-4 pt-2 h-auto focus-visible:ring-0 focus-visible:ring-offset-0 text-[15px] bg-transparent placeholder:text-[#828783] placeholder:font-instrument"
                    />
                  </fieldset>
                </div>

                <div>
                  <fieldset className="group border border-[#828783] rounded-lg px-2 py-0 focus-within:ring-[1.5px] hover:border-[#3b3b3b] focus-within:ring-[#4e46e5db] transition-all">
                    <legend className="group-focus-within:text-[#4e46e5db] font-[400] bg-[#f8f8f8] text-[#031300] px-1 text-[12px] leading-[100%] font-instrument">
                      Last Name
                    </legend>
                    <Input
                      type="text"
                      id="lastName"
                      name="lastName"
                      placeholder="What is your last name?"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="font-instrument border-0 px-2 pb-4 pt-2 h-auto focus-visible:ring-0 focus-visible:ring-offset-0 text-[15px] bg-transparent placeholder:text-[#828783] placeholder:font-instrument"
                    />
                  </fieldset>
                </div>
              </>
            )}

            {/* Step 2: Contact Details */}
            {currentStep === 2 && (
              <>
                <div>
                  <fieldset className="group border border-[#828783] rounded-lg px-2 py-0 focus-within:ring-[1.5px] hover:border-[#3b3b3b] focus-within:ring-[#4e46e5db] transition-all">
                    <legend className="group-focus-within:text-[#4e46e5db] font-[400] bg-[#f8f8f8] text-[#031300] px-1 text-[12px] leading-[100%] font-instrument">
                      Work Email Address
                    </legend>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="example@email.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="font-instrument border-0 px-2 pb-4 pt-2 h-auto focus-visible:ring-0 focus-visible:ring-offset-0 text-[15px] bg-transparent placeholder:text-[#828783] placeholder:font-instrument"
                    />
                  </fieldset>
                </div>

                <div>
                  <fieldset className="group border border-[#828783] rounded-lg px-2 py-0 focus-within:ring-[1.5px] hover:border-[#3b3b3b] focus-within:ring-[#4e46e5db] transition-all">
                    <legend className="group-focus-within:text-[#4e46e5db] font-[400] bg-[#f8f8f8] text-[#031300] px-1 text-[12px] leading-[100%] font-instrument">
                      Phone Number
                    </legend>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="09144639537"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="font-instrument border-0 px-2 pb-4 pt-2 h-auto focus-visible:ring-0 focus-visible:ring-offset-0 text-[15px] bg-transparent placeholder:text-[#828783] placeholder:font-instrument"
                    />
                  </fieldset>
                </div>
              </>
            )}

            {/* Step 3: Password */}
            {currentStep === 3 && (
              <>
                <div>
                  <fieldset className="group border border-[#828783] rounded-lg px-2 py-0 focus-within:ring-[1.5px] hover:border-[#3b3b3b] focus-within:ring-[#4e46e5db] transition-all">
                    <legend className="group-focus-within:text-[#4e46e5db] font-[400] bg-[#f8f8f8] text-[#031300] px-1 text-[12px] leading-[100%] font-instrument">
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
                        className="font-instrument border-0 px-2 pb-4 pt-2 h-auto focus-visible:ring-0 focus-visible:ring-offset-0 text-[15px] bg-transparent flex-1 placeholder:text-[#828783] placeholder:font-instrument placeholder:align-bottom"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
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
                <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                  <p className="text-sm font-medium text-gray-900">
                    Your password should contain:
                  </p>
                  <div className="space-y-2">
                    {passwordRequirements.map((req, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        {req.met ? (
                          <div>{ECHOPAY_SVG().fillCheck()}</div>
                        ) : (
                          <div>{ECHOPAY_SVG().circleOutline()}</div>
                        )}
                        <span
                          className={`text-sm ${
                            req.met ? "text-gray-900" : "text-gray-500"
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
                  <fieldset className="group border border-[#828783] rounded-lg px-2 py-0 focus-within:ring-[1.5px] hover:border-[#3b3b3b] focus-within:ring-[#4e46e5db] transition-all">
                    <legend className="group-focus-within:text-[#4e46e5db] font-[400] bg-[#f8f8f8] text-[#031300] px-1 text-[12px] leading-[100%] font-instrument">
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
                        className="font-instrument border-0 px-2 pb-4 pt-2 h-auto focus-visible:ring-0 focus-visible:ring-offset-0 text-[15px] bg-transparent flex-1 placeholder:text-[#828783] placeholder:font-instrument placeholder:align-bottom"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="text-[#8c8c8c] hover:text-[#49454f] transition-colors"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </fieldset>
                </div>
              </>
            )}

            {/* Step 4: Verification */}
            {currentStep === 4 && (
              <>
                <div className="space-y-2">
                  <Label
                    htmlFor="verificationCode"
                    className="text-sm text-[#49454f]"
                  >
                    Verification Code
                  </Label>
                  <Input
                    id="verificationCode"
                    name="verificationCode"
                    type="text"
                    placeholder="Enter the code sent to your email"
                    value={formData.verificationCode}
                    onChange={handleInputChange}
                    className="h-14 bg-white border-[#828783] border-opacity-40 rounded-lg text-[#49454f] placeholder:text-[#8c8c8c]"
                    required
                  />
                </div>
                <p className="text-sm text-[#8c8c8c]">
                  We've sent a verification code to {formData.email}
                </p>
              </>
            )}

            <Button
              type="submit"
              className="w-full h-14 bg-[#0043ce] hover:bg-[#0046a7] text-white rounded-lg text-base font-medium mt-8"
            >
              {currentStep === 4 ? "Complete Registration" : "Continue"}
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
          <div className="mt-8 text-center space-y-4">
            <p className="text-[#8c8c8c]">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-[#010721] font-medium underline"
              >
                Sign in.
              </Link>
            </p>
            <p className="text-sm text-[#8c8c8c]">
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
        </div>
      </div>
    </div>
  );
}
