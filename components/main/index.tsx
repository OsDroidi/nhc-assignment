'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import SearchBar from '../search.bar';

export default function Main() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      router.push(`/products?query=${query}`);
    }
  };

  const handleSearchClick = () => {
    router.push(`/products?query=${query}`);
  };

  return (
    <main className="flex items-center justify-center h-screen flex-col">
      <SearchBar
        query={query}
        setQuery={setQuery}
        handleInputChange={handleInputChange}
        handleKeyPress={handleKeyPress}
        handleSearchClick={handleSearchClick}
      />
    </main>
  );
}
