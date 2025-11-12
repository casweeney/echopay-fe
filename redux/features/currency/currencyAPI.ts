import axiosClient from "@/lib/axiosClient";
import { CurrenciesResponse } from "@/types/currency";

export const getCurrencies = async (): Promise<CurrenciesResponse> => {
  const { data } = await axiosClient.get<CurrenciesResponse>(
    "/api/v1/currencies"
  );
  return data;
};
