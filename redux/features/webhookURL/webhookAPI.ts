import axiosClient from "@/lib/axiosClient";
import {
  CreateWebhookUrlPayload,
  CreateWebhookUrlResponse,
  GetWebhookUrlResposne,
  RegeneratUrlSecretResponse,
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

export const getWebhookURL = async (
  id: string
): Promise<GetWebhookUrlResposne> => {
  const { data } = await axiosClient.get<GetWebhookUrlResposne>(
    `/webhooks/${id}`
  );
  return data;
};

export const regenerateWebhookUrl = async (
  id: string
): Promise<RegeneratUrlSecretResponse> => {
  const { data } = await axiosClient.post<RegeneratUrlSecretResponse>(
    `/webhooks/${id}/regenerate-secret`
  );
  return data;
};
