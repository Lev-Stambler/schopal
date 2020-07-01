export enum ArticleParagraphBacksUpClaim {
  yes = 'y',
  no = 'n',
  notApplicable = 'na',
}

type getCorrelationScoreFunction = (
  paragraph: string,
  impacted: string,
  recommendation: string,
  impactedSynonyms: string[],
  recommendationSynonyms: string[]
) => ParsedArticleParagraph;

export interface BaseParserOptions {
  tag?: string;
}

interface ArticleParserOptions extends BaseParserOptions {
  getCorrelationScore: getCorrelationScoreFunction;
}

export interface EbiParserOptions extends ArticleParserOptions {
  parsedArticleHead: ParsedArticleHead;
}

interface RecommendationInfo {
  filename?: string;
  recommendation: string;
}

export interface HealthRemedies {
  impacted: string;
  recommendations: RecommendationInfo[];
}

export type ImpactFileListItem = HealthRemedies;

export type ImpactFileList = ImpactFileListItem[];

/**
 * Contains the outline information of an article
 */
export interface ParsedArticleHead {
  id: string;
  title: string;
  xmlFullTextDownloadLink: string;
  impacted: string;
  recommendation: string;
  impactedSynonyms: string[];
  recommendationSynonyms: string[];
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
  backsUpClaim: ArticleParagraphBacksUpClaim;
}

export interface Parser<IRet> {
  parserF: (inputSource: string, opts?: any) => Promise<IRet[] | IRet>;
}

export interface ScholarsParserOpts extends UrlWithTag {
  tag: {
    recommendation: string;
    impacted: string;
    impactedSynonyms: string[];
  };
}

export interface UrlWithTag {
  url: string;
  tag?: any;
}
