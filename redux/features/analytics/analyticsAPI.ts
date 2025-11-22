import axiosClient from "@/lib/axiosClient";
import { BusinessAnalyticsResponse } from "@/types/analytics";

export const getAnalytics = async (
  id: string
): Promise<BusinessAnalyticsResponse> => {
  const { data } = await axiosClient.get<BusinessAnalyticsResponse>(
    `/api/v1/businesses/analytics/${id}`
  );
  return data;
};
