import axiosClient from "@/lib/axiosClient";
import { RegisterPayload, RegisterResponse } from "@/types/auth";

export const registerUser = async (
  payload: RegisterPayload
): Promise<RegisterResponse> => {
  const { data } = await axiosClient.post<RegisterResponse>(
    "/auth/register",
    payload
  );
  return data;
};
