import { evaluateArticle } from './correlation-score';
import { EuropePMCParser } from '../parser';

describe('scrapes and parse an article from Ebi to find a correlation score', () => {
  it('should return 25 article heads for each recomendation', async () => {
    const paragraphs = await evaluateArticle(
      {
        id: '31990149',
        title:
          'Cabbage looper (Trichoplusia ni Hübner) labial glands contain unique bacterial flora in contrast with their alimentary canal, mandibular glands, and Malpighian tubules.',
        fullTextDownloadLink:
          'https://www.ebi.ac.uk/europepmc/webservices/rest/31990149/fullTextXML',
        query: 'acne for cabbage',
      },
      EuropePMCParser
    );
  });
});
