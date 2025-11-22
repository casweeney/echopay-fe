import axiosClient from "@/lib/axiosClient";
import {
  BusinessTransactionResponse,
  GetTransactionsResponse,
} from "@/types/transaction";

export const getTransactions = async (
  id: string,
  page: number
): Promise<GetTransactionsResponse> => {
  const { data } = await axiosClient.get<GetTransactionsResponse>(
    `/api/v1/wallets/transactions/${id}?page=${page}&limit=10`
  );
  return data;
};

export const getBusinessTransactions = async (
  id: string,
  page: number
): Promise<BusinessTransactionResponse> => {
  const { data } = await axiosClient.get<BusinessTransactionResponse>(
    `/api/v1/businesses/transactions/${id}?page=${page}&limit=10`
  );
  return data;
};
