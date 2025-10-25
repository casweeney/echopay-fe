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
    <div className="bg-white rounded-lg border border-[#e0e0e0] p-6 w-[40%]">
      <div className="flex items-center justify-between mb-4">
        <p className="font-normal text-[16px] leading-[24px] tracking-[0.5px] align-middle text-[#010721]">
          PAYOUTS
        </p>
        <div className="flex gap-4">
          <Select defaultValue="myBusiness">
            <SelectTrigger className="w-[168px] border rounded-[32px] p-[8px] border-[#E0E0E0] focus:ring-0 focus:outline-0 ">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="myBusiness">
                  <div className="flex items-center space-x-2">
                    <div>{ECHOPAY_SVG().calendarIcon()}</div>
                    <span className="text-[14px] font-[400] leading-[20px] tracking-[0.25px] text-[#010721]">
                      Last 7 Days
                    </span>
                  </div>
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
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
                  fontSize: "12px",
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
