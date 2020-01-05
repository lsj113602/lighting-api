/*
*所有的路由接口
*/
const article = require('./article');
const comment = require('./comment');
const message = require('./message');
const tag = require('./tag');
const category = require('./category');
const timeAxis = require('./timeAxis');
const project = require('./project');
import apiRoutes from './apiRoutes';

module.exports = app => {
  app.use('/api', apiRoutes);

	app.post('/addTimeAxis', timeAxis.addTimeAxis);
	app.post('/updateTimeAxis', timeAxis.updateTimeAxis);
	app.post('/delTimeAxis', timeAxis.delTimeAxis);
	app.get('/getTimeAxisList', timeAxis.getTimeAxisList);
	app.post('/getTimeAxisDetail', timeAxis.getTimeAxisDetail);

};
