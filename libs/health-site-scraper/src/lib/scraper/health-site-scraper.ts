import { HealthRemedies } from '@foodmedicine/interfaces';
import { Scraper } from '@foodmedicine/scraper';
import * as parsers from '../parsers';

// TODO, add the following URLs back in once there is full functionality
// 'https://www.elainemoranwellness.com/food-as-medicine-database/search-by-health-condition/muscle-building/',
// 'https://www.elainemoranwellness.com/food-as-medicine-database/search-by-health-condition/energy-increasing/',
// 'https://www.elainemoranwellness.com/food-as-medicine-database/search-by-health-condition/blood-sugar-balancing/',
// 'https://www.elainemoranwellness.com/food-as-medicine-database/search-by-health-condition/acne-clearing/',
export async function runAllScrapers(): Promise<HealthRemedies[]> {
  const urls = [
    'https://www.elainemoranwellness.com/food-as-medicine-database/search-by-health-condition/acne-clearing/',
  ];
  const remediesScraper = new Scraper<HealthRemedies>(
    parsers.ElainemoranWellnessParser,
    ...urls.map((url) => {
      return { url };
    })
  );
  const remedies = await remediesScraper.run();
  return remedies;
}
