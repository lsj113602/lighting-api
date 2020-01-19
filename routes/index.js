/*
*所有的路由接口
*/
// const comment = require('./comment');
const timeAxis = require('./timeAxis');
import apiRoutes from './apiRoutes';

module.exports = app => {
  app.use('/api', apiRoutes);

	app.post('/addTimeAxis', timeAxis.addTimeAxis);
	app.post('/updateTimeAxis', timeAxis.updateTimeAxis);
	app.post('/delTimeAxis', timeAxis.delTimeAxis);
	app.get('/getTimeAxisList', timeAxis.getTimeAxisList);
	app.post('/getTimeAxisDetail', timeAxis.getTimeAxisDetail);

};
