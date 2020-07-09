import {
  ParsedArticleHead,
  UrlWithTag,
  ScholarsDB,
} from '@foodmedicine/interfaces';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { Scraper } from '@foodmedicine/scraper';
import { EuropePMCParser } from '../parsers';

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

export async function runEuropePMCScrapers(
  query: string,
  querySynonyms: string[],
  pageSize = 10
): Promise<ParsedArticleHead[]> {
  const queryUrl = createEuropePMCUrl(query, pageSize);
  const remedyScraper = new Scraper<ParsedArticleHead>(EuropePMCParser, {
    url: queryUrl,
    tag: {
      query,
      querySynonyms,
    },
  } as UrlWithTag);

  const articleHeads = await remedyScraper.run();
  return articleHeads;
}
