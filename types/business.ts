export interface CreateBusinessPayload {
  name: string;
}

export interface CreateBusinessResponse {
  data: {
    biz_number: string;
    id: string;
    name: string;
    reference: string;
  };
  message: string;
  status: string;
}

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

export interface CurrentBusinessData {
  id: string;
  name: string;
  reference: string;
  biz_number: string;
  address: string;
  city: string;
  state_id: string;
  state_name: string;
  country_id: string;
  country_name: string;
  postal_code: number;
  phone: string;
  website: string | null;
  business_category_id: string;
  business_category_name: string;
  user_id: string;
  is_current: boolean;
  created_at: string;
  updated_at: string;
}

export interface CurrentBusinessResponse {
  status: string;
  data: CurrentBusinessData;
}

export interface BusinessDetails {
  address: string;
  biz_number: string;
  business_category_id: string;
  business_category_name: string;
  city: string;
  country_id: string;
  country_name: string;
  created_at: string;
  id: string;
  name: string;
  phone: string;
  postal_code: number;
  reference: string;
  state_id: string;
  state_name: string;
  updated_at: string;
  user_id: string;
  website: string | null;
}

export interface BusinessResponse {
  data: BusinessDetails;
  status: string;
}

export interface UpdateCurrentBusinessResponse {
  message: string;
  status: string;
}

export interface VerifyBusinessPayload {
  phone: string;
  city: string;
  address: string;
  postal_code: number;
  website: string;
  business_category_id: string;
  state_id: string;
  country_id: string;
}

export interface VerifyBusinessResponse {
  data: {
    next_step: string;
    verification_status: string;
  };
  message: string;
  status: string;
}

export interface VerificationStatusResponse {
  status: string;
  data: {
    business_verification: {
      is_verified: boolean;
      status: string;
      verified_at: string | null;
    };
    bvn_verification: {
      is_verified: boolean;
      verified_at: string | null;
    };
    fully_verified: boolean;
  };
}

export interface SwitchCurrentBusinessResponse {
  message: string;
  status: string;
}

export interface BusinessCategory {
  created_at: string;
  id: string;
  name: string;
  updated_at: string;
}

export interface BusinessCategoriesResponse {
  business_categories: BusinessCategory[];
  count: number;
  status: string;
}
