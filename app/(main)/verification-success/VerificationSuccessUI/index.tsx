"use client";
import Link from "next/link";
import React from "react";

const VerificationSuccessUI = () => {
  return (
    <div className="h-screen w-full bg-white flex items-center justify-center">
      <div className="flex flex-col items-center gap-2">
        <img src="/success-check.svg" alt="" />
        <p className="font-medium text-[22px] leading-[28px] tracking-[0px] text-[#010721]">
          Verification Successful!
        </p>
        <p className="text-base leading-[140%] tracking-[0%] text-[#010721]">
          Login to your account to continue
        </p>
        <Link
          href={"/login"}
          className="w-[414px] bg-[#0046A7] py-[18px] rounded-[8px] text-[#FFFEF8] text-base font-medium tracking=[0.15px] align-middle flex justify-center items-center"
          onClick={() => {
            document.cookie = "verificationSuccessSeen=true; path=/;";
            typeof window !== "undefined" &&
              localStorage.removeItem("emailVerifiedRecently");
          }}
        >
          Continue to Login
        </Link>
      </div>
    </div>
  );
};

export default VerificationSuccessUI;
