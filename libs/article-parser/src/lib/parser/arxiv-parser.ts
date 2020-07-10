import {
  ParsedArticle,
  Parser,
  ParsedArticleParagraph,
  ArxivOptions,
} from '@foodmedicine/interfaces';
import fetch from 'node-fetch'
import pdf from 'pdf-parse'

/**
 * A parser for https://www.ebi.ac.uk/europepmc/webservices/rest/
 */
export const ArxivParser: Parser<ParsedArticle> = {
  parserF: async (fileUrl: string, opts?: ArxivOptions) => {
    if (!opts?.parsedArticleHead) {
      throw 'Please add in the parsed head';
    }
    try {
      const fetchRes = await fetch(fileUrl);
      const buff = await fetchRes.buffer()
      const pdfData = await pdf(buff)
      console.log(pdfData);
      const paragraphTexts: string[] = pdfData.text.split('.');
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
    } catch (e) {
      console.error(
        `Error parsing article from Arxiv. Skipping the article `,
        e
      );
      return {
        head: opts.parsedArticleHead,
        paragraphs: [],
      };
    }
  },
};
