import { runScholarsScraper } from './scholars-scraper';
import { ScholarsDB } from '@foodmedicine/interfaces';

describe('scrapes Ebi to find scholarly articles', () => {
  it('should return 25 article heads for each query', async () => {
    it('should use EUROPE PMC', async () => {
      const recommendation = 'cabbage';
      const heads = await runScholarsScraper(
        `${recommendation} for acne`,
        ScholarsDB.EUROPE_PMC
      );
      expect(heads).toHaveLength(25);
      expect(heads[0].id).toBeTruthy();
      expect(heads[0].title).toBeTruthy();
      expect(heads[0].fullTextDownloadLink).toBeTruthy();
    });
    it('should use Arxiv', async () => {
      const heads = await runScholarsScraper(
        `Computer science theory`,
        ScholarsDB.ARXIV
      );
      expect(heads).toHaveLength(25);
      expect(heads[0].id).toBeTruthy();
      expect(heads[0].title).toBeTruthy();
      expect(heads[0].fullTextDownloadLink).toBeTruthy();
    });
  });
});
