import { IMAGE_URL } from '../core/constant';
import { responseClient } from '../util/util';
import Link from '../models/link';


exports.hasErr = (req, res, next) => {
  let page = req.query.page || '1';
  if (page) {
    return next();
	} else {
    responseClient(res, 300, 0, '没有页码数');
	}
};
// 获取全部链接
exports.getLinkList = (req, res) => {
	let keyword = req.query.title || '';
	let type = Number(req.query.type); // 1 :其他友情链接 2: 是博主的个人链接 ,‘’ 代表所有链接
	let pageNum = parseInt(req.query.page) || 1;
	let pageSize = parseInt(req.query.limit) || 100;
	const sort = req.query.sort || 1;
	let conditions = {};
	if (type) {
		if (keyword) {
			const reg = new RegExp(keyword, 'i');
			conditions = {
				$and: [{ $or: [{ type: type }] }, { $or: [{ name: { $regex: reg } }, { desc: { $regex: reg } }] }],
			};
		} else {
			conditions = { type };
		}
	} else {
		if (keyword) {
			const reg = new RegExp(keyword, 'i');
			conditions = { $or: [{ name: { $regex: reg } }, { desc: { $regex: reg } }] };
		}
	}

	let skip = pageNum - 1 < 0 ? 0 : (pageNum - 1) * pageSize;
	let responseData = {
		count: 0,
		list: [],
	};
	Link.countDocuments(conditions, (err, count) => {
		if (err) {
			console.error('Error:' + err);
		} else {
			responseData.count = count;
			// 待返回的字段
			let fields = {
				id: 1,
				name: 1,
        url: 1,
        icon: 1,
        type: 1,
        state: 1,
        sort: 1,
        desc: 1,
        timestamp: 1,
        author: 1,
			};
			let options = {
				skip: skip,
        limit: pageSize,
				sort: { timestamp: sort },
			};
			Link.find(conditions, fields, options, (error, result) => {
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
// 批量增加数据
exports.addLinkList = (req, res) => {
  const body = req.body;
  Link.create(body)
    .then(() => responseClient(res, 200, 0, '添加成功'))
    .catch(err => responseClient(res, 200, 0, '添加失败'));
};
exports.addLink = (req, res) => {
	const { id, name, url, icon, type, state, sort, desc, author } = req.body;
	if (id) {
    Link.findOne({
      id,
    }).then(result => {
      if (!result) {
        let link = new Link({
          name,
          url,
          icon,
          type,
          state,
          sort,
          desc,
          author,
        });
        link
          .save()
          .then(data => {
            responseClient(res, 200, 0, '添加成功', data);
          })
          .catch(err => {
            responseClient(res, 200, 1, err.message || '添加失败');
          });
      } else {
        responseClient(res, 200, 1, '该链接名已存在');
      }
    })
	} else {
    let link = new Link({
      name,
      url,
      icon,
      type,
      state,
      sort,
      desc,
      author,
    });
    link
      .save()
      .then(data => {
        responseClient(res, 200, 0, '添加成功', data);
      })
      .catch(err => {
        responseClient(res, 200, 1, err.message || '添加失败');
      });
	}
};
//
exports.updateLink = (req, res) => {
  const { id, name, url, icon, type, state, sort, desc, author } = req.body;
	Link.update(
		{ id: id },
		{
      name,
      url,
      icon,
      type,
      state,
      sort,
      desc,
      author,
		},)
		.then(result => {
			responseClient(res, 200, 0, '操作成功', result);
		})
		.catch(err => {
			console.error(err);
			responseClient(res);
		});
};
exports.delLink = (req, res) => {
	let { id } = req.body;
	Link.deleteMany({ _id: id })
		.then(result => {
			if (result.n === 1) {
				responseClient(res, 200, 0, '删除成功!');
			} else {
				responseClient(res, 200, 1, '所选不存在');
			}
		})
		.catch(err => {
			console.error(err);
			responseClient(res);
		});
};

exports.delLinkAll = (req, res) => {
  Link.remove()
    .then(result => {
      responseClient(res, 200, 0, `删除${result.n }条数据`);
    })
    .catch(err => {
      console.error(err);
      responseClient(res);
    });
};

exports.uploadLinkImg = (req, res) => {
	console.log('uploadLinkImg');
  const url = IMAGE_URL + 'linkImage/' + req.file.filename;
  res.send({url: url});
};

exports.uploadLinkVideo = (req, res) => {
  const url = IMAGE_URL + 'linkImage/' + req.file.filename;
  res.send({url: url});
};
