'use client';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import StarRating from '@/components/rating';
import { Product } from './types';

export default function Products() {
  const params = useParams();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const { id } = params;

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
    <div style={{ padding: '20px' }}>
      <h1>{product.title}</h1>
      <Image
        src={product.thumbnail || '/placeholder.png'}
        alt={product.title}
        width={500}
        height={300}
      />
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <p>Brand: {product.brand}</p>
      <p>Category: {product.category}</p>
      <p>Rating: {product.rating} / 5</p>
      <StarRating rating={product.rating} />
      <p>Stock: {product.stock}</p>
      <div>product Images</div>
      <div>
        {product.images.map((image, index) => (
          <Image
            key={index}
            src={image || '/placeholder.png'}
            alt={`${product.title} ${index + 1}`}
            width={500}
            height={300}
          />
        ))}
      </div>
    </div>
  );
}
