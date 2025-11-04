import axiosClient from "@/lib/axiosClient";
import { GetUserResponse } from "@/types/user";

export const getUser = async (): Promise<GetUserResponse> => {
  const { data } = await axiosClient.get<GetUserResponse>("/api/v1/user");
  return data;
};
