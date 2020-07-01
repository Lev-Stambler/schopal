import {
  ParsedArticle,
  Parser,
  ParsedArticleParagraph,
  EbiParserOptions,
} from '@foodmedicine/interfaces';
import * as cheerio from 'cheerio';

/**
 * A parser for https://www.ebi.ac.uk/europepmc/webservices/rest/
 */
export const EbiParser: Parser<ParsedArticle> = {
  parserF: async (xml: string, opts?: EbiParserOptions) => {
    if (!opts?.parsedArticleHead) {
      throw 'Please add in the parsed head';
    }
    const $ = cheerio.load(xml);
    const paragraphTexts: string[] = $('p')
      .map((i, el) => $(el).text())
      .get();
    const paragraphs: ParsedArticleParagraph[] = paragraphTexts.map(
      (paragraphText) =>
        opts.getCorrelationScore(
          paragraphText,
          opts.parsedArticleHead.impacted,
          opts.parsedArticleHead.recommendation,
          opts.parsedArticleHead.impactedSynonyms,
          opts.parsedArticleHead.recommendationSynonyms
        )
    );
    const article: ParsedArticle = {
      head: opts.parsedArticleHead,
      paragraphs,
    };
    return article;
  },
};
