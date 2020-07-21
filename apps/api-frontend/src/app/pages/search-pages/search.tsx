import React from 'react';
import { SearchBar } from '@foodmedicine/components';
import { useHistory } from 'react-router-dom';
import { ReactComponent as Logo } from '../../logo.svg';
import './search.css';
import { onSearch } from './onsearch';
import { Link } from 'react-router-dom';
import { ScholarsDB } from '@foodmedicine/interfaces';

export default function SearchPage() {
  const history = useHistory();
  return (
    <div className="search">
      <header className="flex">
        <Logo width="125" height="125" />
        <h1>
          Welcome to Schopal, a search engine abstraction for finding details
          within open source scholarly research!
        </h1>
      </header>
      {/* TODO add material design */}
      <div className="search-container">
        <SearchBar onSearch={(query) => onSearch(query, ScholarsDB.RUN_ALL, history)} />
        <div className="search-tips">
          <h4>A quick tip for getting the best search results</h4>
          <p>
            Keep your search specific. So, rather than searching for "fat", you
            could search for "water and fat magnetic resonance" or "fat soluble vitamin
            absorption"
          </p>
        </div>
      </div>
      <div className="info">
        <p>
          <Link to="/info">Find out more about Schopal</Link>
        </p>
      </div>
    </div>
  );
}
