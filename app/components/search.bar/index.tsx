'use client';
import React from 'react';
import { SearchIcon } from '../svgs';
import styles from '../search/search.module.scss';

interface SearchBarProps {
  query?: string;
  setQuery?: (value: string) => void;
  handleInputChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleKeyPress?: () => (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

const SearchBar = ({
  query,
  handleInputChange,
  handleKeyPress,
}: SearchBarProps) => {
  return (
    <div>
      <div className={styles['search-title']}>Search products by keyword</div>
      <div className={styles['search-input']}>
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          className={styles['search-bar']}
          placeholder="Search keyword"
          onKeyDown={handleKeyPress}
        />
        <SearchIcon onClick={handleKeyPress} />
      </div>
    </div>
  );
};

export default SearchBar;
