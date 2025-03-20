export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  imageurl: string;
  categoryId: number;
}

export interface Category {
  id: number;
  name: string;
} 