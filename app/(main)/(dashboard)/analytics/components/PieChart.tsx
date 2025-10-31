"use client";

import {
  PieChart,
  Pie,
  Cell,
  Legend,
  ResponsiveContainer,
  Tooltip,
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

export function Payouts() {
  const data = [
    { name: "Single Transfers", value: 35 },
    { name: "Bulk Transfers", value: 65 },
  ];

  return (
    <div className="bg-white rounded-lg border border-[#e0e0e0] p-4 md:p-6 w-full lg:w-[40%]">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4 gap-2">
        <p className="font-normal text-sm md:text-[16px] leading-[20px] md:leading-[24px] tracking-[0.5px] align-middle text-[#010721]">
          PAYOUTS
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
                      Last 7 Days
                    </span>
                  </div>
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={80}
            dataKey="value"
          >
            <Cell fill="#00BBFF" />
            <Cell fill="#117ED1" />
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: "#ffffff",
              border: "1px solid #e0e0e0",
            }}
          />
          <Legend
            className="rounded-full"
            verticalAlign="bottom"
            height={16}
            formatter={(value) => (
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: 400,
                  lineHeight: "16px",
                  letterSpacing: "0.4px",
                  color: "#010721",
                  verticalAlign: "middle",
                }}
              >
                {value}
              </span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
