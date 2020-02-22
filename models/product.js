/**
 * Product model module.
 * @file 商品数据模型
 */

const { mongoose } = require('../core/mongodb.js');
const autoIncrement = require('mongoose-auto-increment');

// 商品模型
const productSchema = new mongoose.Schema({
  // 名称
  title: String,

  // 状态 0 下架 1 上线
  status: { type: String, default: 0 },

  // 商品logo图片
  logoImg: String,

  // 商品图片
  imgList: [{ type: String, default: '' }],

  // 商品类型
  type: String,

  // 商品价格
  price: String,

  // 商品原价格
  oldPrice: String,

  // 商品标签
  tags: String,

  // 商品单位
  unit: String,

  // 规格尺寸(mm)：240*340*75mm
  spec: String,

  // 功率（W）：20W
  power: String,

  // 应用空间（厨房、客厅）
  applySpace: String,

  // 商品热度
  hotNum: Number,

  // 商品描述
  desc: String,

  // 商品备注
  remark: String,

  // sort
  sort: Number,

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
module.exports = mongoose.model('Product', productSchema);
