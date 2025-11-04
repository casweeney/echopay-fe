"use client";

import {
  BarChart,
  Bar,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ECHOPAY_SVG } from "@/assets/svgs";

export function TransactionVolume() {
  const data = [
    { month: "Jan", value: 40 },
    { month: "Feb", value: 60 },
    { month: "Mar", value: 80 },
    { month: "Apr", value: 50 },
    { month: "May", value: 90 },
    { month: "Jun", value: 70 },
    { month: "Jul", value: 100 },
    { month: "Aug", value: 85 },
    { month: "Sep", value: 75 },
    { month: "Oct", value: 65 },
    { month: "Nov", value: 55 },
    { month: "Dec", value: 110 },
  ];

  return (
    <div className="bg-white rounded-lg border border-[#e0e0e0] p-4 md:p-6 w-full lg:w-[60%]">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4 gap-2">
        <p className="font-normal text-sm md:text-[16px] leading-[20px] md:leading-[24px] tracking-[0.5px] align-middle text-[#010721]">
          TRANSACTION VOLUME
        </p>
        <div className="flex gap-2 md:gap-4 w-full md:w-auto">
          <Select defaultValue="myBusiness">
            <SelectTrigger className="w-full md:w-[168px] border rounded-[32px] p-[8px] border-[#E0E0E0] focus:ring-0 focus:outline-0 text-xs md:text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="myBusiness">
                  <div className="flex items-center space-x-2">
                    <div>
                      {ECHOPAY_SVG().calendarIcon({
                        className: "w-[18px] h-[18px] lg:w-[24px] lg:h-[24px]",
                      })}
                    </div>
                    <span className="text-[12px] md:text-[14px] font-[400] leading-[16px] md:leading-[20px] tracking-[0.25px] text-[#010721]">
                      All Years
                    </span>
                  </div>
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3" stroke="#e0e0e0" />
          <XAxis
            dataKey="month"
            stroke="#010721"
            style={{
              fontSize: "11px",
              fontWeight: 400,
              lineHeight: "16px",
              letterSpacing: "0.4px",
              color: "#010721",
              verticalAlign: "middle",
            }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#ffffff",
              border: "1px solid #e0e0e0",
            }}
          />
          <Bar dataKey="value" fill="#8FC6EB" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
