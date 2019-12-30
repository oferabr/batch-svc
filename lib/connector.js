const axios = require('axios');
const { map } = require('lodash');

const sendAllRequests = async requestsArray => {

	const promises = map(requestsArray, request=> send(request));
	const responses = await Promise.all(map(promises,(p => p.catch(error => error))));
	return responses;
};


const send = async (reqParams)=> await axios(reqParams);

Object.assign(module.exports,{
	sendAllRequests
});