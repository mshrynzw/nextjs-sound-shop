import Tag from "@/types/tag"

export interface Item {
  id: number;
  created_at: string;
  updated_at: string;
  title: string;
  description?: string;
  tag_ids?: number[];
  tags?: Tag[];
  price: number;
}