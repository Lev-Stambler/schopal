import {
  ParsedArticleHead,
  UrlWithTag,
  ScholarsDB,
} from '@foodmedicine/interfaces';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { Scraper } from '@foodmedicine/scraper';
import { ArxivParser } from '../parsers';

/**
 * Construct the google scholars url which will be scraped
 * @param pageSize - the number of articles to get
 */
function createArxivUrl(
  query: string,
  pageSize: number,
): string {
  return encodeURI(
    `http://export.arxiv.org/api/query?search_query=all:${query}&start=0&max_results=${pageSize}`
  );
}

export async function runArxivScrapers(
  query: string,
  querySynonyms: string[],
  pageSize = 25
): Promise<ParsedArticleHead[]> {
  const queryUrl = createArxivUrl(query, pageSize);
  const remedyScraper = new Scraper<ParsedArticleHead>(ArxivParser, {
    url: queryUrl,
    tag: {
      query,
      querySynonyms,
    },
  } as UrlWithTag);

  const articleHeads = await remedyScraper.run();
  return articleHeads;
}
