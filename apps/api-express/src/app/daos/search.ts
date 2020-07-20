import {
  ParsedArticleParagraphStandalone,
  ParsedArticle,
  ParsedArticleParagraph,
  ScholarsDB,
} from '@foodmedicine/interfaces';
import { runScholarsScraper } from '@foodmedicine/scholars-scraper';
import * as articleParser from '@foodmedicine/article-parser';
import { cleanString } from '@foodmedicine/word-explorer'

export async function findQueryResults(
  query: string,
  db: ScholarsDB,
  opts?: {
    numberOfArticles?: number;
    maxNumberOfParagraphs?: number;
  }
): Promise<ParsedArticleParagraphStandalone[]> {
  const cleanedQuery = cleanString(query);
  const articleHeads = await runScholarsScraper(
    cleanedQuery,
    db,
    opts?.numberOfArticles || 25
  );
  const downloadProms: Promise<ParsedArticle>[] = articleHeads.map(
    async (articleHead) => {
      const evaluatedArticle: ParsedArticle = await articleParser.evaluateArticle(
        articleHead,
        db,
      );
      return evaluatedArticle;
    }
  );
  const allEvaluatedArticles: ParsedArticle[] = await Promise.all(
    downloadProms
  );
  const allParagraphsStandalone: ParsedArticleParagraphStandalone[] = [];
  // For each evaluated article paragraph, form the ParsedArticleParagraphStandalone and push
  // it to the array of all parsed article paragraphs
  allEvaluatedArticles.forEach((article) => {
    const standaloneParagraphs: ParsedArticleParagraphStandalone[] = article.paragraphs.map(
      (paragraph: ParsedArticleParagraph) => {
        return {
          head: article.head,
          ...paragraph,
        };
      }
    );
    allParagraphsStandalone.push(...standaloneParagraphs);
  });
  // Sort in descending order and remove empty items
  allParagraphsStandalone.sort(
    (a, b) => b.correlationScore - a.correlationScore
  );
  const allParagraphsStandaloneFiltered = allParagraphsStandalone.filter(
    (paragraph) => paragraph.body?.trim().length > 0
  );
  return allParagraphsStandaloneFiltered.slice(
    0,
    opts?.maxNumberOfParagraphs || allParagraphsStandalone.length
  );
}
