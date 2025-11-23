"use client";

import { cn } from "@/lib/utils";

interface Tab {
  id: string;
  label: string;
}

const tabs: Tab[] = [
  { id: "business", label: "Business" },
  // { id: "profile", label: "Profile" },
  { id: "notification", label: "Notification" },
  { id: "security", label: "Security" },
  { id: "api-keys", label: "API Keys" },
];

interface SettingsTabsProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export const SettingsTabs = ({ activeTab, onTabChange }: SettingsTabsProps) => {
  return (
    <div className="px-4 sm:px-6 md:px-6 lg:px-6">
      <nav
        className="flex gap-2 sm:px-6 border border-[#E0E0E0] rounded-[8px] overflow-x-auto mt-6 py-2 px-3 w-full sm:w-[400px]"
        aria-label="Settings navigation"
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "rounded-[4px] text-[#010721] px-2 py-1 text-xs sm:text-sm font-medium relative whitespace-nowrap flex-shrink-0 sm:flex-shrink transition-all",
              "hover:ring-1 hover:ring-[#E0E0E0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              activeTab === tab.id && "ring-1 ring-[#E0E0E0]"
            )}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
};
