import React from 'react';
import { Category } from '../types';

interface CategoryListProps {
  categories: Category[];
  onSelectCategory: (categoryId: number) => void;
  selectedCategoryId: number | null;
}

export const CategoryList: React.FC<CategoryListProps> = ({
  categories,
  onSelectCategory,
  selectedCategoryId,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-xl font-bold mb-4">Категории</h2>
      <div className="space-y-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onSelectCategory(category.id)}
            className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
              selectedCategoryId === category.id
                ? 'bg-primary text-white'
                : 'hover:bg-gray-100'
            }`}
          >
            <div className="font-medium">{category.name}</div>
          </button>
        ))}
      </div>
    </div>
  );
}; 