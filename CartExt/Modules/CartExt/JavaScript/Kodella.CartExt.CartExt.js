// Entry point for javascript creates a router to handle new routes and adds a view inside the Product Details Page

define(
	'Kodella.CartExt.CartExt'
,   [
		'Kodella.CartExt.CartExt.Lines.View.Ext.View'
	,	'Cart.Item.Summary.View'
	,	'Cart.Item.Actions.View'
	,	'Backbone.CollectionView'	

	,	'LiveOrder.Model'

	,	'underscore'
	]
,   function (
		CartExtLineView
	,	CartItemSummaryView
	,	CartItemActionsView
	,	BackboneCollectionView

	,	LiveOrderModel

	,	_
	)
{
	'use strict';

	return  {
		mountToApp: function mountToApp (container)
		{
			var cart = container.getComponent('Cart')
			,	cart_model = LiveOrderModel.getInstance();

			cart.addChildViews(
				'Cart.Detailed.View'
				, {
					'Item.ListNavigable':
					{
						'Item.ListNavigable':
						{
							childViewConstructor: function () {
								var lines = _.filter(cart_model.get('lines').models || [], function (line) { return line.get('free_gift') !== true; });

								return new BackboneCollectionView
								({
										collection: lines
									,	viewsPerRow: 1
									,	childView: CartExtLineView
									,	childViewOptions: {
											navigable: true
										,	application: cart.application
										,	SummaryView: CartItemSummaryView
										,	ActionsView: CartItemActionsView
										,	showAlert: false
										}
								});
							}
						}
					}
				}
			);
		}
	};
});
