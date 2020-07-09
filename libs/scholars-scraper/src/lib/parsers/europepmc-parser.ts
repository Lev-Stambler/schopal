import {
  Parser,
  ParsedArticleHead,
  ScholarsParserOpts,
} from '@foodmedicine/interfaces';
import * as xmlJs from 'xml2js';

/**
 * A parser for https://www.ebi.ac.uk/europepmc/webservices/rest/
 */
export const EuropePMCParser: Parser<ParsedArticleHead> = {
  parserF: async (xml, opts?: ScholarsParserOpts) => {
    if (!opts) {
      throw 'Options must be passed into this scraper';
    }
    const parser = new xmlJs.Parser();
    const jsonRes = await parser.parseStringPromise(xml);
    const allResults = jsonRes.responseWrapper.resultList[0].result;
    const parsedHeads: ParsedArticleHead[] = allResults.map((res) => {
      return {
        id: res.id[0],
        title: res.title[0],
        fullTextDownloadLink: `https://www.ebi.ac.uk/europepmc/webservices/rest/${res.id[0]}/fullTextXML`,
        query: opts.tag.query,
        querySynonyms: opts.tag.querySynonyms,
      };
    });
    return parsedHeads;
  },
};
