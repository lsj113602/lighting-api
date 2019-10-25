import { Router } from 'express';
import { verifyJWT } from '../util/index.js';
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
  verifyJWT,
  user.checkUser
);
export default routes;
