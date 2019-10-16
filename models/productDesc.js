/**
 * roject model module.
 * @file 项目模型
 * @module model/project
 * @author biaochenxuying <https://github.com/biaochenxuying>
 */P

const { mongoose } = require('../core/mongodb.js');
const autoIncrement = require('mongoose-auto-increment');

// 项目模型
const projectDescSchema = new mongoose.Schema({
  // 功率
  gonglv: { type: String, required: true },

  // 颜色
  color: { type: String, required: true },

  // 最后修改日期
  update_time: { type: Date, default: Date.now },
});

// 自增ID插件配置
projectSchema.plugin(autoIncrement.plugin, {
  model: 'ProjectDesc',
  field: 'id',
  startAt: 1,
  incrementBy: 1,
});

// 项目模型
module.exports = mongoose.model('ProjectDesc', projectSchema);
