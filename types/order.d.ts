export interface Order {
  id: number;
  created_at: string;
  updated_at: string;
  user_id: string;
  item_id: number;
  session_id: string;
}