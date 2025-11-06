"use client";
import { useState } from "react";
import { Plus } from "lucide-react";
import { SettingsTabs } from "./components/SettingsTabs";
import { ApiKeyCard } from "./components/ApiKeyCard";
import { WebhookSettings } from "./components/Webhook";
import { BusinessSettings } from "./components/Business";
import { ProfileSettings } from "./components/Profile";
import { NotificationSettings } from "./components/Notification";
import { SecuritySettings } from "./components/Security";
import { CreateApiKeyDialog } from "./components/CreateApiKeyModal";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import ProtectedRoute from "@/components/ProtectedRoute";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("business");
  const [isCreateKeyDialogOpen, setIsCreateKeyDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleCreateKey = (keyName: string, environment: string) => {
    toast({
      title: "API key created",
      description: `Created ${environment} key: ${keyName}`,
    });
  };

  const handleDeleteKey = (keyType: string) => {
    toast({
      title: "Delete API key",
      description: `${keyType} API key would be deleted.`,
      variant: "destructive",
    });
  };

  return (
    <ProtectedRoute>
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
                  <ApiKeyCard
                    title="Production API Key"
                    type="Live"
                    apiKey="457L-76R5-89UT-23Q1-34D7-67Y2"
                    createdDate="2024-10-01"
                    lastUsedDate="2025-10-15"
                    onDelete={() => handleDeleteKey("Production")}
                  />

                  <ApiKeyCard
                    title="Test API Key"
                    type="Test"
                    apiKey="457L-76R5-89UT-23Q1-34D7-67Y2"
                    createdDate="2024-10-01"
                    lastUsedDate="2025-10-15"
                    onDelete={() => handleDeleteKey("Test")}
                  />
                </div>
              </div>

              {/* Webhook Settings Section */}
              <WebhookSettings />
            </div>
          )}
        </main>
      </div>
    </ProtectedRoute>
  );
};

export default Settings;
