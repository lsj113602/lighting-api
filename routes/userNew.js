import { Router } from 'express';
const user = require('./user');

const routes = new Router();

// 酒店资源
routes.post(
  '/login',
  user.login,
);
routes.get(
  '/get',
  user.login,
);
routes.post(
  '/register',
  user.register
);
routes.post(
  '/update',
  user.updateUser
);
routes.get(
  '/checkUser',
  user.checkUser
);
export default routes;
