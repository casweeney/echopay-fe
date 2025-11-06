export interface CreateWebhookUrlPayload {
  business_id: string;
  url: string;
}

export interface CreateWebhookUrlResponse {
  data: {
    secret: string;
    webhook: {
      business_id: string;
      created_at: string;
      id: string;
      updated_at: string;
      url: string;
    };
  };
  message: string;
  status: string;
}
