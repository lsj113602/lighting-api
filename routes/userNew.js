import { Router } from 'express';
const user = require('./user');

const routes = new Router();

// 酒店资源
routes.get(
  '/login',
  user.login,
);
routes.get(
  '/login5',
  user.login,
);
export default routes;
