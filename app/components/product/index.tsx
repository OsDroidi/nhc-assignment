'use client';
import { useState, useEffect, SetStateAction } from 'react';
import styles from './product.module.scss';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
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
    <div style={{ padding: '20px' }}>
      <h1>Product Search</h1>
      <div>Total results count: {products.length || 0}</div>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search for a product..."
        style={{ padding: '10px', width: '300px', fontSize: '16px' }}
      />

      {loading && <p>Loading...</p>}

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
                  Price:{' '}
                  <span className={styles['price']}>${product.price}</span>
                </p>
              </div>
              <button className={styles['btn-more']}>More</button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
