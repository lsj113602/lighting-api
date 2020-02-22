import { IMAGE_URL } from '../core/constant';
import { responseClient } from '../util/util';
import Product from '../models/product';

//获取全部商品
exports.getProductList = (req, res) => {
  let title = req.query.title || null;
  let sort = req.query.sort || null;
  let hot = req.query.hotNum || null;
  const ids = (req.query.ids && req.query.ids.split(',')) || [];
  console.log('ids: ', ids);

  let pageNum = parseInt(req.query.pageNum) || 1;
  let pageSize = parseInt(req.query.pageSize) || 50;
  let conditions = {};
  if (title) {
    const reg = new RegExp(title, 'i');
    conditions = {
      $or: [{ title: { $regex: reg } }, { desc: { $regex: reg } }],
      // id: { $in: ids }
    };
  }
  if (ids.length > 0) {
    conditions.id = { $in: ids };
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
        id: 1,
        title: 1,
        status: 1,
        logoImg: 1,
        imgList: 1,
        type: 1,
        price: 1,
        oldPrice: 1,
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
      let s = {
        create_time: 1,
      };
      if (sort) {
        s = {
          create_time: sort?-1:1,
        }
      } else if (hot) {
        s = {
          hotNum: hot?-1:1,
        }
      }
      let options = {
        skip: skip,
        limit: pageSize,
        sort: s,
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
exports.getProductDesc = (req, res) => {
  let id = req.query.id || '';
  Product.findOne({ id}).then(product => {
    responseClient(res, 200, 0, '获取成功', product);
  }).catch(() => {
    responseClient(res, 100, 100, '没有找到此商品', '');
  })
};
exports.addProduct = (req, res) => {
  let { title, status, logoImg, imgList, type, price, oldPrice,
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
          oldPrice,
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
exports.updateProduct =  (req, res) => {
  let { id, title, status, logoImg, imgList, type, price, oldPrice,
    tags, unit, spec, power, applySpace, hotNum, desc, remark, sort } = req.body;
  Product.update(
    { id: id },
    {
      title,
      status,
      logoImg,
      imgList,
      type,
      price,
      oldPrice,
      tags,
      unit,
      spec,
      power,
      applySpace,
      hotNum,
      desc,
      remark,
      sort,
    },)
    .then(result => {
      responseClient(res, 200, 0, '修改成功', result);
    })
    .catch(err => {
      console.error(err);
      responseClient(res);
    });
};
exports.delProduct = (req, res) => {
  let { id } = req.body;
  console.log('req.body:', req);
  Product.deleteMany({ id: id })
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

exports.uploadProductImg = (req, res) => {
  const url = IMAGE_URL + 'productImage/' + req.file.filename;
  res.send({url: url});
};
