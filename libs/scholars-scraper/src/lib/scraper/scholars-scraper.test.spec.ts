import { runScholarsScraper } from './scholars-scraper';

describe('scrapes Ebi to find scholarly articles', () => {
  it('should return 25 article heads for each recomendation', async () => {
    const recommendation = 'cabbage';
    const heads = await runScholarsScraper('acne', recommendation);
    expect(heads).toHaveLength(25);
    expect(heads[0].id).toBeTruthy();
    expect(heads[0].title).toBeTruthy();
    expect(heads[0].xmlFullTextDownloadLink).toBeTruthy();
  });
});
