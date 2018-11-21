/**
 * User model module.
 * @file 权限和用户数据模型
 * @module model/user
 * @author biaochenxuying <https://github.com/biaochenxuying>
 */

const crypto = require('crypto');
const { argv } = require('yargs');
const { mongoose } = require('../core/mongodb.js');
const autoIncrement = require('mongoose-auto-increment');

const userSchema = new mongoose.Schema({
	// 名字
	name: { type: String, required: true, default: '' },

	// 用户类型 0：博主 1：其他用户
	type: { type: Number, default: 1 },

	// 手机
	phone: { type: String, default: '' },

	img_url: { type: String, default: '' },

	// 邮箱
	email: { type: String, required: true, validate: /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/ },

	// 个人介绍
	introduce: { type: String, default: '' },

	// 头像
	avatar: { type: String, default: 'user' },

	// 密码
	password: {
		type: String,
		required: true,
		default: crypto
			.createHash('md5')
			.update(argv.auth_default_password || 'root')
			.digest('hex'),
	},

	// 创建日期
	create_time: { type: Date, default: Date.now },

	// 最后修改日期
	update_time: { type: Date, default: Date.now },
});

// 自增 ID 插件配置
userSchema.plugin(autoIncrement.plugin, {
	model: 'User',
	field: 'id',
	startAt: 1,
	incrementBy: 1,
});

module.exports = mongoose.model('User', userSchema);
