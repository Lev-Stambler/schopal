type getCorrelationScoreFunction = (
  paragraph: string,
  query: string,
  querySynonyms: string[],
  maintainWithinPercent?: number
) => ParsedArticleParagraph;

export interface BaseParserOptions {
  tag?: string;
}

interface ArticleParserOptions extends BaseParserOptions {
  getCorrelationScore: getCorrelationScoreFunction;
}

export interface EuropePMCOptions extends ArticleParserOptions {
  parsedArticleHead: ParsedArticleHead;
}

/**
 * Contains the outline information of an article
 */
export interface ParsedArticleHead {
  id: string;
  title: string;
  xmlFullTextDownloadLink: string;
  query: string;
  querySynonyms?: string[];
}

export interface ParsedArticle {
  head: ParsedArticleHead;
  paragraphs: ParsedArticleParagraph[];
}

export interface ParsedArticleParagraph {
  body: string;
  correlationScore: number;
}

export interface ParsedArticleParagraphStandalone extends ParsedArticleParagraph {
  head: ParsedArticleHead
}

export interface Parser<IRet> {
  parserF: (inputSource: string, opts?: any) => Promise<IRet[] | IRet>;
}

export enum ScholarsDB {
  ARXIV = 0,
  EUROPE_PMC,
}

export interface ScholarsParserOpts extends UrlWithTag {
  tag: {
    query: string;
    querySynonyms: string[];
  };
}

export interface UrlWithTag {
  url: string;
  tag?: any;
}
