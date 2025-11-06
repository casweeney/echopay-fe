import { useState } from "react";
import { Eye, EyeOff, Copy, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export const WebhookSettings = () => {
  const [webhookUrl, setWebhookUrl] = useState(
    "https://yourdomain.com/webhooks/payments"
  );
  const [isSecretVisible, setIsSecretVisible] = useState(false);
  const { toast } = useToast();

  const secretKey = "whsec_1234567890abcdefghijklmnopqrstuvwxyz";

  const handleCopySecret = () => {
    navigator.clipboard.writeText(secretKey);
    toast({
      title: "Copied to clipboard",
      description: "Secret key has been copied successfully.",
    });
  };

  const handleSaveWebhook = () => {
    toast({
      title: "Webhook URL saved",
      description: "Your webhook settings have been updated.",
    });
  };

  const handleTestWebhook = () => {
    toast({
      title: "Testing webhook",
      description: "A test event has been sent to your webhook URL.",
    });
  };

  const handleRegenerateSecret = () => {
    toast({
      title: "Secret key regenerated",
      description: "A new secret key has been generated.",
    });
  };

  return (
    <div className="border border-[#E0E0E0] rounded-[12px] p-[16px]">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-base tracking-[0.5px] font-normal text-[#010721]">
          WEBHOOK SETTINGS
        </h1>
        <button
          className="rounded-[8px] py-[6px] px-[16px] text-[14px] font-normal leading-[20px] tracking-[0.25px] align-middle text-[#FFFFFF] bg-[#0046A7] h-[48px]"
          onClick={handleSaveWebhook}
        >
          Save Webhook URL
        </button>
      </div>

      <div className="space-y-6">
        <div>
          <fieldset className="group border border-[#828783] rounded-lg px-2 py-0 focus-within:ring-[1.5px] hover:border-[#3b3b3b] focus-within:ring-[#0046A7] transition-all">
            <legend className="group-focus-within:text-[#0046A7] font-[400] bg-[#f8f8f8] text-[#031300] px-1 text-[12px] leading-[100%] font-instrument">
              Webhook URL
            </legend>
            <Input
              name="webhook-url"
              id="webhook-url"
              type="url"
              value={webhookUrl}
              onChange={(e) => setWebhookUrl(e.target.value)}
              placeholder="https://yourdomain.com/webhooks/payments"
              className="w-full font-instrument border-0 px-2 pb-4 pt-2 h-auto focus-visible:ring-0 focus-visible:ring-offset-0 text-[15px] bg-transparent placeholder:text-[#828783] placeholder:font-instrument"
            />
          </fieldset>
        </div>

        <div>
          <div className="text-base tracking-[0.5px] font-normal text-[#010721] mb-2 align-middle">
            Secret Key
          </div>
          <div className="flex items-center gap-2">
            <div className="font-mono h-[40px] flex items-center text-sm tracking-[0.25px] align-middle text-[#010721] bg-[#F2F2F2] px-[8px] py-[6px] rounded-[8px]">
              {isSecretVisible ? secretKey : "• ".repeat(19)}
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSecretVisible(!isSecretVisible)}
              aria-label={
                isSecretVisible ? "Hide secret key" : "Show secret key"
              }
              className="w-8 h-8"
            >
              {isSecretVisible ? (
                <EyeOff className="h-[24px] w-[24px]" />
              ) : (
                <Eye className="h-[24px] w-[24px]" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleCopySecret}
              aria-label="Copy secret key"
              className="w-8 h-8"
            >
              <Copy className="h-[24px] w-[24px]" />
            </Button>
          </div>
        </div>

        <div className="flex w-1/2 justify-between items-center gap-2">
          <div>
            <div className="text-sm font-normal text-foreground mb-2">
              Last Triggered
            </div>
            <div className="text-sm tracking-[0.25px] align-middle text-[#828783]">
              2025-10-20 14:32
            </div>
          </div>
          <Button
            variant="link"
            className="text-[#0046A7] text-sm tracking-[0.25px] p-0 h-auto font-normal"
            onClick={handleRegenerateSecret}
          >
            Regenerate Secret Key
          </Button>
        </div>

        <div className="flex items-center gap-4 pt-4">
          <Button variant="outline" className="w-full">
            Disable
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onClick={handleTestWebhook}
          >
            Test Webhook
          </Button>
          <Button variant="ghost" size="icon" className="hover:bg-transparent">
            <MoreVertical className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};
