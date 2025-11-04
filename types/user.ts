export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  created_at: string;
  updated_at: string;
  email_verified_at: string | null;
}

export interface GetUserResponse {
  data?: {
    user: User;
  };
  message?: string;
  status: string;
}
