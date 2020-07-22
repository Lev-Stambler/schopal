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
  parsedArticleHead: ParsedArticleHead;
}

export type ArxivOptions = ArticleParserOptions;
export type EuropePMCOptions = ArticleParserOptions;

/**
 * Contains the outline information of an article
 */
export interface ParsedArticleHead {
  DBType: ScholarsDB;
  id: string;
  title: string;
  fullTextDownloadLink: string;
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

export interface ParsedArticleParagraphStandalone
  extends ParsedArticleParagraph {
  head: ParsedArticleHead;
}

export interface ParsedArticlesByArticleId {
  head: ParsedArticleHead;
  paragraphs: ParsedArticleParagraph[];
}

export interface Parser<IRet> {
  parserF: (inputSource: string, opts?: any) => Promise<IRet[] | IRet>;
}

export enum ScholarsDB {
  RUN_ALL = 0,
  ARXIV,
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
