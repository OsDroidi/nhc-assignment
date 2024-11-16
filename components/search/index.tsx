import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Empty } from '../svgs';
import styles from './search.module.scss';
import SearchBar from '../search.bar';
import { useSearchParams } from 'next/navigation';
import { Product } from './types';
import type { RootState } from 'store/store';
import { useSelector, useDispatch } from 'react-redux';
import { setQuery } from 'store/querySlice';
import { debounce } from 'lodash';

export default function Search() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();

  const query = useSelector((state: RootState) => state.queries.value);
  const dispatch = useDispatch();

  console.log('query:', query);

  // On initial render, grab the query from the URL and set it in the state
  useEffect(() => {
    const initialQuery = searchParams.get('query') || '';
    dispatch(setQuery(initialQuery));
  }, [dispatch, searchParams]);

  const fetchData = async (query: string) => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://dummyjson.com/products/search?q=${query}`,
      );
      const data = await res.json();
      setProducts(data.products);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setLoading(false);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedFetchData = useCallback(debounce(fetchData, 1000), []);

  useEffect(() => {
    if (query && query.length > 0) {
      debouncedFetchData(query);
    } else {
      setProducts([]); // Reset products when query is empty
    }
  }, [query, debouncedFetchData]);

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
        {loading && <p>Loading...</p>}
        {products.length === 0 && !loading && (
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
