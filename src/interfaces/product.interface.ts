export interface Product {
  id: string;
  name: string;
  price: number;
  availability: boolean;
}

export type SimilarProductIds = string[];
