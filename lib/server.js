const express = require('express');
const helmet = require('helmet');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

const { initRoutes } = require('../lib/router');

try {
	app.use(cors());
	app.use(helmet());
	app.use( bodyParser.json() );
	const router = initRoutes(express);

	app.use('/batchsvc', router);
	app.listen(process.env.PORT || 3000);
	console.log('Server up and running...');
} catch (e) {
	console.log('Server failed to start with error:\n', e);
}