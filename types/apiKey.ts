export interface CreateKeyPayload {
  business_id: string;
  name: string;
}

export interface CreateKeyResponse {
  data: {
    api_key: string;
    business_id: string;
    id: string;
    name: string;
  };
  message: string;
  status: string;
}

export interface ApiKey {
  business_id: string;
  created_at: string;
  id: string;
  last_used_at: string | null;
  name: string;
  secret_key: string;
  updated_at: string;
  user_id: string;
}

export interface GetKeysResponse {
  api_keys: ApiKey[];
  count: number;
  status: string;
}
