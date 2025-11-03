import axiosClient from "@/lib/axiosClient";
import {
  RegisterPayload,
  RegisterResponse,
  LoginPayload,
  LoginResponse,
} from "@/types/auth";

export const registerUser = async (
  payload: RegisterPayload
): Promise<RegisterResponse> => {
  const { data } = await axiosClient.post<RegisterResponse>(
    "/auth/register",
    payload
  );
  return data;
};

export const loginUser = async (
  payload: LoginPayload
): Promise<LoginResponse> => {
  const { data } = await axiosClient.post<LoginResponse>(
    "/auth/login",
    payload
  );
  return data;
};
