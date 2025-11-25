import axiosClient from "@/lib/axiosClient";
import {
  BankDetailsPayload,
  BankDetailsResponse,
  BanksResponse,
} from "@/types/bank";

export const getBanks = async (): Promise<BanksResponse> => {
  const { data } = await axiosClient.get<BanksResponse>("/api/v1/banks");
  return data;
};

export const getBankDetails = async (
  payload: BankDetailsPayload
): Promise<BankDetailsResponse> => {
  const { data } = await axiosClient.post<BankDetailsResponse>(
    "/api/v1/resolve-account",
    payload
  );

  return data;
};
