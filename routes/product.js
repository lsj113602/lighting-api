import { Router } from 'express';
var fs = require('fs');
var multer  = require('multer')
const link = require('./link');


const createFolder = function(folder){
  try{
    fs.accessSync(folder);
  }catch(e){
    fs.mkdirSync(folder);
  }
};
const uploadFolder = './upload/';
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
var upload = multer({ storage: storage })


const routes = new Router();

routes.post(
  '/productUpload',
  upload.single('logo'),
  (req, res, next) => {
    var url = '/uploadImgs/' + req.file.filename
    res.send({ret_code: url , ss: req.file});
  },
);
routes.post(
  '/getProdet',
  (req, res) => {
    res.send({ret_code: '0'});
  },
);
export default routes;
