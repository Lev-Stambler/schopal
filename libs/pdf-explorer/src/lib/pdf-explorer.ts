import fetch from 'node-fetch';
import pdf from 'pdf-parse';
import { constants } from './pdf-explorer-constants';

/**
 * Check whether the paragraphs contains valid information
 */
function paragraphContainsInformation(body: string): boolean {
  return body.length > constants.MIN_CHAR_COUNT_PER_PARAGRAPH && body.includes('.');
}

function getCharCount(text: string, pattern: RegExp): number {
  return (text.match(pattern) || []).length;
}

function groupSentencesIntoParagraphs(sentences: string[]): string[] {
  let syntheticParagraphsInd = 0;
  const syntheticParagraphs: string[] = [];
  sentences.forEach((sentence, i) => {
    if (!syntheticParagraphs[syntheticParagraphsInd]) {
      syntheticParagraphs[syntheticParagraphsInd] = sentence + '. ';
    } else {
      syntheticParagraphs[syntheticParagraphsInd] += sentence + '. ';
    }
    if (i % constants.SENTENCES_PER_PARAGRAPH === 0) {
      syntheticParagraphsInd++;
    }
  });
  return syntheticParagraphs;
}

export function splitTextToParagraphs(rawText: string): string[] {
  const tabCount = getCharCount(rawText, /\t/g);
  if (tabCount > constants.MIN_TAB_COUNT) {
    return rawText.split('\t').filter(paragraphContainsInformation);
  }
  const sentences = rawText.split('.');
  return groupSentencesIntoParagraphs(sentences).filter(paragraphContainsInformation);
}

export async function getParagraphsFromPDFUrl(url: string): Promise<string[]> {
  const fetchRes = await fetch(url);
  const buff = await fetchRes.buffer();
  const pdfData = await pdf(buff);
  return splitTextToParagraphs(pdfData.text);
}
