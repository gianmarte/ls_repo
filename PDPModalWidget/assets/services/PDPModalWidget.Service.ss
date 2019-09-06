
function service(request, response)
{
	'use strict';
	try 
	{
		require('Kodella.PDPModalWidget.PDPModalWidget.ServiceController').handle(request, response);
	} 
	catch(ex)
	{
		console.log('Kodella.PDPModalWidget.PDPModalWidget.ServiceController ', ex);
		var controller = require('ServiceController');
		controller.response = response;
		controller.request = request;
		controller.sendError(ex);
	}
}