export interface RegisterPayload {
  business_name: string;
  name: string;
  email: string;
  phone: string;
  password: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  created_at: string;
  updated_at: string;
}

export interface RegisterResponse {
  data: {
    user: User;
  };
  message: string;
  status: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  status: string;
  token: string;
}
