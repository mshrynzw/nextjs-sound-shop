export interface Item {
  id: number;
  created_at: string;
  updated_at: string;
  title: string;
  description?: string;
  tags?: string[];
  price: number;
}