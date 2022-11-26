import express from 'express';
import cors from 'cors';
import { get as healthCheckHandler } from './v1/health-check/handler';
import { get as daoHandler } from './v1/dao/handler';
import { get as daoProposalsHandler } from './v1/dao-proposals/handler';
import { get as daosHandler } from './v1/daos/handler';
import { get as proposalHandler } from './v1/proposal/handler';
import { get as proposalsHandler } from './v1/proposals/handler';
import { post as purgeHandler } from './v1/admin/purge/handler';
import { HttpError } from '@apps-shared/api/utils';
import { env } from 'process';

const httpErrorHandler = (handler) => async (req, res, next) => {
  handler(req, res, next).catch((error: Error) => {
    if (error instanceof HttpError) {
      res.status(error.statusCode).send(error.message);
      return;
    }
    next(error);
  });
};

const router = express.Router();

router.get('/v1/health-check', httpErrorHandler(healthCheckHandler));
router.get('/v1/daos', httpErrorHandler(daosHandler));
router.get('/v1/daos/:address', httpErrorHandler(daoHandler));
router.get('/v1/daos/:address/proposals', httpErrorHandler(daoProposalsHandler));
router.get('/v1/daos/:address/proposals/:id', httpErrorHandler(proposalHandler));
router.get('/v1/proposals', httpErrorHandler(proposalsHandler));

if (env.NETWORK !== 'mainnet') {
  router.post('/v1/admin/purge', httpErrorHandler(purgeHandler));
}

const app = express();

app.use(cors());

app.use('/', router);

export { app };
