import {
  ParsedArticle,
  Parser,
  ParsedArticleParagraph,
  EuropePMCOptions,
} from '@foodmedicine/interfaces';
import * as cheerio from 'cheerio';

async function downloadArticle(url: string): Promise<string> {
  const ret = await fetch(url);
  return await ret.text();
}

/**
 * A parser for https://www.ebi.ac.uk/europepmc/webservices/rest/
 */
export const EuropePMCParser: Parser<ParsedArticle> = {
  parserF: async (xmlDownloadLink: string, opts?: EuropePMCOptions) => {
    const xml = await downloadArticle(xmlDownloadLink);
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
          opts.parsedArticleHead.query,
          opts.parsedArticleHead.querySynonyms
        )
    );
    const article: ParsedArticle = {
      head: opts.parsedArticleHead,
      paragraphs,
    };
    return article;
  },
};
