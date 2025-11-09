import axiosClient from "@/lib/axiosClient";
import {
  GetBusinessesResponse,
  CurrentBusinessResponse,
  SwitchCurrentBusinessResponse,
  BusinessCategoriesResponse,
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
