import { Router } from 'express';
const link = require('../controller/link');
const fs = require('fs');
const multer  = require('multer');

const createFolder = function(folder){
  try{
    fs.accessSync(folder);
  }catch(e){
    fs.mkdirSync(folder);
  }
};
const uploadFolder = './images/linkImage/';
createFolder(uploadFolder);
// 通过 filename 属性定制
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadFolder);    // 保存的路径，备注：需要自己创建
  },
  filename: function (req, file, cb) {
    var fileFormat = (file.originalname).split(".");
    console.log('fileFormat:', fileFormat);
    // 将保存文件名设置为 字段名 + 时间戳，比如 logo-1478521468943
    cb(null, file.fieldname + '-' + Date.now() + '.' + fileFormat[fileFormat.length - 1]);
  }
});
// 通过 storage 选项来对 上传行为 进行定制化
var upload = multer({ storage: storage });

const routes = new Router();

routes.post(
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
routes.get(
  '/getLinkList',
  link.hasErr,
  link.getLinkList,
);
routes.post(
  '/uploadLinkImg',
  upload.single('linkImg'),
  link.uploadLinkImg,
);
export default routes;
