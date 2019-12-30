const { get, map, forOwn } = require('lodash');

const createRequestArray = body => {

	const payload =  get(body,'payload',[]);
	const method = get(body,'service.verb');
	const serviceUrl = get(body,'service.url');
	return  map(payload, item => {
		const { data, url } = replaceUrlParams({item, serviceUrl});
		return { url, method, data };
	});
};


const replaceUrlParams = ({item, serviceUrl}) => {

	let data;
	let url;
	forOwn(item,(value,key)=>{
		if (key==='body') data = value;
		url = serviceUrl.replace(`{${key}}`,value);
		serviceUrl = url;
	});
	return { url, data };
};


Object.assign(module.exports, {
	createRequestArray
});