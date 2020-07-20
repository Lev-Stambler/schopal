import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';

import router from './controllers';

const app = express();
app.use(
  cors()
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', router);

export default app;
