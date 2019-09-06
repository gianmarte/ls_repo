
function service(request, response)
{
	'use strict';
	try 
	{
		require('Kodella.ProductLineExt.ProductLineExt.ServiceController').handle(request, response);
	} 
	catch(ex)
	{
		console.log('Kodella.ProductLineExt.ProductLineExt.ServiceController ', ex);
		var controller = require('ServiceController');
		controller.response = response;
		controller.request = request;
		controller.sendError(ex);
	}
}