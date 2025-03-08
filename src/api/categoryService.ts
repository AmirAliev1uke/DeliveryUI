import axios from 'axios';
import { Category } from '../types';
import { API_URL } from './config';

export const categoryService = {
  async getCategories(): Promise<Category[]> {
    try {
      const response = await axios.get<Category[]>(`${API_URL}/categories`);
      return response.data;
    } catch (error) {
      console.error('Ошибка при получении категорий:', error);
      return [];
    }
  }
}; 