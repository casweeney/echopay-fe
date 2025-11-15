import axiosClient from "@/lib/axiosClient";
import { DisbursementPayload, DisbursementRequest } from "@/types/disbursement";

export const createDisbursement = async (payload: DisbursementRequest) => {
  const { apiKey, ...data } = payload;
  const response = await axiosClient.post("/api/v1/initiate-payout", data, {
    headers: {
      "x-api-key": apiKey,
    },
  });
  return response.data;
};
