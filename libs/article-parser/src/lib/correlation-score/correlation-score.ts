import {
  ParsedArticleHead,
  Parser,
  ParsedArticle,
  ParsedArticleParagraph,
  EbiParserOptions,
} from '@foodmedicine/interfaces';
import * as fetch from 'node-fetch';
import { correlationWeights, cutOffs } from './correlation-constants';
import * as natural from 'natural';

const tokenizer = new natural.WordTokenizer();

async function downloadArticle(url: string): Promise<string> {
  const ret = await fetch(url);
  return await ret.text();
}

/**
 * Find word frequencies through fuzzy search
 */
function findWordFreqFuzzy(word: string, paragraph: string): number {
  const tokenizedParagraph = tokenizer.tokenize(paragraph);
  const overallFreqScore = tokenizedParagraph.reduce(
    (freq: number, paragraphWord) => {
      // distance ranges from 0 to 1. 1 being a perfect match
      const distance = natural.JaroWinklerDistance(word, paragraphWord);
      return freq + (distance > cutOffs.minimumWordDistance ? distance : 0);
    },
    0
  );
  return overallFreqScore;
}

function findWordsFreqFuzzy(words: string[], paragraph: string): number {
  return words
    .map((word) => findWordFreqFuzzy(word, paragraph))
    .reduce((total, score) => total + score, 0);
}

/**
 * Compute the correlation score based off of the inputs
 * Current features include impact frequencies, recommendation frequencies, impact x recommendation
 * Paragraph length
 */
function computeScore(
  impactFreq: number,
  recommendationFreq: number,
  impactSynonymFreq: number,
  recommendationSynonymFreq: number,
  paragraphWordCount: number
): number {
  const impactScore = impactFreq * correlationWeights.impactWordFreq;
  const recommendationScore =
    recommendationFreq * correlationWeights.recommendationWordFreq;
  const impactSynonymScore =
    impactSynonymFreq * correlationWeights.impactSynonymWordFreq;
  const recommendationSynonymScore =
    recommendationSynonymFreq *
    correlationWeights.recommendationSynonymWordFreq;
  const crossScore =
    impactFreq *
    recommendationFreq *
    correlationWeights.impactCrossRecommendation;
  // ensures that both impact and recommendation are seen in the same paragraph
  return (
    impactScore +
    recommendationScore +
    crossScore +
    impactSynonymScore +
    recommendationSynonymScore
  );
}

function stemString(input: string) {
  return natural.PorterStemmer.tokenizeAndStem(input).join(' ');
}

function getWholeParagraphCorrelationScore(
  paragraph: string,
  impacted: string,
  recommendation: string,
  impactedSynonyms: string[],
  recommendationSynonyms: string[]
): ParsedArticleParagraph {
  const impactedStem = stemString(impacted);
  const paragraphStemmed = stemString(paragraph);
  const recommendationStem = stemString(recommendation);
  const impactSynonymFreq = findWordsFreqFuzzy(
    impactedSynonyms,
    paragraphStemmed
  );
  const recommendationSynonymFreq = findWordsFreqFuzzy(
    recommendationSynonyms,
    paragraphStemmed
  );

  const correlationScore = computeScore(
    findWordFreqFuzzy(impactedStem, paragraphStemmed),
    findWordFreqFuzzy(recommendationStem, paragraphStemmed),
    impactSynonymFreq,
    recommendationSynonymFreq,
    paragraph.split(' ').length
  );
  return {
    body: paragraph,
    correlationScore,
  };
}

/**
 * Get the correlation score for the segment of a paragraph with the most matches
 * Will shorten the paragraph as much as possible while trying to mantain the same correlation score
 * + or - {@code maintainWithinPercent}
 */
function getShortestParagraphCorrelationScore(
  paragraph: string,
  impacted: string,
  recommendation: string,
  impactedSynonyms: string[],
  recommendationSynonyms: string[],
  maintainWithinPercent = cutOffs.maintainScoreWithinPercent
): ParsedArticleParagraph {
  function calculatePercentageDifference(x: number, y: number): number {
    return Math.abs((x - y) / x) * 100;
  }
  const sentences = paragraph.split('.');
  // remove the last element if it is empty
  if (!sentences[sentences.length - 1]) {
    sentences.pop();
  }
  const initScore = getWholeParagraphCorrelationScore(
    paragraph,
    impacted,
    recommendation,
    impactedSynonyms,
    recommendationSynonyms
  ).correlationScore;
  let currentScore = initScore;
  let leftInd = 0;
  let rightIndNonInclusive = sentences.length;
  // Attempts to remove sentences from the beginning of the paragraph
  // while having the correlation score stay within half of the {@code maintainWithinPercent}
  while (
    calculatePercentageDifference(initScore, currentScore) <=
      maintainWithinPercent / 2 &&
    leftInd != rightIndNonInclusive
  ) {
    currentScore = getWholeParagraphCorrelationScore(
      sentences.slice(leftInd, rightIndNonInclusive).join('.'),
      impacted,
      recommendation,
      impactedSynonyms,
      recommendationSynonyms
    ).correlationScore;
    leftInd++;
  }
  // Attempts to remove sentences from the end of the paragraph
  // while having the correlation score stay within {@code maintainWithinPercent}
  while (
    calculatePercentageDifference(initScore, currentScore) <=
      maintainWithinPercent &&
    leftInd != rightIndNonInclusive
  ) {
    currentScore = getWholeParagraphCorrelationScore(
      sentences.slice(leftInd, rightIndNonInclusive).join('.'),
      impacted,
      recommendation,
      impactedSynonyms,
      recommendationSynonyms
    ).correlationScore;
    rightIndNonInclusive--;
  }
  // Increment {@code rightIndNonInclusive} because the new correlation score may be
  // over the alloted percentage range after the prior loop. Thus, the last sentence removed
  // is added back
  rightIndNonInclusive =
    rightIndNonInclusive < sentences.length
      ? rightIndNonInclusive + 1
      : rightIndNonInclusive;
  return {
    correlationScore: currentScore,
    body: sentences.slice(leftInd, rightIndNonInclusive).join('.'),
  };
}

export async function evaluateArticle(
  articleHead: ParsedArticleHead,
  parser: Parser<ParsedArticle>
): Promise<ParsedArticle> {
  const inputXML = await downloadArticle(articleHead.xmlFullTextDownloadLink);
  console.info(
    `Downloaded XML for ${articleHead.impacted} for ${articleHead.recommendation} with url ${articleHead.xmlFullTextDownloadLink}`
  );
  // Parser functions return an array, but in this case, only the first result is relevant
  return (await parser.parserF(inputXML, {
    parsedArticleHead: articleHead,
    impacted: articleHead.impacted,
    recommendation: articleHead.recommendation,
    getCorrelationScore: getShortestParagraphCorrelationScore,
  } as EbiParserOptions)) as ParsedArticle;
}
