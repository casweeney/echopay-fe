"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { ECHOPAY_SVG } from "@/assets/svgs";

export default function LoginUI() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isButtonDisabled = !email.trim() || !password.trim();

  const onLogin = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Login attempted with:", { email, password });

    setEmail("");
    setPassword("");
  };

  return (
    <div className="min-h-screen flex mx-auto">
      {/* Left Side - Dark Navy */}
      <div className="hidden z-50 relative lg:flex bg-[url('/bg-4.png')] w-full h-full bg-cover bg-no-repeat text-white px-12 py-[10rem] flex-col">
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
                  You focus on your payments — we&#39;ll handle the safety net.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Light Gray */}
      <div className="w-full bg-[#f8f8f8] flex items-center justify-center py-[5.5rem] px-12 lg:p-12 relative">
        <div className="block lg:hidden absolute top-0 left-0 right-0 h-4 bg-[#0046A7]"></div>
        <div className="w-full max-w-md">
          {/* Mobile Logo - Only visible on small screens */}
          <Link href="/home">
            <div className="lg:hidden mb-[5rem] flex justify-center">
              <img src="/logo.svg" alt="logo" className="w-[120px]" />
            </div>
          </Link>
          <div className="mb-8">
            <h2 className="text-[28px] md:text-[34px] lg:text-[34px] font-roboto font-medium text-[#010721] mb-2 tracking-[0.02em]">
              Login to Your Account
            </h2>
            <p className="text-[#010721] text-[14px] font-instrument">
              Welcome back
            </p>
          </div>

          <form className="space-y-8" onSubmit={onLogin}>
            {/* Email Input */}
            <div>
              <fieldset className="group border border-[#828783] rounded-lg px-2 py-0 focus-within:ring-[1.5px] hover:border-[#3b3b3b] focus-within:ring-[#4e46e5db] transition-all">
                <legend className="group-focus-within:text-[#4e46e5db] font-[400] bg-[#f8f8f8] text-[#031300] px-1 text-[12px] leading-[100%] font-instrument">
                  Work Email Address
                </legend>
                <Input
                  type="email"
                  placeholder="example@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="font-instrument border-0 px-2 pb-4 pt-2 h-auto focus-visible:ring-0 focus-visible:ring-offset-0 text-[15px] bg-transparent placeholder:text-[#828783] placeholder:font-instrument"
                />
              </fieldset>
            </div>

            {/* Password Input */}
            <div>
              <fieldset className="group border border-[#828783] rounded-lg px-2 py-0 focus-within:ring-[1.5px] hover:border-[#3b3b3b] focus-within:ring-[#4e46e5db] transition-all">
                <legend className="group-focus-within:text-[#4e46e5db] font-[400] bg-[#f8f8f8] text-[#031300] px-1 text-[12px] leading-[100%] font-instrument">
                  Password
                </legend>
                <div className="flex items-center gap-2">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="****************"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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

            {/* Continue Button */}
            <Button
              type="submit"
              disabled={isButtonDisabled}
              className="w-full bg-[#0046A7] hover:bg-[#003d8f] text-white h-12 text-base rounded-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#0046a7]"
            >
              Continue
            </Button>

            {/* Sign Up Link */}
            <p className="text-center text-[#828783] text-[16px] font-instrument">
              Do not have an account?{" "}
              <Link
                href="/register"
                className="text-[#010721] font-medium underline hover:text-[#0046a7] transition-colors"
              >
                Create Your Account.
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
