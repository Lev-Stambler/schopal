import React, { useState } from 'react';
import './search-bar.css';

interface SearchBarProps<T> {
  onSearch: (val: string) => T;
}

export function SearchBar<T>(props: SearchBarProps<T>) {
  const [searchVal, setSearchVal] = useState('');

  return (
    <div className="search-bar-container">
      <input
        placeholder="Your Search"
        aria-label="search bar"
        value={searchVal}
        onKeyDown={(e) => {
          if (e.key === 'Enter') props.onSearch(searchVal);
        }}
        onChange={(e) => setSearchVal(e.target.value)}
      />
      <button onClick={() => props.onSearch(searchVal)}>Search</button>
    </div>
  );
}
