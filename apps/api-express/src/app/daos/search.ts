import {
  ParsedArticleParagraphStandalone,
  ParsedArticle,
  ParsedArticleParagraph,
  ScholarsDB,
  ParsedArticlesByArticleId,
} from '@foodmedicine/interfaces';
import { runScholarsScraper } from '@foodmedicine/scholars-scraper';
import * as articleParser from '@foodmedicine/article-parser';
import { cleanString } from '@foodmedicine/word-explorer';

function groupParagraphsByArticle(
  articlesStandalone: ParsedArticleParagraphStandalone[]
): ParsedArticlesByArticleId[] {
  const byIds: { [key: string]: ParsedArticleParagraphStandalone[] } = {};
  articlesStandalone.map((articleStandalone) => {
    if (!byIds[articleStandalone.head.id]) {
      byIds[articleStandalone.head.id] = [];
    }
    byIds[articleStandalone.head.id].push(articleStandalone);
  });
  const parsedByTitle: ParsedArticlesByArticleId[] = Object.keys(byIds)
    .map((id) => {
      if (!byIds[id] || byIds[id].length === 0) {
        return null;
      }
      return {
        head: byIds[id][0].head,
        paragraphs: byIds[id].map((paragraphStandalone) => {
          return {
            body: paragraphStandalone.body,
            correlationScore: paragraphStandalone.correlationScore,
          };
        }),
      } as ParsedArticlesByArticleId;
    })
    .filter((item) => item !== null);
  return parsedByTitle;
}

function sortParagraphsByArticle(
  a: ParsedArticlesByArticleId,
  b: ParsedArticlesByArticleId
): number {
  const aTotalScore = a.paragraphs.reduce(
    (prev, paragraph) => (prev += paragraph.correlationScore),
    0
  );
  const bTotalScore = b.paragraphs.reduce(
    (prev, paragraph) => (prev += paragraph.correlationScore),
    0
  );
  return bTotalScore - aTotalScore;
}

export async function findQueryResults(
  query: string,
  opts?: {
    numberOfArticles?: number;
    maxNumberOfParagraphs?: number;
  }
): Promise<ParsedArticlesByArticleId[]> {
  const cleanedQuery = cleanString(query);
  const articleHeads = await runScholarsScraper(
    cleanedQuery,
    ScholarsDB.RUN_ALL,
    opts?.numberOfArticles || 25
  );
  const downloadProms: Promise<ParsedArticle>[] = articleHeads.map(
    async (articleHead) => {
      const evaluatedArticle: ParsedArticle = await articleParser.evaluateArticle(
        articleHead
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
  // // Sort in descending order and remove empty items
  // allParagraphsStandalone.sort(
  //   (a, b) => b.correlationScore - a.correlationScore
  // );
  const allParagraphsStandaloneFiltered = allParagraphsStandalone.filter(
    (paragraph) => paragraph.body?.trim().length > 0
  );
  const filteredByLength = allParagraphsStandaloneFiltered.slice(
    0,
    opts?.maxNumberOfParagraphs || allParagraphsStandalone.length
  );
  const byArticle = groupParagraphsByArticle(filteredByLength);
  byArticle.map((article) =>
    article.paragraphs.sort((a, b) => b.correlationScore - a.correlationScore)
  );
  return byArticle.sort((a, b) => sortParagraphsByArticle(a, b));
}
