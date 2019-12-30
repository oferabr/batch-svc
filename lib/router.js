const { isAlive, performBatchRequests } = require('./controller');

const initRoutes = express => {

	const router = express.Router();
	router.post('/batch', performBatchRequests);
	router.get('/isAlive', isAlive);
	return router;
};

Object.assign(module.exports,
	{ initRoutes }
);
