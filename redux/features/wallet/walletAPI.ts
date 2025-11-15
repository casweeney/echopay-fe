import axiosClient from "@/lib/axiosClient";
import {
  CreateWalletPayload,
  CreateWalletResponse,
  WalletResponse,
} from "@/types/wallet";

export const createWallet = async (
  payload: CreateWalletPayload
): Promise<CreateWalletResponse> => {
  const { data } = await axiosClient.post<CreateWalletResponse>(
    `/api/v1/wallets`,
    payload
  );
  return data;
};

export const getWallets = async (id: string): Promise<WalletResponse> => {
  const { data } = await axiosClient.get<WalletResponse>(
    `/api/v1/wallets/${id}`
  );
  return data;
};
