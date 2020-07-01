import * as express from 'express';
import { findQueryResults } from '../daos';

const router = express.Router();

/**
 * Search the database for correlated paragraphs
 * @query q - query string
 * @query maxNumberOfParagraphs - optional max number of paragraphs
 * @query numberOfArticles - optional number of articles to search
 */
router.get(
  '/',
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const query = req.query.q as string;
    const results = await findQueryResults(query, {
      numberOfArticles: parseInt(req.query.numberOfArticles as string),
      maxNumberOfParagraphs: parseInt(
        req.query.maxNumberOfParagraphs as string
      ),
    });
    res.status(200).json(results);
  }
);

export default router;
