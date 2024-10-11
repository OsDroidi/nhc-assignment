'use client';
import { useState, useEffect, SetStateAction } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Empty } from '../svgs';
import styles from './search.module.scss';
import SearchBar from '../search.bar';

export default function Search() {
  const [query, setQuery] = useState('');
  interface Product {
    id: number;
    title: string;
    price: number;
    thumbnail: string;
  }

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch products when the query changes
  useEffect(() => {
    if (query.length > 0) {
      const fetchData = async () => {
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
      fetchData();
    } else {
      setProducts([]); // Reset products when query is empty
    }
  }, [query]);

  // Handle input change
  const handleInputChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setQuery(e.target.value);
  };

  return (
    <main>
      <div className="flex items-center flex-col justify-center">
        <SearchBar
          // add props
          query={query}
          setQuery={setQuery}
          handleInputChange={handleInputChange}
        />
        <div className={styles['count-results']}>
          Total results count:{' '}
          <span className={styles['count']}>{products.length || 0}</span>
        </div>
      </div>
      <div style={{ padding: '20px' }}>
        {loading && <p>Loading...</p>}

        {!loading && products.length === 0 && (
          <div className={styles['no-results']}>
            <Empty />
            <p>No results for your search!</p>
            <p>Try another keyword</p>
          </div>
        )}
        <ul
          className={styles['products-container']}
          style={{ listStyleType: 'none', paddingLeft: 0 }}
        >
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
                <div>
                  <h2 className={styles['product-title']}>{product.title}</h2>
                  <p className={styles['product-price']}>
                    Price:
                    <span className={styles['price']}>${product.price}</span>
                  </p>
                </div>
                <button className={styles['btn-more']}>More</button>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
