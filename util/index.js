const jwt = require('jsonwebtoken');
import { responseClient } from '../util/util.js';

import { TokenKey } from './constants.js';

export const createToken = (payload, expTime = {expiresIn: 60*60*24*30}) => { // 单位是秒
  const tokeyStr = jwt.sign(payload, TokenKey, expTime);
  return tokeyStr;
};

export const checkToken = (token) => {
  try {
    const payload = jwt.verify(token, TokenKey);
    return payload || '';
  } catch (err) {
    return '';
  }
};

export const verifyJWT = (req, res, next) => {
  const token = req.headers.accesstoken;
  try {
    const decoded = jwt.verify(token, TokenKey);
    if (decoded) {
      return next();
    }
    return responseClient(res, 200, 401, 'token已经过期，请重新登陆');
  } catch (err) {
    return responseClient(res, 200, 403, 'token已经过期，请重新登陆');
  }
};