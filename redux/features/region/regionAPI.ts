import axiosClient from "@/lib/axiosClient";
import { CountriesResponse } from "@/types/region";

export const getCountries = async (): Promise<CountriesResponse> => {
  const { data } = await axiosClient.get<CountriesResponse>(
    "/api/v1/countries"
  );
  return data;
};
