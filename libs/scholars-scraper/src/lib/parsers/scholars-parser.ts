import {
  Parser,
  ParsedArticleHead,
  ScholarsParserOpts,
} from '@foodmedicine/interfaces';
import * as xmlJs from 'xml2js';
import * as wordExplorer from '@foodmedicine/word-explorer'

/**
 * A parser for https://www.ebi.ac.uk/europepmc/webservices/rest/
 */
export const ScholarsParser: Parser<ParsedArticleHead> = {
  parserF: async (xml, opts?: ScholarsParserOpts) => {
    if (!opts) {
      throw 'Options must be passed into this scraper';
    }
    const parser = new xmlJs.Parser();
    const jsonRes = await parser.parseStringPromise(xml);
    const allResults = jsonRes.responseWrapper.resultList[0].result;
    const recommendationSynonyms = await wordExplorer.getSynonyms(opts.tag.recommendation);
    const parsedHeads: ParsedArticleHead[] = allResults.map((res) => {
      return {
        id: res.id[0],
        title: res.title[0],
        xmlFullTextDownloadLink: `https://www.ebi.ac.uk/europepmc/webservices/rest/${res.id[0]}/fullTextXML`,
        recommendation: opts.tag.recommendation,
        impacted: opts.tag.impacted,
        impactedSynonyms: opts.tag.impactedSynonyms,
        recommendationSynonyms: recommendationSynonyms,
      };
    });
    return parsedHeads;
  },
};
