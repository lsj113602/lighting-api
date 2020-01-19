import { responseClient } from '../util/util';
import Product from '../models/product';

//获取全部商品
exports.getProductList = (req, res) => {
  let title = req.query.title || null;
  let pageNum = parseInt(req.query.pageNum) || 1;
  let pageSize = parseInt(req.query.pageSize) || 10;
  let conditions = {};
  if (title) {
    const reg = new RegExp(title, 'i');
    conditions = {
      $or: [{ title: { $regex: reg } }, { desc: { $regex: reg } }],
    };
  }
  let skip = pageNum - 1 < 0 ? 0 : (pageNum - 1) * pageSize;
  let responseData = {
    count: 0,
    list: [],
  };
  Product.countDocuments(conditions, (err, count) => {
    if (err) {
      console.error('Error:' + err);
    } else {
      responseData.count = count;
      let fields = {
        title: 1,
        status: 1,
        logoImg: 1,
        imgList: 1,
        type: 1,
        price: 1,
        oldPric: 1,
        tags: 1,
        unit: 1,
        spec: 1,
        power: 1,
        applySpace: 1,
        hotNum: 1,
        desc: 1,
        remark: 1,
        sort: 1,
        create_time: 1,
        update_time: 1,
      }; // 待返回的字段
      let options = {
        skip: skip,
        limit: pageSize,
        sort: { create_time: -1 },
      };
      Product.find(conditions, fields, options, (error, result) => {
        if (err) {
          console.error('Error:' + error);
          // throw error;
        } else {
          responseData.list = result;
          responseClient(res, 200, 0, 'success', responseData);
        }
      });
    }
  });
};
exports.addProduct = (req, res) => {
  let { title, status, logoImg, imgList, type, price, oldPric,
    tags, unit, spec, power, applySpace, hotNum, desc, remark, sort } = req.body;
  Product.findOne({
    title,
  })
    .then(result => {
      if (!result) {
        let p = new Product({
          title,
          status,
          logoImg,
          imgList,
          type,
          price,
          oldPric,
          tags,
          unit,
          spec,
          power,
          applySpace,
          hotNum,
          desc,
          remark,
          sort,
        });
        p
          .save()
          .then(data => {
            responseClient(res, 200, 0, '添加成功', data);
          })
          .catch(err => {
            throw err;
          });
      } else {
        responseClient(res, 200, 1, '该标签已存在');
      }
    })
    .catch(err => {
      responseClient(res);
    });
};
exports.delProduct = (req, res) => {
  let { id } = req.body;
  Product.deleteMany({ _id: id })
    .then(result => {
      if (result.n === 1) {
        responseClient(res, 200, 0, '删除成功!');
      } else {
        responseClient(res, 200, 1, '标签不存在');
      }
    })
    .catch(err => {
      responseClient(res);
    });
};
