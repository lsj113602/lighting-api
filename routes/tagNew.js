import { Router } from 'express';
const tag = require('../controller/tag');

const routes = new Router();

routes.post(
  '/addTag',
  tag.addTag,
);

routes.get(
  '/getList',
  tag.getTagList,
);
export default routes;
