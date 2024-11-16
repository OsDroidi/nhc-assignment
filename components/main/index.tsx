'use client';

import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setQuery } from 'store/querySlice';
import type { RootState } from 'store/store';

import SearchBar from '../search.bar';

export default function Main() {
  const router = useRouter();
  const query = useSelector((state: RootState) => state.queries.value);
  const dispatch = useDispatch();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setQuery(e.target.value));
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
