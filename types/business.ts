export interface Business {
  address: string | null;
  biz_number: string;
  business_category_id: string | null;
  business_category_name: string | null;
  city: string | null;
  country_id: string | null;
  country_name: string | null;
  created_at: string;
  id: string;
  name: string;
  phone: string | null;
  postal_code: string | null;
  reference: string;
  state_id: string | null;
  state_name: string | null;
  updated_at: string;
  user_id: string;
  website: string | null;
}

export interface GetBusinessesResponse {
  businesses: Business[];
  count: number;
  status: string;
}
