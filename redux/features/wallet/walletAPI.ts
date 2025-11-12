import axiosClient from "@/lib/axiosClient";
import { WalletResponse } from "@/types/wallet";

export const getWallets = async (id: string): Promise<WalletResponse> => {
  const { data } = await axiosClient.get<WalletResponse>(
    `/api/v1/wallets/${id}`
  );
  return data;
};
