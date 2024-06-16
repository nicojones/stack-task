export interface IAuthHeaderResponse {
  token: string;
  connectionId: string;
  orgId: string;
  error: string | null;
}
