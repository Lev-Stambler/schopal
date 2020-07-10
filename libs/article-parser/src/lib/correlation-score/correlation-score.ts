import {
  ParsedArticleHead,
  Parser,
  ParsedArticle,
  ParsedArticleParagraph,
  EuropePMCOptions,
  ScholarsDB,
  ArxivOptions,
} from '@foodmedicine/interfaces';
import * as fetch from 'node-fetch';
import { correlationWeights, cutOffs } from './correlation-constants';
import * as natural from 'natural';
import * as parsers from '../parser';

const tokenizer = new natural.WordTokenizer();

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
 * Current features include query frequencies, query synonym frequencies
 */
function computeScore(queryFreq: number, querySynonymWordFreq: number): number {
  const queryScore = queryFreq * correlationWeights.queryWordFreq;
  const querySynonymScore =
    querySynonymWordFreq * correlationWeights.querySynonymWordFreq;
  return querySynonymScore + queryScore;
}

function stemString(input: string) {
  return natural.PorterStemmer.tokenizeAndStem(input).join(' ');
}

function getWholeParagraphCorrelationScore(
  paragraph: string,
  query: string,
  querySynonyms: string[]
): ParsedArticleParagraph {
  const queryStem = stemString(query);
  const paragraphStemmed = stemString(paragraph);
  const querySynonymFreq = findWordsFreqFuzzy(querySynonyms, paragraphStemmed);

  const correlationScore = computeScore(
    findWordFreqFuzzy(queryStem, paragraphStemmed),
    querySynonymFreq
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
  query: string,
  querySynonyms: string[],
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
    query,
    querySynonyms
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
      query,
      querySynonyms
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
      query,
      querySynonyms
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
  db: ScholarsDB
): Promise<ParsedArticle> {
  console.info(
    `Downloaded data for ${articleHead.query} with url ${articleHead.fullTextDownloadLink}`
  );
  if (db === ScholarsDB.EUROPE_PMC) {
    const parser = parsers.EuropePMCParser;
    return (await parser.parserF(articleHead.fullTextDownloadLink, {
      parsedArticleHead: articleHead,
      getCorrelationScore: getShortestParagraphCorrelationScore,
    } as EuropePMCOptions)) as ParsedArticle;
  } else if (db === ScholarsDB.ARXIV) {
    const parser = parsers.ArxivParser;
    return (await parser.parserF(articleHead.fullTextDownloadLink, {
      parsedArticleHead: articleHead,
      getCorrelationScore: getShortestParagraphCorrelationScore,
    } as ArxivOptions)) as ParsedArticle;
  }

  const parser = parsers.EuropePMCParser;
  return (await parser.parserF(articleHead.fullTextDownloadLink, {
    parsedArticleHead: articleHead,
    getCorrelationScore: getShortestParagraphCorrelationScore,
  } as EuropePMCOptions)) as ParsedArticle;
}
