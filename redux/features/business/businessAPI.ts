import axiosClient from "@/lib/axiosClient";
import {
  GetBusinessesResponse,
  CurrentBusinessResponse,
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
