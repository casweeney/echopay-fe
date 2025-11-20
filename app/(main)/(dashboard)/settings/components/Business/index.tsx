import { useState } from "react";
import { Pencil, Headphones, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

export const BusinessSettings = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { business } = useSelector((state: RootState) => state.business);

  return (
    <div className="max-w-5xl space-y-6">
      {/* Business Information Card */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-base tracking-[0.5px] font-normal align-middle text-[#010721]">
              BUSINESS INFORMATION
            </h2>
            <Button
              variant="outline"
              onClick={() => setIsEditing(!isEditing)}
              className="text-[#0046A7] border-[#0046A7] rounded-[12px] hover:bg-[#0046A7] transition-colors font-medium text-sm tracking-[0.1px] align-middle h-[56px]"
            >
              <Pencil className="h-[13.5px] w-[13.5px] mr-2" />
              Edit Information
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-x-12 gap-y-8">
            <div>
              <label className="text-xs tracking-[0.4px] align-middle text-[#605E5E] font-normal mb-1 block">
                Business Name
              </label>
              <p className="text-sm tracking-[0.25px] align-middle text-[#010721] font-normal">
                {business?.name}
              </p>
            </div>

            <div>
              <label className="text-xs tracking-[0.4px] align-middle text-[#605E5E] font-normal mb-1 block">
                Business Category
              </label>
              <p className="text-sm tracking-[0.25px] align-middle text-[#010721] font-normal">
                {business?.business_category_name}
              </p>
            </div>

            <div>
              <label className="text-xs tracking-[0.4px] align-middle text-[#605E5E] font-normal mb-1 block">
                Business Website
              </label>
              <p className="text-sm tracking-[0.25px] align-middle text-[#010721] font-normal">
                {business?.website}
              </p>
            </div>

            <div>
              <label className="text-xs tracking-[0.4px] align-middle text-[#605E5E] font-normal mb-1 block">
                Business Phone Number
              </label>
              <p className="text-sm tracking-[0.25px] align-middle text-[#010721] font-normal">
                {business?.phone}
              </p>
            </div>

            <div>
              <label className="text-xs tracking-[0.4px] align-middle text-[#605E5E] font-normal mb-1 block">
                Address Country
              </label>
              <p className="text-sm tracking-[0.25px] align-middle text-[#010721] font-normal">
                {business?.country_name}
              </p>
            </div>

            <div>
              <label className="text-xs tracking-[0.4px] align-middle text-[#605E5E] font-normal mb-1 block">
                Address City/State
              </label>
              <p className="text-sm tracking-[0.25px] align-middle text-[#010721] font-normal">
                {business?.city}
              </p>
            </div>

            <div>
              <label className="text-xs tracking-[0.4px] align-middle text-[#605E5E] font-normal mb-1 block">
                Address Street
              </label>
              <p className="text-sm tracking-[0.25px] align-middle text-[#010721] font-normal">
                {business?.address}
              </p>
            </div>

            <div>
              <label className="text-xs tracking-[0.4px] align-middle text-[#605E5E] font-normal mb-1 block">
                Address Postal Code
              </label>
              <p className="text-sm tracking-[0.25px] align-middle text-[#010721] font-normal">
                {business?.postal_code}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Support Card */}
      <Card>
        <CardContent className="p-4">
          <h2 className="text-base tracking-[0.5px] font-normal align-middle text-[#010721] mb-8">
            SUPPORT
          </h2>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Headphones className="h-5 w-5 text-foreground" />
              <span className="text-sm tracking-[0.25px] align-middle text-[#010721] font-normal">
                Self Service
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-foreground" />
              <span className="text-sm tracking-[0.25px] align-middle text-[#010721] font-normal">
                Email Support
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
