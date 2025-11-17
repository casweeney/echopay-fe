"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { SettingsTabs } from "./components/SettingsTabs";
import { ApiKeyCard } from "./components/ApiKeyCard";
import { WebhookSettings } from "./components/Webhook";
import { BusinessSettings } from "./components/Business";
import { ProfileSettings } from "./components/Profile";
import { NotificationSettings } from "./components/Notification";
import { SecuritySettings } from "./components/Security";
import { CreateApiKeyDialog } from "./components/CreateApiKeyModal";
import { useToast } from "@/hooks/use-toast";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import {
  createKey,
  deleteKey,
  fetchApiKeys,
} from "@/redux/features/apiKey/apiKeySlice";

const Settings = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { keys } = useSelector((state: RootState) => state.apiKey);
  const { business } = useSelector((state: RootState) => state.business);

  console.log(keys);

  const [activeTab, setActiveTab] = useState("business");
  const [isCreateKeyDialogOpen, setIsCreateKeyDialogOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (business?.id) {
      dispatch(fetchApiKeys(business.id));
    }
  }, [dispatch, business?.id]);

  const handleCreateKey = async (business_id: string, name: string) => {
    const response = await dispatch(createKey({ business_id, name })).unwrap();
    console.log(response);

    if (response.id && business?.id) {
      await dispatch(fetchApiKeys(business?.id));
    }
    toast({
      title: "API key created",
      description: `Created key: ${name}`,
    });
  };

  const handleDeleteKey = async (id: string, name: string) => {
    await dispatch(deleteKey(id));
    toast({
      title: "Delete API key",
      description: `${name} API key would be deleted.`,
      variant: "destructive",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <SettingsTabs activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="max-w-7xl mx-auto p-6">
        {activeTab === "business" && <BusinessSettings />}

        {activeTab === "profile" && <ProfileSettings />}

        {activeTab === "notification" && <NotificationSettings />}

        {activeTab === "security" && <SecuritySettings />}

        {activeTab === "api-keys" && (
          <div className="space-y-6">
            {/* API Keys Section */}
            <div className="p-[16px] border border-[#E0E0E0] rounded-[12px]">
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-base tracking-[0.5px] font-normal text-[#010721]">
                  API KEYS
                </h1>
                <button
                  className="flex items-center justify-center border border-[#0046A7] rounded-[12px] w-[167px] h-[56px] text-[14px] font-medium leading-[20px] tracking-[0.1px] align-middle text-[#0046A7]"
                  onClick={() => setIsCreateKeyDialogOpen(true)}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create New Key
                </button>
              </div>

              <CreateApiKeyDialog
                open={isCreateKeyDialogOpen}
                onOpenChange={setIsCreateKeyDialogOpen}
                onCreateKey={handleCreateKey}
              />

              <div className="space-y-4">
                {keys.map((key) => (
                  <ApiKeyCard
                    key={key.id}
                    title={key.name}
                    apiKey={key.secret_key}
                    createdDate={key.created_at}
                    lastUsedDate={key.last_used_at}
                    onDelete={() => handleDeleteKey(key.id, key.name)}
                  />
                ))}
              </div>
            </div>

            {/* Webhook Settings Section */}
            <WebhookSettings />
          </div>
        )}
      </main>
    </div>
  );
};

export default Settings;
