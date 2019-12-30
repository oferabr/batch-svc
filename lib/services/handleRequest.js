const { get, /*forEach, isEmpty,*/ map } = require('lodash');
const { sendAllRequests } = require('../connector');
const { createRequestArray, mapResponse } = require('../mappers');

const handle = async req => {

	const body = get(req,'body');
	const requests = createRequestArray(body);
	const result = await sendAllRequests(requests);
	const responseArray =  map(result, response => ({ response, numberOfInvokes:1 }));
	// const retryRequests= getFailedRequests({ responseArray, requests });
	// if (!isEmpty(retryRequests)){
	//    const res = await handleRetry({ retryRequests, responseArray })
	// }
	return mapResponse({ responseArray, invokes: [] });
};

// const handleRetry  = async ({ retryRequests, responseArray }) =>{
// 	const swipeMap={};
// 	const retryRequestsParams = map(retryRequests,'request');
//     const results = await sendAllRequests(retryRequestsParams);
//     forEach(responseArray,(response, originalResponseIndex) => {
//     	forEach(results, (result, retryRsponseIndex) => {
//             if (response.config.url=== result.config.url)
//                 swipeMap[originalResponseIndex] = retryRsponseIndex;
// 		})
// });
// };

// const getFailedRequests= ({ responseArray, requests })=>{
// 	let retryRequests= [];
// 	forEach(responseArray, (item, index)=>{
// 		if (get(item,'response') instanceof Error){
//             retryRequests.push({ request:requests[index], originalIndex: index });
// 		}
// 	});
// 	return retryRequests;
// };

Object.assign(module.exports,
	{ handle }
);
