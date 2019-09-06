// List View, it will create as child view a collection of Edit Views.

define('Kodella.CartExt.CartExt.Lines.View.Ext.View'
,	[
		'Cart.Lines.View'
	,	'Kodella.ProductLineExt.ProductLineExt.StockDescription.View.Ext'

	,	'underscore'
	]
,	function (
		CartLinesView
	,	ProductLineStockDescExt

	,	_
	)
{
	'use strict';
	return CartLinesView.extend({

		initialize: function(options)
		{
			CartLinesView.__super__.initialize.apply(this, arguments);

			this.newChildView();
		}
	,	newChildView: function ()
		{
			CartLinesView.prototype.childViews['StockDescription'] = function()
			{
				return new ProductLineStockDescExt({
					model: this.model
				});
			};
		}
	});
});