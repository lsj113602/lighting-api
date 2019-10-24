const jwt = require('jsonwebtoken');

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