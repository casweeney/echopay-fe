import axiosClient from "@/lib/axiosClient";
import { GetVirtualAccountsResponse } from "@/types/account";

export const getVirtualAccount = async (
  id: string
): Promise<GetVirtualAccountsResponse> => {
  const { data } = await axiosClient.get<GetVirtualAccountsResponse>(
    `/api/v1/businesses/virtual-accounts/${id}`
  );
  return data;
};
