// Entry point for javascript creates a router to handle new routes and adds a view inside the Product Details Page

define(
	'Kodella.ProductLineExt.ProductLineExt'
,   [
		'Kodella.ProductLineExt.ProductLineExt.StockDescription.View.Ext'
	,	'ProductLine.StockDescription.View'
	,	'Product.Model'
	,	'LiveOrder.Model'
	,	'Cart.Lines.View'
	]
,   function (
		ProductLineExtDescView
	,	ProductLineStockDescriptionView
	,	ProductModel
	,	LiveOrderModel
	,	CartLinesView
	)
{
	'use strict';

	return  {
		mountToApp: function mountToApp (container)
		{
		}
	};
});
