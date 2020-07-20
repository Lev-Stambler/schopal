import { ParsedArticleHead, ScholarsDB } from '@foodmedicine/interfaces';
import { runEuropePMCScrapers } from './europepmc-scraper';
import { runArxivScrapers } from './arxiv-scraper';

import { getSynonyms } from '@foodmedicine/word-explorer';
/**
 * Find all the PDF urls which could have related articles to the remedy
 * @returns an array of PDF urls
 */
export async function runScholarsScraper(
  query: string,
  db: ScholarsDB,
  pageSize: number
): Promise<ParsedArticleHead[]> {
  const querySynonyms = await getSynonyms(query);
  if (db === ScholarsDB.RUN_ALL) {
    // TODO have more intelligent partitioning of pageSize. If a search is more bio related, have there be more weight
    // for europepmc. If more computer related, more arxiv weight
    const europepmcProm = runEuropePMCScrapers(query, querySynonyms, Math.ceil(pageSize / 2));
    const arxivProm = runArxivScrapers(query, querySynonyms, Math.ceil(pageSize / 2));
    const articlesNested = Promise.all([europepmcProm, arxivProm]);
    return (await articlesNested).flat();
  } else if (db === ScholarsDB.EUROPE_PMC) {
    return runEuropePMCScrapers(query, querySynonyms, pageSize);
  } else if (db === ScholarsDB.ARXIV) {
    return runArxivScrapers(query, querySynonyms, pageSize);
  }
  return runEuropePMCScrapers(query, querySynonyms, pageSize);
}
