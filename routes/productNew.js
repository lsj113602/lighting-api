import { Router } from 'express';
const product = require('../controller/product');
const fs = require('fs');
const multer  = require('multer');

const createFolder = function(folder){
  try{
    fs.accessSync(folder);
  }catch(e){
    fs.mkdirSync(folder);
  }
};
const uploadFolder = './images/productImage/';
createFolder(uploadFolder);
// 通过 filename 属性定制
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadFolder);    // 保存的路径，备注：需要自己创建
  },
  filename: function (req, file, cb) {
    var fileFormat = (file.originalname).split(".");
    // 将保存文件名设置为 字段名 + 时间戳，比如 logo-1478521468943
    cb(null, file.fieldname + '-' + Date.now() + '.' + fileFormat[fileFormat.length - 1]);
  }
});
// 通过 storage 选项来对 上传行为 进行定制化

var upload = multer({ storage: storage });

const routes = new Router();

routes.post(
  '/addProduct',
  product.addProduct,
);
routes.post(
  '/updateProduct',
  product.updateProduct,
);
routes.get(
  '/getProductList',
  product.getProductList,
);
routes.get(
  '/getProductDesc',
  product.getProductDesc,
);
routes.post(
  '/uploadProductImg',
  upload.single('productImg'),
  product.uploadProductImg,
);
routes.post(
  '/deleteProduct',
  upload.single('productImg'),
  product.delProduct,
);
export default routes;
