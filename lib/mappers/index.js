const { mapResponse } = require('./responseMapper');
const { createRequestArray } = require('./requestMapper');


Object.assign(module.exports,{
	mapResponse,
	createRequestArray
});