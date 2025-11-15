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
