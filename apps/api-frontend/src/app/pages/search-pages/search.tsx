import React from 'react';
import { SearchBar } from '@foodmedicine/components';
import { useHistory } from 'react-router-dom';
import { ReactComponent as Logo } from '../../logo.svg';
import './search.css';
import { onSearch } from './onsearch';
import {Link} from 'react-router-dom'

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
      <SearchBar onSearch={(query) => onSearch(query, history)} />
      <p>or</p>
      <p><Link to="/info">Find out more</Link></p>
    </div>
  );
}
