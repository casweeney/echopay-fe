"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { SettingsTabs } from "../components/SettingsTabs";
import { ApiKeyCard } from "../components/ApiKeyCard";
import { WebhookSettings } from "../components/Webhook";
import { BusinessSettings } from "../components/Business";
// import { ProfileSettings } from "../components/Profile" };
import { NotificationSettings } from "../components/Notification";
import { SecuritySettings } from "../components/Security";
import { CreateApiKeyDialog } from "../components/CreateApiKeyModal";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/redux/store";
import {
  createKey,
  deleteKey,
  fetchApiKeys,
} from "@/redux/features/apiKey/apiKeySlice";
import { toast } from "react-toastify";

const SettingsUI = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { keys } = useSelector((state: RootState) => state.apiKey);
  const { business } = useSelector((state: RootState) => state.business);

  console.log(keys);

  const [activeTab, setActiveTab] = useState("business");
  const [isCreateKeyDialogOpen, setIsCreateKeyDialogOpen] = useState(false);

  useEffect(() => {
    if (business?.id) {
      dispatch(fetchApiKeys(business.id));
    }
  }, [dispatch, business?.id]);

  const handleCopyKey = (key: string) => {
    const secret = key ?? "";
    navigator.clipboard.writeText(secret);

    toast("API key copied");
  };

  const handleCreateKey = async (business_id: string, name: string) => {
    try {
      const response = await dispatch(
        createKey({ business_id, name })
      ).unwrap();
      console.log(response);

      if (response.id && business?.id) {
        toast(`${response.name} API key created successfully`, {
          type: "success",
        });
        setIsCreateKeyDialogOpen(false);
        await dispatch(fetchApiKeys(business?.id));
      }
    } catch (err) {
      console.error("API error:", err);
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
  };

  const handleDeleteKey = (id: string, name: string) => {
    dispatch(deleteKey(id));
    toast(`${name} API key Deleted`, { type: "success" });
  };

  return (
    <div className="min-h-screen bg-background">
      <SettingsTabs activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="max-w-7xl mx-auto p-3 sm:p-4 md:p-6">
        {activeTab === "business" && <BusinessSettings />}

        {/* {activeTab === "profile" && <ProfileSettings />} */}

        {activeTab === "notification" && <NotificationSettings />}

        {activeTab === "security" && <SecuritySettings />}

        {activeTab === "api-keys" && (
          <div className="space-y-4 sm:space-y-6">
            {/* API Keys Section */}
            <div className="p-3 sm:p-[16px] border border-[#E0E0E0] rounded-[12px]">
              <div className="flex items-center justify-between mb-4 sm:mb-6 gap-3">
                <h1 className="text-sm sm:text-base tracking-[0.5px] font-normal text-[#010721]">
                  API KEYS
                </h1>
                <button
                  className="flex items-center justify-center border border-[#0046A7] rounded-[12px] px-4 sm:px-6 h-[48px] sm:h-[56px] text-xs sm:text-[14px] font-medium leading-[20px] tracking-[0.1px] align-middle text-[#0046A7] w-auto whitespace-nowrap"
                  onClick={() => setIsCreateKeyDialogOpen(true)}
                >
                  <Plus className="h-4 w-4 mr-0 md:mr-2 lg:mr-2 flex-shrink-0" />
                  <span className="hidden md:block lg:block">
                    Create New Key
                  </span>
                </button>
              </div>

              <CreateApiKeyDialog
                open={isCreateKeyDialogOpen}
                onOpenChange={setIsCreateKeyDialogOpen}
                onCreateKey={handleCreateKey}
              />

              {keys.length === 0 ? (
                <div className="text-center text-sm text-muted-foreground">
                  Nothing Yet. Create your first key
                </div>
              ) : (
                <div className="space-y-3 sm:space-y-4">
                  {keys.map((key) => (
                    <ApiKeyCard
                      key={key.id}
                      title={key.name}
                      apiKey={key.secret_key}
                      createdDate={key.created_at}
                      lastUsedDate={key.last_used_at}
                      onDelete={() => handleDeleteKey(key.id, key.name)}
                      handleCopy={() => handleCopyKey(key.secret_key)}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Webhook Settings Section */}
            <WebhookSettings />
          </div>
        )}
      </main>
    </div>
  );
};

export default SettingsUI;
