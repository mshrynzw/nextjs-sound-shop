export interface Donate {
  id: number;
  created_at: string;
  updated_at: string;
  session_id: string;
  mode: text;
  status: string;
  price: number;
  email: string;
  message: string;
}