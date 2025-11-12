import axiosClient from "@/lib/axiosClient";
import {
  GetBusinessesResponse,
  CurrentBusinessResponse,
  SwitchCurrentBusinessResponse,
  BusinessCategoriesResponse,
  VerifyBusinessResponse,
  VerifyBusinessPayload,
  BusinessVerificationStatusResponse,
  GetBusinessDetailsResponse,
} from "@/types/business";

export const getBusinesses = async (): Promise<GetBusinessesResponse> => {
  const { data } = await axiosClient.get<GetBusinessesResponse>(
    "/api/v1/businesses"
  );
  return data;
};

export const getCurrentBusiness =
  async (): Promise<CurrentBusinessResponse> => {
    const { data } = await axiosClient.get<CurrentBusinessResponse>(
      "/api/v1/businesses/current"
    );

    return data;
  };

export const switchCurrentBusiness = async (
  id: string
): Promise<SwitchCurrentBusinessResponse> => {
  const { data } = await axiosClient.put<SwitchCurrentBusinessResponse>(
    `/api/v1/businesses/current/${id}`
  );

  return data;
};

export const getBusinessCategories =
  async (): Promise<BusinessCategoriesResponse> => {
    const { data } = await axiosClient.get<BusinessCategoriesResponse>(
      "/api/v1/business-categories"
    );
    return data;
  };

export const verifyUserBusiness = async (
  id: string,
  payload: VerifyBusinessPayload
): Promise<VerifyBusinessResponse> => {
  const { data } = await axiosClient.put<VerifyBusinessResponse>(
    `/api/v1/businesses/${id}`,
    payload
  );

  return data;
};

export const getBusinessVerificationStatus = async (
  id: string
): Promise<BusinessVerificationStatusResponse> => {
  const { data } = await axiosClient.get<BusinessVerificationStatusResponse>(
    `/api/v1/businesses/verification-status/${id}`
  );

  return data;
};

export const getBusinessDetails = async (
  id: string
): Promise<GetBusinessDetailsResponse> => {
  const { data } = await axiosClient.get<GetBusinessDetailsResponse>(
    `/api/v1/businesses/${id}`
  );
  return data;
};
