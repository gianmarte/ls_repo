
// Example of basic CRUD operations of Kodella.PDPModalWidget.PDPModalWidget

define('Kodella.PDPModalWidget.PDPModalWidget.Model'
	, [
		'SC.Model'
		, 'SC.Models.Init'
		, 'Application'

		, 'underscore'
	]
	, function (
		SCModel
		, ModelsInit
		, Application

		, _
	) {
		'use strict';

		return SCModel.extend({

			name: 'Kodella.PDPModalWidget.PDPModalWidget'

			, get: function (id) {
				var filters = [
					new nlobjSearchFilter('isinactive', null, 'is', 'F')
				];

				var columns = [
					new nlobjSearchColumn('custrecordslug')
					, new nlobjSearchColumn('custrecorddefinition')
					, new nlobjSearchColumn('custrecordurl')
					, new nlobjSearchColumn('custrecordimageurl')
					, new nlobjSearchColumn('custrecordname')
				];

				var modal_widget_search = Application.getAllSearchResults('customrecordlightboltdefinitions', filters, columns);

				modal_widget_search = _.map(modal_widget_search, function mapResult(result) {
					return {
						slug: result.getValue('custrecordslug')
						, definition: result.getValue('custrecorddefinition')
						, record_url: result.getValue('custrecordurl')
						, img_url: result.getValue('custrecordimageurl')
						, title: result.getValue('custrecordname')
					}
				});

				return modal_widget_search;
			}
		});
	});