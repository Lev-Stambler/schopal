import {
  Parser,
  ParsedArticleHead,
  ScholarsParserOpts,
} from '@foodmedicine/interfaces';
import * as xmlJs from 'xml2js';

/**
 * A parser for http://export.arxiv.org/api/query
 */
export const ArxivParser: Parser<ParsedArticleHead> = {
  parserF: async (xml, opts?: ScholarsParserOpts) => {
    if (!opts) {
      throw 'Options must be passed into this scraper';
    }
    const parser = new xmlJs.Parser();
    const jsonRes = await parser.parseStringPromise(xml);
    const allResults = jsonRes.feed.entry || [];
    const parsedHeads: ParsedArticleHead[] = allResults
      .map((res) => {
        const pdfDownloadLinks = res.link
          .filter((linkItem) => linkItem.$.title === 'pdf')
          .map((linkItem) => linkItem.$.href);
        const fullTextDownloadLink = pdfDownloadLinks[0] || null;
        return {
          id: res.id,
          title: res.title,
          fullTextDownloadLink,
          query: opts.tag.query,
          querySynonyms: opts.tag.querySynonyms,
        };
      })
      .filter((parsedHead) => parsedHead.fullTextDownloadLink !== null);
    return parsedHeads;
  },
};
