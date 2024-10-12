'use client';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import StarRating from '@/components/rating';
import { Product } from './types';
import styles from './product.module.scss';

export default function Products() {
  const params = useParams();
  const { id } = params;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  const [imageError, setImageError] = useState(false); // Track image loading error

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        setLoading(true);
        try {
          const res = await fetch(`https://dummyjson.com/products/${id}`);
          const data = await res.json();
          setProduct(data);
        } catch (error) {
          console.error('Error fetching product details:', error);
        }
        setLoading(false);
      };

      fetchProduct();
    }
  }, [id]);

  if (loading) return <p>Loading product details...</p>;

  if (!product) return <p>Product not found</p>;

  return (
    <div className="flex flex-col items-center">
      <div>
        <h1 className={styles['product-title']}>{product.title}</h1>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div className={styles['product-image']}>
            {!imageError && (
              <Image
                src={product.thumbnail}
                alt={`Image of ${product.title}`}
                width={473.75}
                height={250}
                className={styles['product-image']}
                onError={() => setImageError(true)} // Set imageError to true on error
              />
            )}
            {imageError && <p>Image could not be loaded.</p>}{' '}
          </div>
          <div className={styles['product-details']}>
            <div className={styles['right-column']}>
              {product.price && <p>Price: ${product.price}</p>}
              {product.rating && (
                <p>
                  Rating: <StarRating rating={product.rating} />
                </p>
              )}
              {product.brand && <p>Brand: {product.brand}</p>}
            </div>
            <div className={styles['left-column']}>
              {product.discountPercentage && (
                <p>Discount: {product.discountPercentage}</p>
              )}
              {product.stock && <p>Stock: {product.stock}</p>}
              {product.category && <p>Category: {product.category}</p>}
            </div>
          </div>
        </div>
        <p className={styles['product-description']}>Product description</p>
        {product.description && (
          <p className={styles['product-description-content']}>
            {product.description}
          </p>
        )}
        <div className={styles['product-images']}>Product Images</div>
        <div className={styles['gallery']}>
          {/* {product.images.map((image, index) => (
            <Image
              key={index}
              src={image || '/placeholder.png'}
              alt={`${product.title} ${index + 1}`}
              width={227.27}
              height={120}
              className={styles['product-gallery-image']}
            />
          ))} */}
          <Image
            src={'/iphone.png'}
            alt="iphone"
            width={227.27}
            height={120}
            className={styles['product-gallery-image']}
          />
          <Image
            src={'/iphone.png'}
            alt="iphone"
            width={227.27}
            height={120}
            className={styles['product-gallery-image']}
          />
          <Image
            src={'/iphone.png'}
            alt="iphone"
            width={227.27}
            height={120}
            className={styles['product-gallery-image']}
          />
        </div>
      </div>
    </div>
  );
}