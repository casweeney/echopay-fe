export interface BVNVStatusResponse {
  data: {
    bvn_verified: boolean;
    bvn_verified_at: string | null;
    date_of_birth: string | null;
    first_name: string | null;
    last_name: string | null;
    phone: string | null;
    verification_status: string;
  };
  status: string;
}

export interface VerifyBVNPayload {
  bvn: string;
  first_name: string;
  last_name: string;
}

export interface VerifyBVNResponse {
  data: {
    field_matches: {
      firstname: boolean;
      lastname: boolean;
    };
    match_status: string;
    user_id: string;
    user_name: string;
    verification_status: string;
    verified: string;
  };
  message: "BVN verification successful";
  status: "success";
}
