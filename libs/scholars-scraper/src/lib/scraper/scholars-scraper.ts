import {
  ParsedArticleHead,
  ScholarsDB,
} from '@foodmedicine/interfaces';
import { runEuropePMCScrapers } from './europepmc-scraper'
import {  runArxivScrapers} from './arxiv-scraper'

import { getSynonyms } from '@foodmedicine/word-explorer';
/**
 * Find all the PDF urls which could have related articles to the remedy
 * @returns an array of PDF urls
 */
export async function runScholarsScraper(
  query: string,
  db: ScholarsDB,
  pageSize = 25
): Promise<ParsedArticleHead[]> {
  const querySynonyms = await getSynonyms(query);
  if (db === ScholarsDB.EUROPE_PMC) {
    return runEuropePMCScrapers(query, querySynonyms, pageSize);
  } else if (db === ScholarsDB.ARXIV) {
    return runArxivScrapers(query, querySynonyms, pageSize);
  }
  return runEuropePMCScrapers(query, querySynonyms, pageSize);
}
