import * as util from 'util';
import * as wordnet from 'wordnet';
import * as natural from 'natural';

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

// TODO add glossary def to word meaning
