import { runAllScrapers } from './health-site-scraper';

describe('scrapes health sites to find recommendations for certain impacts', () => {
  it('return a list of recommendations for certain impacts', async () => {
    const heads = await runAllScrapers();
    expect(heads[0].recommendations).toBeTruthy();
    expect(heads[0].impacted).toBeTruthy();
  });
});
