/**
 * API Routes
 */
import { Router } from 'express';
import HTTPStatus from 'http-status';

import User from './userNew';
import Link from './linkNew';

const routes = new Router();

routes.get('/clientip', async (req, res) => {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const singleIP = ip.split(',')[0];
  res.send(singleIP);
});


// 会员信息相关
routes.use('/user', User);

// 跳转banner
routes.use('/link', Link);

routes.all('*', (req, res, next) =>
  next(new APIError('Not Found!', HTTPStatus.NOT_FOUND, true)),
);


export default routes;
