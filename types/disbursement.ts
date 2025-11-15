export interface DisbursementPayload {
  amount: number;
  bank_code: string;
  account_number: string;
  currency: string;
  merchant_reference: string;
  biz_number: string;
}

export interface DisbursementRequest extends DisbursementPayload {
  apiKey: string;
}