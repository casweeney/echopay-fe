export interface QuickInsights {
  total_balance: {
    balances: {
      currency: string;
      amount: number;
      percentage_change: number;
      comparison_text: string;
    }[];
  };
  total_transactions: {
    current: number;
    percentage_change: number;
    comparison_text: string;
  };
  total_disbursed: {
    disbursements: {
      currency: string;
      amount: number;
      percentage_change: number;
      comparison_text: string;
    }[];
  };
  total_customers: {
    current: number;
    percentage_change: number;
    comparison_text: string;
  };
}

export interface RecentPayoutTransaction {
  transaction_id: string;
  beneficiary: string;
  amount: number;
  currency: string;
  narration: string;
  date: string; // ISO string, can parse with Date if needed
  status: string;
  reference: string;
  merchant_reference: string;
}

export interface BusinessAnalyticsResponse {
  quick_insights: QuickInsights;
  recent_payout_transactions: RecentPayoutTransaction[];
}
