// utils/api.ts
import { Product } from '../components/search/types';

export const fetchProducts = async (query: string): Promise<Product[]> => {
  if (!query) return []; // Return empty array for empty queries

  const response = await fetch(
    `https://dummyjson.com/products/search?q=${query}`,
  );

  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }

  const data = await response.json();
  return data.products;
};

export const fetchProductById = async (id: string): Promise<Product> => {
  const response = await fetch(`https://dummyjson.com/products/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch product details');
  }
  return response.json();
};
