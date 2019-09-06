// Entry point for javascript creates a router to handle new routes and adds a view inside the Product Details Page

define(
	'Kodella.PDPModalWidget.PDPModalWidget'
	, [
		'Kodella.PDPModalWidget.PDPModalWidget.View'
		, 'Kodella.PDPModalWidget.PDPModalWidget.Collection'
		, 'Kodella.PDPModalWidget.PDPModalWidget.Model'
		, 'Backbone'
	]
	, function (
		PDPModalWidgetView
		, PDPModalWidgetCollection
		, PDPModuleWidgetModel
		, Backbone
	) {
		'use strict';

		return {
			mountToApp: function mountToApp(container) {
				// create a model and instantiate the router
				/*var widget_collection = new PDPModalWidgetCollection();
				var widget_model = new PDPModuleWidgetModel();*/

				// using the 'PDP' component we add a new child view inside the 'Product.Information' existing view 
				// (there will be an DOM element with the HTML attribute data-view="Product.Information")

				/* @type {ProductDetailsComponent} */
				/*var pdp = container.getComponent('PDP');

				if (pdp) {
					pdp.addChildViews(
						'ProductDetails.Full.View'
						, {
							'Product.Information': {
								'Kodella.PDPModalWidget.PDPModalWidget.View':
								{
									childViewConstructor: function () {
										widget_collection.fetch();

										console.log("widget_collection", widget_collection);
										return new PDPModalWidgetView({
											collection: widget_collection
										});
									}
								}
							}
						}
					);
				}
				*/
			}
		};
	});
