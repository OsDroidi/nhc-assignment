'use client';
import SearchBar from '../search.bar';
import { useState, useEffect, SetStateAction } from 'react';

const Main = () => {
  const [query, setQuery] = useState('');
  const [, setProducts] = useState([]);
  const [, setLoading] = useState(false);

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
      <SearchBar handleInputChange={handleInputChange} query={query} />
    </main>
  );
};

export default Main;
