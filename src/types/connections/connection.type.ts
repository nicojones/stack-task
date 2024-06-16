interface IConnectionProviderData {
  access_token: string;
  refresh_token: string;
  scope: string;
  token_type: "Bearer";
}

export interface IConnection {
  name: string;
  connection_id: string;
  user_id: string;
  org_id: string;
  created_at: string;
  updated_at: string;
  connection_provider_data: IConnectionProviderData;
}
