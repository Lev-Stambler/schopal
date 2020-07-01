import React, { useState, useEffect } from 'react';
import { environment } from '../../../environments/environment';
import { ParsedArticleParagraphStandalone } from '@foodmedicine/interfaces';
import ClimbingBoxLoader from 'react-spinners/ClimbingBoxLoader';
import { useLocation, useHistory } from 'react-router-dom';
import { onSearch } from './onsearch';
import './search-result.css';
import { SearchBar } from '@foodmedicine/components';

function SingleResult(props: {
  paragraph: ParsedArticleParagraphStandalone;
  key: string;
}) {
  return (
    <div
      className="single-result-container"
      onClick={() => window.open(props.paragraph.head.xmlFullTextDownloadLink)}
    >
      <h4 aria-label="paper's title">{props.paragraph.head.title}</h4>
      <p aria-label="correlated paragraph">...{props.paragraph.body}...</p>
      <hr />
    </div>
  );
}

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Results() {
  const queryParams = useQuery();
  const [searchResults, setResults] = useState<
    ParsedArticleParagraphStandalone[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, setErrMsg] = useState<string>(null);
  const query = queryParams.get('query');
  async function search(query: string): Promise<void> {
    setIsLoading(true);
    setErrMsg(null);
    try {
      const ret = await fetch(environment.baseApiUrl + `/search?q=${query}`);
      const body = await ret.json();
      setResults(body as ParsedArticleParagraphStandalone[]);
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
              onSearch(query, history);
              window.location.reload();
            }}
          />
          <hr />
          <p>Results for {decodeURIComponent(query)}</p>
          <hr />
          <hr />
          {searchResults.map((result, i) => (
            <SingleResult key={`single-result-${i}`} paragraph={result} />
          ))}
        </div>
      )}
    </div>
  );
}
