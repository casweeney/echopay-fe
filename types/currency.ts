export interface Currency {
  id: string;
  name: string;
  symbol: string;
  icon: string;
  decimal_places: number;
  activated_at: string;
  created_at: string;
  updated_at: string;
}

export interface CurrenciesResponse {
  count: number;
  status: string;
  currencies: Currency[];
}
