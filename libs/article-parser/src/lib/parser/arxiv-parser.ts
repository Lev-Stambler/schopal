import {
  ParsedArticle,
  Parser,
  ParsedArticleParagraph,
  ArxivOptions,
} from '@foodmedicine/interfaces';
import * as pdf from 'pdf-parse';


/**
 * A parser for https://www.ebi.ac.uk/europepmc/webservices/rest/
 */
export const ArxivParser: Parser<ParsedArticle> = {
  parserF: async (fileData: string, opts?: ArxivOptions) => {
    if (!opts?.parsedArticleHead) {
      throw 'Please add in the parsed head';
    }
    const pdfData = await pdf(fileData);
    console.log(pdfData.text)
    const paragraphTexts: string[] = pdfData.text.split('.')
    const paragraphs: ParsedArticleParagraph[] = paragraphTexts.map(
      (paragraphText) =>
        opts.getCorrelationScore(
          paragraphText,
          opts.parsedArticleHead.query,
          opts.parsedArticleHead.querySynonyms,
        )
    );
    const article: ParsedArticle = {
      head: opts.parsedArticleHead,
      paragraphs,
    };
    return article;
  },
};
