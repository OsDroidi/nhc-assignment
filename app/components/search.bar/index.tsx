'use client';
import { SearchIcon } from '../svgs';
import styles from '../search/search.module.scss';

interface SearchBarProps {
  query?: string;
  setQuery?: (value: string) => void;
  handleInputChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function SearchBar({
  query,
  handleInputChange,
}: SearchBarProps) {
  return (
    <>
      <div className={styles['search-title']}>Search products by keyword</div>
      <div className={styles['search-input']}>
        <input
          type="text"
          placeholder="Search keyword"
          className={styles['search-bar']}
          value={query}
          onChange={handleInputChange}
        />
        <SearchIcon />
      </div>
    </>
  );
}
