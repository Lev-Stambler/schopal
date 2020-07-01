import { getSynonyms } from './word-explorer';

describe('getSyonyms', () => {
  it('find an array of synonyms to each word in a string', async () => {
    const synonyms = await getSynonyms('hello');
    expect(synonyms.length > 1).toBeTruthy;
    expect(synonyms.includes('hi')).toBeTruthy;
  });
});
