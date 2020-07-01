import {
  ParsedArticleParagraphStandalone,
  ParsedArticle,
  ParsedArticleParagraph,
  ArticleParagraphBacksUpClaim,
} from '@foodmedicine/interfaces';
import { runScholarsScraper } from '@foodmedicine/scholars-scraper';
import * as articleParser from '@foodmedicine/article-parser';

export async function findQueryResults(
  query: string,
  opts?: {
    numberOfArticles?: number;
    maxNumberOfParagraphs?: number;
  }
): Promise<ParsedArticleParagraphStandalone[]> {
  // The query is passed in twice in order to not interfere with the cross feature
  const articleHeads = await runScholarsScraper(
    query,
    // TODO this is a temporary fix, removing the entire recommendation, impact abstraction should be done
    query,
    opts?.numberOfArticles || 25
  );
  const downloadProms: Promise<ParsedArticle>[] = articleHeads.map(
    async (articleHead) => {
      const evaluatedArticle: ParsedArticle = await articleParser.evaluateArticle(
        articleHead,
        articleParser.EbiParser
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
          // set default backsUpClaim to notApplicable. This later gets changed manually in the JSON file
          backsUpClaim: ArticleParagraphBacksUpClaim.notApplicable,
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
