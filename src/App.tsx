import React, { useState, useEffect } from 'react';
import { CategoryList } from './components/CategoryList';
import { ProductList } from './components/ProductList';
import { Category, Product } from './types';
import { categoryService } from './api/categoryService';
import { productService } from './api/productService';

function App() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadCategories();
    loadProducts();
  }, []);

  useEffect(() => {
    if (selectedCategoryId) {
      loadProductsByCategory(selectedCategoryId);
    } else {
      loadProducts();
    }
  }, [selectedCategoryId]);

  const loadCategories = async () => {
    try {
      const data = await categoryService.getCategories();
      setCategories(data);
      setError(null);
    } catch (err) {
      setError('Ошибка при загрузке категорий');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const loadProducts = async () => {
    try {
      const data = await productService.getProducts();
      setProducts(data);
      setError(null);
    } catch (err) {
      setError('Ошибка при загрузке продуктов');
      console.error(err);
    }
  };

  const loadProductsByCategory = async (categoryId: number) => {
    try {
      const data = await productService.getProductsByCategory(categoryId);
      setProducts(data);
      setError(null);
    } catch (err) {
      setError('Ошибка при загрузке продуктов категории');
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl text-gray-600">Загрузка...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Каталог товаров</h1>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-1">
            <CategoryList
              categories={categories}
              selectedCategoryId={selectedCategoryId}
              onSelectCategory={setSelectedCategoryId}
            />
          </div>
          <div className="md:col-span-3">
            <ProductList products={products} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App; 