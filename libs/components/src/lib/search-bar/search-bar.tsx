import React, { useState } from 'react';
import ReactSearchBox from 'react-search-box';
import './search-bar.css';

interface SearchBarProps<T> {
  onSearch: (val: string) => T;
}

export function SearchBar<T>(props: SearchBarProps<T>) {
  const [searchVal, setSearchVal] = useState('');
  const recommendedResultsData = [
    {
      key: 'ginger',
      value: 'ginger for nausea',
    },
  ];

  return (
    <div className="search-bar-container">
      <ReactSearchBox
        placeholder="Your Search"
        aria-label="search bar"
        value={searchVal}
        data={recommendedResultsData}
        onChange={(val) => setSearchVal(val)}
        callback={(record) => console.log(record)}
      />
      <button onClick={() => props.onSearch(searchVal)}>Search</button>
    </div>
  );
}
