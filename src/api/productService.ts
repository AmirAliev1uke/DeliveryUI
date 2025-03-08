import axios from 'axios';
import { Product } from '../types';
import { API_URL } from './config';

export const productService = {
  async getProducts(): Promise<Product[]> {
    try {
      const response = await axios.get<Product[]>(`${API_URL}/products`);
      return response.data;
    } catch (error) {
      console.error('Ошибка при получении продуктов:', error);
      return [];
    }
  },

  async getProductsByCategory(categoryId: number): Promise<Product[]> {
    try {
      const response = await axios.get<Product[]>(`${API_URL}/products/category/${categoryId}`);
      return response.data;
    } catch (error) {
      console.error('Ошибка при получении продуктов по категории:', error);
      return [];
    }
  }
}; 