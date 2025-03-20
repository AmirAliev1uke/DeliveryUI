import axios from 'axios';
import { Product } from '../types';
import { API_URL } from './config';

interface CategoryDTO {
  id: number;
  name: string;
}

interface CreateProductDTO {
  name: string;
  price: number;
  description: string;
  categoryId: number;
}

export const productService = {
  async getProducts(): Promise<Product[]> {
    try {
      const response = await axios.get<Product[]>(`${API_URL}/products`);
      return response.data;
    } catch (error) {
      console.error('Ошибка при получении товаров:', error);
      return [];
    }
  },

  async getProductsByCategory(categoryId: number): Promise<Product[]> {
    try {
      const categoryDTO: CategoryDTO = {
        id: categoryId,
        name: '' // name не используется в методе getProductByCategoryName, поэтому можно оставить пустым
      };
      const response = await axios.post<Product[]>(`${API_URL}/products/byCategoryId`, categoryDTO);
      return response.data;
    } catch (error) {
      console.error('Ошибка при получении товаров категории:', error);
      return [];
    }
  },

  async createProduct(product: CreateProductDTO): Promise<Product> {
    try {
      const response = await axios.post<Product>(`${API_URL}/products`, product);
      return response.data;
    } catch (error) {
      console.error('Ошибка при создании товара:', error);
      throw error;
    }
  },

  async uploadImage(file: File): Promise<string> {
    try {
      const formData = new FormData();
      formData.append('file', file);
      const response = await axios.post<string>(`${API_URL}/files/updoad`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Ошибка при загрузке изображения:', error);
      throw error;
    }
  },

  async updateProduct(product: Product, imageUrl: string): Promise<Product> {
    try {
      const response = await axios.post<Product>(`${API_URL}/products/update`, {
        ...product,
        imageurl: imageUrl
      });
      return response.data;
    } catch (error) {
      console.error('Ошибка при обновлении товара:', error);
      throw error;
    }
  }
}; 