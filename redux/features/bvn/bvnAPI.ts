import axiosClient from "@/lib/axiosClient";
import { BVNVStatusResponse } from "@/types/bvn";

export const getBvnStatus = async (): Promise<BVNVStatusResponse> => {
  const { data } = await axiosClient.get<BVNVStatusResponse>(
    "/api/v1/bvn/verify/status"
  );
  return data;
};
