import axiosClient from "@/lib/axiosClient";
import { GetBusinessesResponse } from "@/types/business";

export const getBusinesses = async (): Promise<GetBusinessesResponse> => {
  const { data } = await axiosClient.get<GetBusinessesResponse>(
    "/api/v1/businesses"
  );
  return data;
};
