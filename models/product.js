/**
 * Product model module.
 * @file 商品数据模型
 */

const { mongoose } = require('../core/mongodb.js');
const autoIncrement = require('mongoose-auto-increment');

// 商品模型
const productSchema = new mongoose.Schema({
  // 标签名称
  importance: { type: Number, default: 1 },

  // 标签描述
  timestamp:  { type: Date, default: Date.now },

  // 图标
  title: String,

  // 图标
  status: String,

  // 商品logo图片
  logoImg: String,

  // 商品图片
  imgList: [{ type: String, default: '' }],

  // 商品类型
  type: String,

  // 商品价格
  price: String,

  // 商品标签
  tag: String,

  // desc
  desc: { type: mongoose.Schema.Types.ObjectId, ref: 'ProjectDesc'},
  // 商品备注
  remark: String,

  // 发布日期
  create_time: { type: Date, default: Date.now },

  // 最后修改日期
  update_time: { type: Date, default: Date.now },
});

// 自增ID插件配置
productSchema.plugin(autoIncrement.plugin, {
  model: 'Product',
  field: 'id',
  startAt: 1,
  incrementBy: 1,
});

// 标签模型
module.exports = mongoose.model('Product', tagSchema);
