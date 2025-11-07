import axiosClient from "@/lib/axiosClient";
import {
  CreateWebhookUrlPayload,
  CreateWebhookUrlResponse,
} from "@/types/webhook";

export const createWebhookURL = async (
  payload: CreateWebhookUrlPayload
): Promise<CreateWebhookUrlResponse> => {
  const { data } = await axiosClient.post<CreateWebhookUrlResponse>(
    "/webhooks",
    payload
  );
  return data;
};
