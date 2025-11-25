export interface Bank {
  code: string;
  name: string;
}

export interface BanksData {
  banks: Bank[];
  total: number;
}

export interface BanksResponse {
  data: BanksData;
  message: string;
  status: "success" | "error";
}

export interface BankDetailsPayload {
  account_number: string;
  bank_code: string;
}

export interface BankDetailsResponse {
  data: {
    account_name: string;
    account_number: string;
    bank_code: string;
  };
  message: string;
  status: string;
}
