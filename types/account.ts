export interface VirtualAccountData {
  account_number: string;
  balance: number;
  bank_name: string;
  currency: string;
  currency_symbol: string;
  is_active: boolean;
}

export interface GetVirtualAccountsResponse {
  data: VirtualAccountData;
  status: string;
}
