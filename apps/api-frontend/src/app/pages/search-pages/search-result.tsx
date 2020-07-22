import React, { useState, useEffect } from 'react';
import { environment } from '../../../environments/environment';
import {
  ParsedArticleParagraphStandalone,
  ScholarsDB,
  ParsedArticlesByArticleId,
} from '@foodmedicine/interfaces';
import ClimbingBoxLoader from 'react-spinners/ClimbingBoxLoader';
import { useLocation, useHistory } from 'react-router-dom';
import { onSearch } from './onsearch';
import './search-result.css';
import { SearchBar } from '@foodmedicine/components';

function createGoogleScholarsQueryLink(title: string): string {
  return `https://scholar.google.com/scholar?hl=en&as_sdt=0%2C31&q=${title}&btnG=`;
}

function SingleResult(props: {
  groupedByArticle: ParsedArticlesByArticleId;
  key: string;
}) {
  return (
    <div
      className="single-result-container"
      onClick={() =>
        window.open(
          createGoogleScholarsQueryLink(props.groupedByArticle.head.title)
        )
      }
    >
      <h4 aria-label="paper's title">{props.groupedByArticle.head.title}</h4>
      {props.groupedByArticle.paragraphs.map((paragraph) => <>
        <p aria-label="correlated paragraph">...{paragraph.body}...</p>
      </>)}
      <hr />
    </div>
  );
}

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Results() {
  const queryParams = useQuery();
  const [searchResults, setResults] = useState<ParsedArticlesByArticleId[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, setErrMsg] = useState<string>(null);
  const query = queryParams.get('query');
  const db = queryParams.get('db');
  const numberOfArticles = queryParams.get('numberOfArticles');
  async function search(query: string): Promise<void> {
    setIsLoading(true);
    setErrMsg(null);
    try {
      const ret = await fetch(
        environment.baseApiUrl +
          `/search?q=${query}&db=${db}&numberOfArticles=${numberOfArticles}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const body = await ret.json();
      setResults(body as ParsedArticlesByArticleId[]);
    } catch (e) {
      console.log(e);
      setErrMsg('An error occurred in loading your results');
    } finally {
      setIsLoading(false);
    }
  }
  const history = useHistory();
  useEffect(() => {
    search(query);
  }, []);
  return (
    <div className="results-container">
      {isLoading && (
        <div className="loading-container">
          <p>Loading your results...</p>
          <ClimbingBoxLoader size={15} color={'#123abc'} loading={isLoading} />
        </div>
      )}
      {errMsg && <div className="error-container">{errMsg}</div>}
      {!isLoading && !errMsg && (
        <div className="result-container">
          <p>Search again</p>
          <SearchBar<void>
            onSearch={(query) => {
              onSearch(query, parseInt(db) as ScholarsDB, history);
              window.location.reload();
            }}
          />
          <hr />
          <p>Results for {decodeURIComponent(query)}</p>
          <hr />
          <hr />
          {searchResults.map((result, i) => (
            <SingleResult
              key={`single-result-${i}`}
              groupedByArticle={result}
            />
          ))}
        </div>
      )}
    </div>
  );
}
