import * as express from 'express';
import searchRouter from './search';

const router = express.Router();

router.use('/search', searchRouter);

export default router;
