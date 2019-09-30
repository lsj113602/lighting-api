/**
 * API Routes
 */
import { Router } from 'express';
import HTTPStatus from 'http-status';

import user from './userNew';

const routes = new Router();

routes.get('/clientip', async (req, res) => {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const singleIP = ip.split(',')[0];
  res.send(singleIP);
});


// 会员信息相关
routes.use('/user', user);

routes.all('*', (req, res, next) =>
  next(new APIError('Not Found!', HTTPStatus.NOT_FOUND, true)),
);


export default routes;
