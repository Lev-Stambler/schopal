import {
  ParsedArticleHead,
  ScholarsParserOpts,
  UrlWithTag,
} from '@foodmedicine/interfaces';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { Scraper } from '@foodmedicine/scraper';
import * as parsers from '../parsers';
import { getSynonyms } from '@foodmedicine/word-explorer';

/**
 * Construct the google scholars url which will be scraped
 * @param pageSize - the number of articles to get
 */
function createEuropePMCUrl(
  query: string,
  pageSize: number,
  synonym = true
): string {
  return encodeURI(
    `https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=${query}&synonym=${synonym}&pageSize=${pageSize}`
  );
}

/**
 * Find all the PDF urls which could have related articles to the remedy
 * @returns an array of PDF urls
 */
export async function runScholarsScraper(
  query: string,
  pageSize = 25
): Promise<ParsedArticleHead[]> {
  const queryUrl = createEuropePMCUrl(query, pageSize);
  const querySynonyms = await getSynonyms(query);
  const remedyScraper = new Scraper<ParsedArticleHead>(parsers.EuropePMCParser, {
    url: queryUrl,
    tag: {
      query,
      querySynonyms,
    },
  } as UrlWithTag);

  const articleHeads = await remedyScraper.run();
  return articleHeads;
}
