"use client";

import { useEffect, useState } from "react";
import { Eye, EyeOff, Copy, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { createURL, fetchURL } from "@/redux/features/webhookURL/webhookSlice";
import { toast } from "react-toastify";
import { formatDate } from "@/utils/formatDate";

export const WebhookSettings = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { fetchedData, loading } = useSelector(
    (state: RootState) => state.webhook
  );
  const { business } = useSelector((state: RootState) => state.business);
  const [url, setUrl] = useState(fetchedData?.webhook.url);
  const [isSecretVisible, setIsSecretVisible] = useState(true);

  useEffect(() => {
    const handleFetchURL = async () => {
      if (business?.id) {
        const response = await dispatch(fetchURL(business.id)).unwrap();
        setUrl(response.data.webhook.url);
      }
    };
    handleFetchURL();
  }, [business?.id, dispatch]);

  const handleCopySecret = () => {
    const secret = fetchedData?.webhook.secret ?? "";
    navigator.clipboard.writeText(secret);

    toast("Secret key copied");
  };

  const handleSaveWebhook = async () => {
    try {
      const business_id = business?.id;
      if (business_id) {
        const response = await dispatch(
          createURL({
            business_id,
            url: url ?? "",
          })
        ).unwrap();

        if (response.status === "success") {
          await dispatch(fetchURL(business.id));
          toast("Webhook URL saved successfully", { type: "success" });
        }
      }
    } catch (err) {
      console.error("webhook err:", err);
      if (err === "Invalid URL format") {
        toast("Invalid URL", { type: "error" });
      }

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

  const handleTestWebhook = () => {};

  const handleRegenerateSecret = () => {};

  return (
    <div className="border border-[#E0E0E0] rounded-[12px] p-[16px]">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-base tracking-[0.5px] font-normal text-[#010721]">
          WEBHOOK SETTINGS
        </h1>
        <Button
          className="rounded-[8px] py-[6px] px-[16px] text-[14px] font-normal leading-[20px] tracking-[0.25px] align-middle text-[#FFFFFF] bg-[#0046A7] hover:bg-[#0046A7] h-[48px]"
          onClick={handleSaveWebhook}
        >
          {loading ? (
            <span className="h-5 w-5 animate-spin border-2 border-white rounded-full border-t-transparent"></span>
          ) : (
            "Save Webhook URL"
          )}
        </Button>
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
              value={url}
              onChange={(e) => setUrl(e.target.value)}
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
              {!isSecretVisible ? fetchedData?.webhook.secret : "•".repeat(19)}
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
              {formatDate(fetchedData?.webhook.updated_at || "")}
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
