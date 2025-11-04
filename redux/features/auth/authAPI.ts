import axiosClient from "@/lib/axiosClient";
import {
  RegisterPayload,
  RegisterResponse,
  LoginPayload,
  LoginResponse,
  VerifyEmailPayload,
  VerifyEmailResponse,
  ResendVerificationPayload,
  ResendVerificationResponse,
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

export const verifyUserEmail = async (
  payload: VerifyEmailPayload
): Promise<VerifyEmailResponse> => {
  const { data } = await axiosClient.post<VerifyEmailResponse>(
    "/auth/verify-email",
    payload
  );
  return data;
};

export const resendUserEmailVerification = async (
  payload: ResendVerificationPayload
): Promise<ResendVerificationResponse> => {
  const { data } = await axiosClient.post<ResendVerificationResponse>(
    "/auth/resend-verification",
    payload
  );

  return data;
};
