const { every } = require('lodash');
const { handleRequest } = require('./services');

const isAlive = (req, res) => res.send({ message: `batch server is alive: ${new Date()}` });
const OK_HTTP_STATUS = 200;
const FAILURE_HTTP_STATUS = 500;
const MULTI_HTTP_STATUS = 207;

const getStatus = result => {
	const isAllSuccess = every(result.statuses, item => item.status===OK_HTTP_STATUS);
	const isAllFailure = every(result.statuses, item => item.status >= 400);
	if (isAllSuccess) return OK_HTTP_STATUS;
	if (isAllFailure) return FAILURE_HTTP_STATUS;
	return MULTI_HTTP_STATUS;
};

const performBatchRequests = async (req, res) => {
	try {
		const result = await handleRequest(req);
		const status = getStatus(result);
		res.status(status);
		res.send(result);

	}
	catch (e) {
		console.log('service failed to perform request', e);
		res.status(FAILURE_HTTP_STATUS);
		res.send({});
	}

};

Object.assign(module.exports, {
	isAlive,
	performBatchRequests
});
