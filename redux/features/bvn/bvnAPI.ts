import axiosClient from "@/lib/axiosClient";
import {
  BVNVStatusResponse,
  VerifyBVNPayload,
  VerifyBVNResponse,
} from "@/types/bvn";

export const getBvnStatus = async (): Promise<BVNVStatusResponse> => {
  const { data } = await axiosClient.get<BVNVStatusResponse>(
    "/api/v1/bvn/verify/status"
  );
  return data;
};

export const verifyBVN = async (
  payload: VerifyBVNPayload
): Promise<VerifyBVNResponse> => {
  const { data } = await axiosClient.post<VerifyBVNResponse>(
    "/api/v1/bvn/verify",
    payload
  );

  return data;
};
