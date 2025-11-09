import axiosClient from "@/lib/axiosClient";
import { CountriesResponse, StatesResponse } from "@/types/region";

export const getCountries = async (): Promise<CountriesResponse> => {
  const { data } = await axiosClient.get<CountriesResponse>(
    "/api/v1/countries"
  );
  return data;
};

export const getStates = async (id: string): Promise<StatesResponse> => {
  const { data } = await axiosClient.get<StatesResponse>(
    `/api/v1/states/country/${id}`
  );
  return data;
};
