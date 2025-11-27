"use client";

// import Cookies from "universal-cookie";
import { useState, useCallback, useMemo } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { ECHOPAY_SVG } from "@/assets/svgs";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/redux/store";
import { login } from "@/redux/features/auth/authSlice";
import { useRouter } from "next/navigation";

import { toast } from "react-toastify";
import { fetchUser } from "@/redux/features/user/userSlice";
import {
  fetchBusinesses,
  fetchBusinessVerificationStatus,
  fetchCurrentBusiness,
} from "@/redux/features/business/businessSlice";
// import { fetchWallets } from "@/redux/features/wallet/walletSlice";
// import { fetchBvnStatus } from "@/redux/features/bvn/bvnSlice";

export default function LoginUI() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const { loading } = useSelector((state: RootState) => state.auth);

  const [redirecting, setRedirecting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const isButtonDisabled = useMemo(() => {
    return !formData.email.trim() || !formData.password.trim();
  }, [formData.email, formData.password]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }, []);

  const onLogin = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      try {
        const response = await dispatch(login(formData)).unwrap();

        // console.log("Login response:", response);

        if (response.status === "success") {
          setRedirecting(true);
          // toast("Login successful!", { type: "success" });
          dispatch(fetchUser());
          const res = await dispatch(fetchCurrentBusiness()).unwrap();
          router.push("/analytics");
          dispatch(fetchBusinesses());
          dispatch(fetchBusinessVerificationStatus(res.data.id));
          // dispatch(fetchWallets(res.data.id));
          // dispatch(fetchBvnStatus());
        }
      } catch (err: unknown) {
        console.error("Login error:", err);
        if (err === "Unauthorized") {
          toast("Invalid email or password.", { type: "error" });
        }

        if (typeof err === "object" && err !== null && "message" in err) {
          const message = String((err as { message: string }).message);

          if (
            message === "Cannot read properties of undefined (reading 'data')"
          ) {
            toast("Check your internet connection", { type: "error" });
            return;
          }
        }
      }
    },
    [dispatch, router, formData]
  );

  return (
    <div className="h-screen flex mx-auto">
      {/* Left Side - Dark Navy */}
      <div className="hidden z-50 relative lg:flex bg-[#001936] bg-[url('/bg-4.svg')] w-full min-h-screen bg-cover bg-no-repeat text-white px-12 py-[10rem] flex-col">
        <div className="max-w-[500px] mx-auto">
          {/* Logo */}
          <Link href="/home">
            <div className="mb-[4.5rem]">{ECHOPAY_SVG().resolvaTwo()}</div>
          </Link>

          {/* Main Content */}
          <div className="flex-1 flex flex-col justify-center">
            <h1 className="text-[24px] font-light leading-[100%] tracking-[0%] mb-3 font-londrina">
              Fast & Secure
            </h1>
            <p className="text-[1rem] text-[#FFFEF8] mb-10 font-roboto tracking-[0.05em]">
              Fast, secure, and reliable.
            </p>

            {/* <div className="mb-10 rounded-2xl overflow-hidden">
              <img
                src="/pill2.svg"
                alt="Crystal spheres with light rays"
                className="w-full h-auto object-cover"
              />
            </div> */}

            <div className="space-y-6">
              <div className="flex items-center gap-2 bg-[#00193633] rounded-full p-4 backdrop-blur-sm shadow border-[0.5px] border-x-0 border-slate-500">
                <div className="flex-shrink-0 w-12 h-12 rounded-full border-2 border-white flex items-center justify-center">
                  {ECHOPAY_SVG().icon1()}
                </div>
                <p className="text-[15px] leading-relaxed font-roboto">
                  Resolva Core uses top-tier security across every disbursement
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

      {/* Right Side */}
      <div className="w-full bg-[#f8f8f8] flex items-center justify-center py-[5.5rem] px-12 lg:p-12 relative">
        <div className="block lg:hidden absolute top-0 left-0 right-0 h-4 bg-[#0046A7]"></div>
        <div className="w-full max-w-md">
          <Link href="/home">
            <div className="lg:hidden mb-[5rem] flex justify-center">
              {ECHOPAY_SVG().resolvaOne()}
            </div>
          </Link>
          <div className="mb-8">
            <h2 className="text-[22px] md:text-[28px] font-roboto font-medium text-[#010721] mb-2">
              Login to Your Account
            </h2>
            <p className="text-[#010721] text-[14px] font-instrument">
              Welcome back
            </p>
          </div>

          <form className="space-y-8" onSubmit={onLogin}>
            {/* Email Input */}
            <fieldset className="group border border-[#828783] rounded-lg px-2 py-0 focus-within:ring-[1.5px] hover:border-[#3b3b3b] focus-within:ring-[#4e46e5db] transition-all">
              <legend className="group-focus-within:text-[#4e46e5db] font-[400] bg-[#f8f8f8] text-[#031300] px-1 text-[12px] leading-[100%] font-instrument">
                Work Email Address
              </legend>
              <Input
                name="email"
                type="email"
                placeholder="example@gmail.com"
                value={formData.email}
                onChange={handleChange}
                className="font-instrument border-0 px-2 pb-4 pt-2 h-auto focus-visible:ring-0 focus-visible:ring-offset-0 text-[15px] bg-transparent placeholder:text-[#828783]"
              />
            </fieldset>

            {/* Password Input */}
            <fieldset className="group border border-[#828783] rounded-lg px-2 py-0 focus-within:ring-[1.5px] hover:border-[#3b3b3b] focus-within:ring-[#4e46e5db] transition-all">
              <legend className="group-focus-within:text-[#4e46e5db] font-[400] bg-[#f8f8f8] text-[#031300] px-1 text-[12px] leading-[100%] font-instrument">
                Password
              </legend>
              <div className="flex items-center gap-2">
                <Input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="****************"
                  value={formData.password}
                  onChange={handleChange}
                  className="font-instrument border-0 px-2 pb-4 pt-2 h-auto focus-visible:ring-0 focus-visible:ring-offset-0 text-[15px] bg-transparent placeholder:text-[#828783]"
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

            <Button
              type="submit"
              disabled={isButtonDisabled || loading || redirecting}
              className="w-full bg-[#0046A7] hover:bg-[#003d8f] text-white h-12 text-base rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading || redirecting ? (
                <span className="h-5 w-5 animate-spin-fast border-2 border-white rounded-full border-t-transparent"></span>
              ) : (
                "Continue"
              )}
            </Button>

            <p className="text-center text-[#828783] text-[16px] font-instrument">
              Do not have an account?{" "}
              <Link
                href="/register"
                className="text-[#010721] font-medium underline hover:text-[#0046a7]"
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
