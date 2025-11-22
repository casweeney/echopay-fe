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
  page: number,
  status?: string,
  type?: string
): Promise<BusinessTransactionResponse> => {
  // Build the URL based on type or status
  let url = "";

  if (type === "credit" || type === "debit") {
    url = `/api/v1/businesses/transactions/${id}/type/${type}?page=${page}&limit=10`;
  } else if (status === "all") {
    url = `/api/v1/businesses/transactions/${id}?page=${page}&limit=10`;
  } else {
    url = `/api/v1/businesses/transactions/${id}/status/${status}?page=${page}&limit=10`;
  }

  // Fetch the data
  const { data } = await axiosClient.get<BusinessTransactionResponse>(url);
  return data;
};
