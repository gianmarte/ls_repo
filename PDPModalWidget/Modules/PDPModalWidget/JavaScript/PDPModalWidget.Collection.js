// Collection of Kodella.PDPModalWidget.PDPModalWidgetModel

define('Kodella.PDPModalWidget.PDPModalWidget.Collection'
	, [
		'Kodella.PDPModalWidget.PDPModalWidget.Model'

		, 'Utils'
		, 'Backbone'
		, 'Backbone.CachedCollection'
		, 'underscore'
	]
	, function (
		PDPModalWidgetModel

		, Utils
		, Backbone
		, BackboneCachedCollection
		, _
	) {
		'use strict';

		return BackboneCachedCollection.extend({

			url: Utils.getAbsoluteUrl(getExtensionAssetsPath('services/PDPModalWidget.Service.ss'))

			, model: PDPModalWidgetModel
		});
	});