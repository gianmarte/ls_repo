define('Kodella.EasyAsk.EasyAsk.Facets.FacetedNavigationItemCategory.View.Ext'
	, [
		'Categories.Utils'
		, 'SC.Configuration'
		, 'Facets.FacetedNavigationItemCategory.View'

		, 'facets_faceted_navigation_item_category.tpl'

		, 'Backbone'
		, 'Backbone.CompositeView'
		, 'underscore'
	]
	, function (
		CategoriesUtils
		, Configuration
		, FacetedNavigationItemCategory

		, facets_faceted_navigation_item_category_tpl

		, Backbone
		, BackboneCompositeView
		, _
	) {
		'use strict';

		// @class Facets.FacetedNavigationItemCategory.View @extends Backbone.View
		return FacetedNavigationItemCategory.extend({
			// @method getContext @return {Facets.FacetedNavigationItemCategory.View.Context}
			getContext: function () {
				var showFacet = this.categories.length
					, values = []
					, self = this
					, showMax = Configuration.get('categories.sideMenu.showMax')
					, uncollapsible = Configuration.get('categories.sideMenu.uncollapsible')
					, collapsed = Configuration.get('categories.sideMenu.collapsed');

				_.each(this.categories, function (category) {
					if (category.fullurl === self.categoryUrl) {
						values.push({
							displayName: category.name
							, label: category.name
							, link: category.fullurl
							, isActive: category.fullurl === self.categoryUrl
							, additionalFields: CategoriesUtils.getAdditionalFields(category, 'categories.sideMenu.additionalFields')
						});
					}
				});

				var max = showMax || values.length
					, displayValues = _.first(values, max)
					, extraValues = _.rest(values, max);

				var breadcrumb = this.model && (this.model.get('breadcrumb') || [])
					, parentName = '';

				if (breadcrumb && breadcrumb.length) {
					var index = breadcrumb.length > 1 ? breadcrumb.length - 2 : breadcrumb.length - 1;
					parentName = breadcrumb[index].name;
				}

				// @class Facets.FacetedNavigationItemCategory.View.Context
				return {
					//@property {String} htmlId
					htmlId: _.uniqueId('commercecategory_')
					// @property {String} facetId
					, facetId: 'commercecategory'
					// @property {Boolean} showFacet
					, showFacet: !!showFacet
					//@property {Array<Object>} values
					, values: values
					// @property {Array<Object>} displayValues
					, displayValues: displayValues
					//@property {Array<Object>} extraValues
					, extraValues: extraValues
					//@property {Boolean} showExtraValues
					, showExtraValues: !!extraValues.length
					//@property {Boolean} isUncollapsible
					, isUncollapsible: !!uncollapsible
					//@property {Boolean} isCollapsed
					, isCollapsed: !uncollapsible && collapsed
					//@property {String} parentName
					, parentName: parentName
					// @class Facets.FacetedNavigationItemCategory.View
				};
			}
		});

	});