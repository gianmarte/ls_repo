// List View, it will create as child view a collection of Edit Views.

define('Kodella.HeaderViewExt.Header.View.Ext'
	, [
		'Header.View'
		, 'Backbone'
		, 'underscore'
	]
	, function (
		HeaderView
		, Backbone
		, _
	) {
		'use strict';

		_.extend(HeaderView.prototype, {

			//Fix for search sliding up when loading pages. Emptying the initialize property to remove method hiding the search bar
			initialize: function () {

			}
		});
	});