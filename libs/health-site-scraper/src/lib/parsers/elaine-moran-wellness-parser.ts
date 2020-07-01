import { Parser, HealthRemedies } from '@foodmedicine/interfaces';
import * as cheerio from 'cheerio';

/**
 * A parser for https://elainemoranwellness.com/food-as-medicine-database/search-by-health-condition
 */
export const ElainemoranWellnessParser: Parser<HealthRemedies> = {
  parserF: async (html) => {
    const $ = cheerio.load(html);
    const impacted = $('h1.entry-title').text().toLowerCase();

    // remove parantheses which are used as side notes
    // replace & symbol with and
    // make the text lowercase
    const foodItems = $('div.thrv_wrapper ul li')
      .map((i, el) =>
        $(el)
          .text()
          .replace(/\(.*\)/g, '')
          .replace('&', 'and')
          .toLowerCase()
      )
      .get();
    const res: HealthRemedies[] = [
      {
        impacted,
        recommendations: foodItems.map((foodItem) => {
          return {
            recommendation: foodItem,
          };
        }),
      },
    ];
    return res;
  },
};
