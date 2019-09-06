
define(
	'Kodella.PDPModalWidget.PDPModalWidget.ServiceController'
	, [
		'ServiceController'
		, 'SC.Models.Init'
		, 'Kodella.PDPModalWidget.PDPModalWidget.Model'
	]
	, function (
		ServiceController
		, ModelsInit
		, PDPModalWidgetModel
	) {
		'use strict';

		return ServiceController.extend({

			name: 'Kodella.PDPModalWidget.PDPModalWidget.ServiceController'

			, get: function get() {
				return PDPModalWidgetModel.get();
			}
		});
	}
);