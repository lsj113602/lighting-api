import { Router } from 'express';
const user = require('./user');

const routes = new Router();

// 酒店资源
routes.post(
  '/login',
  user.login,
);
routes.get(
  '/login5',
  user.login,
);
routes.post(
  '/register',
  user.register
);
export default routes;
