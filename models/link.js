/**
 * Link model module.
 * @file 链接模型
 * @module model/link
 * @author biaochenxuying <https://github.com/biaochenxuying>
 */

const { mongoose } = require('../core/mongodb.js');
const autoIncrement = require('mongoose-auto-increment');

// 链接模型
const linkSchema = new mongoose.Schema({
	// 链接名称
	name: { type: String, required: true },

	// 链接 url
	url: { type: String, default: '' },

	// 图标
	icon: { type: String, default: '' },

	// 类型 =>  // 1 :首页banner, 2: 首页第二行
	type: { type: Number, default: 1 },

	// 状态 => 0 不向外展示，1 向外展示，
	state: { type: Number, default: 1 },

	// 排序
	sort: { type: Number, default: 0 },

  // 链接描述
  desc: { type: String, default: '' },

	// 创建日期
  timestamp: { type: Date, default: Date.now },

	// 最后修改人
  author: { type: String, default: '' },
});

// 自增ID插件配置
linkSchema.plugin(autoIncrement.plugin, {
	model: 'Link',
	field: 'id',
	startAt: 1,
	incrementBy: 1,
});

// 链接模型
module.exports = mongoose.model('Link', linkSchema);
