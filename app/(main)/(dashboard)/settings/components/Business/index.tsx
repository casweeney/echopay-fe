"use client";

import { useState } from "react";
import { Pencil, Headphones, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

export const BusinessSettings = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { business } = useSelector((state: RootState) => state.business);

  return (
    <div className="max-w-5xl space-y-4 sm:space-y-6 px-3 sm:px-0">
      {/* Business Information Card */}
      <Card>
        <CardContent className="p-3 sm:p-4">
          <div className="flex items-center justify-between mb-6 sm:mb-8 gap-3">
            <h2 className="text-sm sm:text-base tracking-[0.5px] font-normal align-middle text-[#010721]">
              BUSINESS INFORMATION
            </h2>
            <Button
              variant="outline"
              onClick={() => setIsEditing(!isEditing)}
              className="text-[#0046A7] border-[#0046A7] rounded-[12px] hover:bg-transparent hover:text-[#0046A7] transition-colors font-medium text-xs sm:text-sm tracking-[0.1px] align-middle h-[48px] sm:h-[56px] sm:w-auto whitespace-nowrap"
            >
              <Pencil className="h-[13.5px] w-[13.5px] mr-0 md:mr-2 lg:mr-2 flex-shrink-0" />
              <span className="hidden md:block lg:block">Edit Information</span>
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-x-12 sm:gap-y-8">
            <div>
              <label className="text-xs tracking-[0.4px] align-middle text-[#605E5E] font-normal mb-1 block">
                Business Name
              </label>
              <p className="text-xs sm:text-sm tracking-[0.25px] align-middle text-[#010721] font-normal break-words">
                {business?.name}
              </p>
            </div>

            <div>
              <label className="text-xs tracking-[0.4px] align-middle text-[#605E5E] font-normal mb-1 block">
                Business Category
              </label>
              <p className="text-xs sm:text-sm tracking-[0.25px] align-middle text-[#010721] font-normal break-words">
                {business?.business_category_name}
              </p>
            </div>

            <div>
              <label className="text-xs tracking-[0.4px] align-middle text-[#605E5E] font-normal mb-1 block">
                Business Website
              </label>
              <p className="text-xs sm:text-sm tracking-[0.25px] align-middle text-[#010721] font-normal break-words">
                {business?.website}
              </p>
            </div>

            <div>
              <label className="text-xs tracking-[0.4px] align-middle text-[#605E5E] font-normal mb-1 block">
                Business Phone Number
              </label>
              <p className="text-xs sm:text-sm tracking-[0.25px] align-middle text-[#010721] font-normal break-words">
                {business?.phone}
              </p>
            </div>

            <div>
              <label className="text-xs tracking-[0.4px] align-middle text-[#605E5E] font-normal mb-1 block">
                Address Country
              </label>
              <p className="text-xs sm:text-sm tracking-[0.25px] align-middle text-[#010721] font-normal break-words">
                {business?.country_name}
              </p>
            </div>

            <div>
              <label className="text-xs tracking-[0.4px] align-middle text-[#605E5E] font-normal mb-1 block">
                Address City/State
              </label>
              <p className="text-xs sm:text-sm tracking-[0.25px] align-middle text-[#010721] font-normal break-words">
                {business?.city}
              </p>
            </div>

            <div>
              <label className="text-xs tracking-[0.4px] align-middle text-[#605E5E] font-normal mb-1 block">
                Address Street
              </label>
              <p className="text-xs sm:text-sm tracking-[0.25px] align-middle text-[#010721] font-normal break-words">
                {business?.address}
              </p>
            </div>

            <div>
              <label className="text-xs tracking-[0.4px] align-middle text-[#605E5E] font-normal mb-1 block">
                Address Postal Code
              </label>
              <p className="text-xs sm:text-sm tracking-[0.25px] align-middle text-[#010721] font-normal break-words">
                {business?.postal_code}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Support Card */}
      <Card>
        <CardContent className="p-3 sm:p-4">
          <h2 className="text-sm sm:text-base tracking-[0.5px] font-normal align-middle text-[#010721] mb-4 sm:mb-8">
            SUPPORT
          </h2>
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center gap-3">
              <Headphones className="h-4 w-4 sm:h-5 sm:w-5 text-foreground flex-shrink-0" />
              <span className="text-xs sm:text-sm tracking-[0.25px] align-middle text-[#010721] font-normal">
                Self Service
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-foreground flex-shrink-0" />
              <span className="text-xs sm:text-sm tracking-[0.25px] align-middle text-[#010721] font-normal">
                Email Support
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
