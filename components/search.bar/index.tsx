'use client';

import styles from '../search/search.module.scss';

import React from 'react';

import { SearchIcon } from '../svgs';

interface SearchBarProps {
  query?: string;
  setQuery?: (value: string) => void;
  handleInputChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  handleSearchClick?: () => void;
}

export default function SearchBar({
  query,
  handleInputChange,
  handleKeyPress,
  handleSearchClick,
}: SearchBarProps) {
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
        <SearchIcon onClick={handleSearchClick} />
      </div>
    </div>
  );
}
