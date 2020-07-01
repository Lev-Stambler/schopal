import { evaluateArticle } from './correlation-score';
import { EbiParser } from '../parser';

describe('scrapes and parse an article from Ebi to find a correlation score', () => {
  it('should return 25 article heads for each recomendation', async () => {
    const mockRemedy = {
      impacted: 'acne',
      recommendations: ['cabbage'],
    };
    const paragraphs = await evaluateArticle(
      {
        id: '31990149',
        title:
          'Cabbage looper (Trichoplusia ni Hübner) labial glands contain unique bacterial flora in contrast with their alimentary canal, mandibular glands, and Malpighian tubules.',
        xmlFullTextDownloadLink:
          'https://www.ebi.ac.uk/europepmc/webservices/rest/31990149/fullTextXML',
        impacted: 'acne',
        recommendation: 'cabbage',
      },
      EbiParser
    );
  });
});
