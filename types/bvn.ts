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
