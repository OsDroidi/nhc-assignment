'use client';

import styles from './search.module.scss';

import { useEffect } from 'react';

import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { setQuery } from 'store/querySlice';
import type { RootState } from 'store/store';

import { fetchProducts } from '../../utils/api';
import SearchBar from '../search.bar';
import { Empty } from '../svgs';

export default function Search() {
  const searchParams = useSearchParams();
  const query = useSelector((state: RootState) => state.queries.value);
  const dispatch = useDispatch();

  // Set query from URL on initial render
  useEffect(() => {
    const initialQuery = searchParams.get('query') || '';
    dispatch(setQuery(initialQuery));
  }, [dispatch, searchParams]);

  // Use React Query to fetch products
  const {
    data: products = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['products', query], // Query key
    queryFn: () => fetchProducts(query), // Query function from utils/api.ts
    enabled: !!query, // Only run query if query is not empty
    staleTime: 5000, // Keep previous data while fetching new data
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setQuery(event.target.value));
  };

  return (
    <main className="flex items-center flex-col min-h-screen">
      <div className={styles['search-bar-container']}>
        <SearchBar query={query} handleInputChange={handleInputChange} />
        <div className={styles['count-results']}>
          Total results count:{' '}
          <span className={styles['count']}>{products.length}</span>
        </div>
      </div>
      <div style={{ padding: '20px' }}>
        {isLoading && <p>Loading...</p>}
        {isError && (
          <p style={{ color: 'red' }}>
            Failed to fetch products. Please try again later.
          </p>
        )}
        {!isLoading && products.length === 0 && (
          <div className={styles['no-results']}>
            <Empty />
            <p>No results for your search!</p>
            <p>Try another keyword</p>
          </div>
        )}
        <ul className={styles['products-container']}>
          {products.map((product) => (
            <li key={product.id} className={styles['product']}>
              <Link href={`/products/${product.id}`}>
                <div className={styles['thumbnail']}>
                  <Image
                    src={product.thumbnail || '/placeholder.png'}
                    alt={product.title}
                    width={284.13}
                    height={150}
                    className={styles['thumbnail']}
                  />
                </div>
                <div className={styles['product-content']}>
                  <h2 className={styles['product-title']}>{product.title}</h2>
                  <p className={styles['product-description']}>
                    {product.description}
                  </p>
                  <div className={styles['more-container']}>
                    <p className={styles['product-price']}>
                      Price:{' '}
                      <span className={styles['price']}>${product.price}</span>
                    </p>
                    <button className={styles['btn-more']}>More</button>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
