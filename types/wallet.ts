export interface Wallet {
  balance: number;
  created_at: string;
  currency_id: string;
  currency_name: string;
  currency_symbol: string;
  id: string;
  pnd_at: string | null;
  reference: string;
  updated_at: string;
}

export interface WalletResponse {
  count: number;
  status: string;
  wallets: Wallet[];
}
