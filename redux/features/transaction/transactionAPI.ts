import axiosClient from "@/lib/axiosClient";
import { GetTransactionsResponse } from "@/types/transaction";

export const getTransactions = async (
  id: string
): Promise<GetTransactionsResponse> => {
  const { data } = await axiosClient.get<GetTransactionsResponse>(
    `/api/v1/transactions/${id}`
  );
  return data;
};
