'use client';

import styles from './search.module.scss';

import { useEffect } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { setQuery } from 'store/querySlice';
import type { RootState } from 'store/store';
import useSWR from 'swr';

import { fetchProducts } from '../../utils/api';
import SearchBar from '../search.bar';
import { Empty } from '../svgs';
import { Product } from './types';

export default function Search() {
  const searchParams = useSearchParams();
  const query = useSelector((state: RootState) => state.queries.value);
  const dispatch = useDispatch();

  // Fetch products using SWR
  const {
    data: products = [],
    isLoading,
    error,
  } = useSWR<Product[]>(
    query ? `products-search-${query}` : null, // Only fetch if query exists
    () => fetchProducts(query),
    {
      revalidateOnFocus: false,
      keepPreviousData: true, // Preserve previous data while loading new data
    },
  );

  // On initial render, grab the query from the URL and set it in the state
  useEffect(() => {
    const initialQuery = searchParams.get('query') || '';
    dispatch(setQuery(initialQuery));
  }, [dispatch, searchParams]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    dispatch(setQuery(newQuery));
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
        {error && (
          <div style={{ color: 'red' }}>
            <p>Failed to fetch products. Please try again later.</p>
          </div>
        )}
        {!isLoading && products.length === 0 && !error && (
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
