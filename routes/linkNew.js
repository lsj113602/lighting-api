import { Router } from 'express';
const link = require('./link');

const routes = new Router();

routes.get(
  '/addLink',
  link.addLink,
);
routes.post(
  '/updateLink',
  link.updateLink,
);
routes.post(
  '/delLink',
  link.delLink,
);
routes.get(
  '/getLinkList',
  link.hasErr,
  link.getLinkList,
);
export default routes;
