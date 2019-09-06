
define('Kodella.PDPModalWidget.PDPModalWidget.Model'
	, [
		'Backbone'
		, 'Backbone.CachedModel'
		, 'Utils'
		, 'underscore'
	]
	, function (
		Backbone
		, BackboneCachedModel
		, Utils
		, _
	) {
		'use strict';

		var PDPModalWidgetModel = BackboneCachedModel.extend({

			urlRoot: Utils.getAbsoluteUrl(getExtensionAssetsPath('services/PDPModalWidget.Service.ss'))

			, initialize: function (options) {
				this.options = options;
			}
		});

		return PDPModalWidgetModel;
	});