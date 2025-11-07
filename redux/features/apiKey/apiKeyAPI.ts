import axiosClient from "@/lib/axiosClient";
import {
  CreateKeyPayload,
  CreateKeyResponse,
  GetKeysResponse,
} from "@/types/apiKey";

export const createApiKey = async (
  payload: CreateKeyPayload
): Promise<CreateKeyResponse> => {
  const { data } = await axiosClient.post<CreateKeyResponse>(
    "/api/v1/api-keys",
    payload
  );
  return data;
};

export const getApiKeys = async (id: string): Promise<GetKeysResponse> => {
  const { data } = await axiosClient.get<GetKeysResponse>(
    `/api/v1/api-keys/business/${id}`
  );
  return data;
};

export const deleteApiKey = async (id: string): Promise<any> => {
  const { data } = await axiosClient.delete(`/api/v1/api-keys/${id}`);
  return data;
};
