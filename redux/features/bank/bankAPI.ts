import axiosClient from "@/lib/axiosClient";
import { BanksResponse } from "@/types/bank";

export const getBanks = async (): Promise<BanksResponse> => {
  const { data } = await axiosClient.get<BanksResponse>(
    "/api/v1/banks"
  );
  return data;
};
