import * as util from 'util';
import * as wordnet from 'wordnet';
import * as natural from 'natural';
import contractions from 'contractions';
import stopWord from 'stopword';

const wordnetLookup = util.promisify(wordnet.lookup);

export async function getSynonyms(word: string): Promise<string[]> {
  // n is for the nouns
  const synonymWordsArrProms: Promise<string[][]>[] = word.split(' ').map(
    async (individualWord): Promise<string[][]> => {
      try {
        return (
          await wordnetLookup(natural.PorterStemmer.stem(individualWord))
        ).map((def) => def.meta.words.map((item) => item.word));
      } catch (e) {
        console.error(
          'Error finding synonyms for %s. Error %s',
          individualWord,
          e
        );
        return [[]];
      }
    }
  );
  const synonymWordsArr: string[][][] = await Promise.all(synonymWordsArrProms);
  // make sure the items in the array are all truthy
  const synonymWords = synonymWordsArr
    .flat(Infinity)
    .filter((synonym) => synonym && !word.includes(synonym));
  if (!synonymWords) {
    return [];
  }
  console.info('Found synonym words for %s:', word, synonymWords);
  return synonymWords;
}

/**
 * Clean a string for preprocessing.
 * Remove stop words and contractions
 * Ex: I can't believe that it is red becomes I cannot believe it red
 */
export function cleanString(s: string): string {
  const noContraction = contractions.expand(s);
  const noStopWords = stopWord.removeStopwords(noContraction.split(' ')).join(' ');
  return noStopWords;
}
