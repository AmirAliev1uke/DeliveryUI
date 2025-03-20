import React from 'react';
import { Product } from '../types';

interface ProductListProps {
  products: Product[];
}

export const ProductList: React.FC<ProductListProps> = ({ products }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow p-2"
        >
          <div className="flex justify-center mb-2">
            <div className="w-full aspect-square rounded-lg overflow-hidden">
              <img
                src={product.imageurl}
                alt={product.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://via.placeholder.com/300x200?text=Нет+изображения';
                }}
              />
            </div>
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
            <p className="text-gray-600 text-sm mb-2">{product.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold text-primary">
                {new Intl.NumberFormat('ru-RU', {
                  style: 'currency',
                  currency: 'RUB',
                }).format(product.price)}
              </span>
              <button className="bg-primary text-white px-3 py-1.5 rounded-md hover:bg-primary/90 transition-colors text-sm">
                В корзину
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}; 