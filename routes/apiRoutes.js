/**
 * API Routes
 */
import { Router } from 'express';
import HTTPStatus from 'http-status';

import User from './userNew';
import Link from './linkNew';
import Article from './articleNew';
import Product from './productNew';
import Tag from './tagNew';

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

// 文章相关
routes.use('/article', Article);

// 商品信息
routes.use('/product', Product);

// 标签
routes.use('/tag', Tag);

routes.all('*', (req, res, next) =>
  next(new APIError('Not Found!', HTTPStatus.NOT_FOUND, true)),
);


export default routes;
