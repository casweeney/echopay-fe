export interface Country {
  id: string;
  name: string;
  iso: string;
  created_at: string;
  updated_at: string;
}

export interface CountriesResponse {
  count: number;
  countries: Country[];
  status: string;
}

export interface State {
  id: string;
  name: string;
  country_id: string;
  created_at: string;
  updated_at: string;
}

export interface StatesResponse {
  count: number;
  status: string;
  states: State[];
}
