/**
 * Article model module.
 * @file 文章数据模型
 * @module model/article
 * @author biaochenxuying <https://github.com/biaochenxuying>
 */

const { mongoose } = require('../core/mongodb.js');
const autoIncrement = require('mongoose-auto-increment');

// 文章模型
const articleSchema = new mongoose.Schema({
	// 文章标题
	title: { type: String, required: true, validate: /\S+/ },

	// 文章关键字（SEO）
	keyword: [{ type: String, default: '' }],

	// 作者
	author: { type: String, default: 'admin' },

	// 文章描述
	desc: { type: String, default: '' },

	// 文章内容
	content: { type: String, required: true, validate: /\S+/ },

	// 字数
	numbers: { type: String, default: 0 },

	// 封面图
	img_url: { type: String, default: '' },

	// 文章类型 => 1: 公告，2: 活动，3: 其他
	type: { type: Number, default: 1 },

	// 文章发布状态 => 0 草稿，1 已发布
	state: { type: Number, default: 1 },

	// 文章转载状态 => 0 原创，1 转载，2 混合
	origin: { type: Number, default: 0 },

	// 文章标签
	tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag', required: true }],

	// 创建日期
	create_time: { type: Date, default: Date.now },

	// 最后修改日期
	update_time: { type: Date, default: Date.now },
});

// 自增 ID 插件配置
articleSchema.plugin(autoIncrement.plugin, {
	model: 'Article',
	field: 'id',
	startAt: 1,
	incrementBy: 1,
});

// 文章模型
module.exports = mongoose.model('Article', articleSchema);
