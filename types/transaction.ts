export interface Transaction {
  id: string;
  reference: string;
  wallet_id: string;
  merchant_reference: string;
  amount: number;
  transaction_type: string;
  transaction_status: string;
  narration: string;
  payout_provider: string;
  fee: number;
  beneficiary_id: string | null;
  metadata: {};
  initiated_at: string;
  paid_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface Pagination {
  current_page: number;
  per_page: number;
  total_items: number;
  total_pages: number;
  has_next: boolean;
  has_previous: boolean;
}

export interface TransactionsApiResponse {
  data: Transaction[];
  pagination: Pagination;
}
