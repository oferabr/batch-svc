const { map, get } = require('lodash');

const mapResponse = ({ responseArray, invokes = [] } )=> {

	const statuses = map(responseArray, (item,index) => ({
		status: get(item, 'response.status') || get(item, 'response.response.status', 500),
		numberOfInvokes: get(invokes,`[${index}]`,1)
	}));
	return {
		statuses
	};
};


Object.assign(module.exports, {
	mapResponse
});