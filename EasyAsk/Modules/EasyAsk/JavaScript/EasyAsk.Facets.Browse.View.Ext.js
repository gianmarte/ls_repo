define('Kodella.EasyAsk.Facets.Browse.View.Ext'
	, [
		'Facets.Browse.View'
		, 'Facets.FacetedNavigation.View'
		, 'Kodella.EasyAsk.EasyAsk.Facets.FacetedNavigation.View.Ext'
		, 'Facets.FacetedNavigationItem.View'
		, 'Kodella.EasyAsk.EasyAsk.Facets.FacetedNavigationItem.View.Ext'
		, 'Facets.ItemCell.View'
		, 'Kodella.EasyAsk.EasyAsk.Facets.ItemCell.View.Ext'
		, 'Kodella.EasyAsk.EasyAsk.Facets.ItemListShowSelector.View.Ext'
		, 'Item.Model'
		, 'GlobalViews.Pagination.View'
		, 'Kodella.EasyAsk.EasyAsk.Model'
		, 'LiveOrder.Model'
		, 'Kodella.EasyAsk.Facets.Browse.CategoryHeading.View.Ext'
		, 'Kodella.EasyAsk.EasyAsk.Facets.FacetedNavigationItemCategory.View.Ext'
		, 'Kodella.EasyAsk.EasyAsk.Facets.ItemListSortSelector.View.Ext'

		, 'kodella_easyask_easyask.tpl'
		, 'facets_items_collection.tpl'
		, 'facets_items_collection_view_cell.tpl'
		, 'facets_items_collection_view_row.tpl'

		, 'Utils'
		, 'Backbone'
		, 'Backbone.CollectionView'
		, 'Backbone.CompositeView'
		, 'jQuery'
		, 'underscore'
	]
	, function (
		FacetsBrowseView
		, FacetsFacetedNavigationView
		, FacetsFacetedNavigationViewExt
		, FacetsFacetedNavigationItemView
		, FacetsFacetedNavigationItemViewExt
		, FacetsItemCellView
		, FacetsItemCellViewExt
		, FacetsItemListShowSelectorViewExt
		, ItemModel
		, GlobalViewsPaginationView
		, EAModel
		, LiveOrderModel
		, FacetsCategoryHeadingExt
		, FacetedNavigationItemCategoryViewExt
		, FacetsItemListSortSelectorViewExt

		, kodella_easyask_easyask_tpl
		, facets_items_collection_tpl
		, facets_items_collection_view_cell_tpl
		, facets_items_collection_view_row_tpl

		, Utils
		, Backbone
		, BackboneCollectionView
		, BackboneCompositeView
		, jQuery
		, _
	) {
		'use strict';
		// @class Kodella.EasyAsk.Facets.Browse.View.Ext @extends Backbone.View
		return FacetsBrowseView.extend({

			template: kodella_easyask_easyask_tpl

			, events: _.extend(FacetsBrowseView.prototype.events, {})

			, initialize: function (options) {
				//console.log("options", options);
				this.ea_model = options.ea_model;
				this.resultsPerPage = Utils.deepCopy(options.application.getConfig('easyAskConfig.pageSize'));
				this.fragment = Backbone.history.fragment;
				this.item_model = options.item_model;

				FacetsBrowseView.prototype.initialize.apply(this, arguments);

				//console.log("this.translator", this.translator);
			}

			, getEasyAskAttr: function () {
				var facet_arr = [];
				var facets = this.ea_model.get('facets');

				for (var i = 0; i < facets.length; i++) {
					var facet_obj = {};

					facet_obj.id = facets[i].name;
					facet_obj.values = facets[i].attributeValueList;
					facet_obj.isInitDispLimited = facets[i].isInitDispLimited;
					facet_obj.url = facets[i].name;

					facet_arr.push(facet_obj);
				}

				return facet_arr;
			}

			, getPagination: function getPagination() 
			{
				var self = this;
				this.products = this.ea_model.get('itemDescription');

				return _.extend({}, FacetsBrowseView.prototype.getPagination.apply(this, arguments), {
					currentPage: self.products.currentPage
					, pageCount: self.products.pageCount
					, pageSize: parseInt(self.products.resultsPerPage)
					, itemCount: self.products.totalItems
				});
			}

			, _gotoFacets: function _gotoFacet(e) 
			{
				var curURL = new URL(window.location.href)
					, ea_seopath = jQuery(e.currentTarget).attr('data-easeopath')
					, hasKeyword = window.location.hash != ""
						?	new URLSearchParams(curURL.href.substring(curURL.href.indexOf('?'))).get('keywords') 
						:	curURL.searchParams.get('keywords')
					, hasPageSize = window.location.hash != ""
						?	new URLSearchParams(curURL.href.substring(curURL.href.indexOf('?'))).get('show')
						:	curURL.searchParams.get('show')
					, hasSort = window.location.hash != ""
						?	new URLSearchParams(curURL.href.substring(curURL.href.indexOf('?'))).get('order')
						:	curURL.searchParams.get('order')
					,	searchParam = ea_seopath.indexOf(':') >= 0 ? 'search/' + ea_seopath : 'search';

					hasKeyword ? curURL.searchParams.set('keywords', hasKeyword) : "";
					hasPageSize ? curURL.searchParams.set('show', hasPageSize) : "";
					hasSort ? curURL.searchParams.set('order', hasSort) : "";

					window.location.hash != "" 
						? curURL.hash = hasKeyword ? searchParam + curURL.search : ea_seopath + curURL.search
						: curURL.pathname = hasKeyword ? searchParam : ea_seopath;

					
					var final_href = window.location.hash != "" ? decodeURIComponent(curURL.hash) : curURL.pathname + decodeURIComponent(curURL.search);

					console.log("final_href", final_href);
					Backbone.history.navigate(final_href, { trigger: true });
			}

			, _gotoShow: function (e) {
				var pagesize_val = parseInt(Utils.getParameterByName(e.currentTarget.value, 'show'), 10)
				,	showHref = '';

				if(window.location.hash != "")
				{
					showHref = window.location.hash.indexOf('?') >= 0 
						? window.location.hash + '&show=' + pagesize_val
						: window.location.hash + '?show=' + pagesize_val
				}
				else
				{
					var curURL = new URL(window.location.origin + window.location.pathname);

					curURL.searchParams.set("show", pagesize_val);

					showHref = curURL.pathname + curURL.search;
				}

				Backbone.history.navigate(showHref, {trigger: true});

				console.log("pagesize_val", pagesize_val);
				console.log("e", e);
			}

			, _gotoPage: function gotoPage(e) {

				var page_num = parseInt(Utils.getParameterByName(e.currentTarget.href, 'page'), 10) || 1
				,	pageHref = ''
				,	self = this;

				if(window.location.hash != "")
				{
					pageHref = window.location.hash.indexOf('?') >= 0
						? window.location.hash + '&page=' + page_num
						: window.location.hash + '?page=' + page_num;
				}
				else
				{
					var curURL = new URL(window.location.origin + window.location.pathname);

					curURL.searchParams.set("page", page_num);

					pageHref = curURL.pathname + curURL.search;
				}

				Backbone.history.navigate(pageHref, {trigger: true});

			}

			, _gotoOrder: function gotoOrder(e)
			{
				var default_value = _.find(this.sortOptions, function(result) { return result.isDefault; }).id
				,	order = Utils.getParameterByName(e.currentTarget.value, 'order') || default_value
				,	orderHref = '';

				if(window.location.hash != "")
				{
					orderHref = window.location.hash.indexOf('?') >= 0
						? window.location.hash + '&order=' + order
						: window.location.hash + '?order=' + order;
				}
				else
				{
					var curURL = new URL(window.location.origin + window.location.pathname);

					curURL.searchParams.set("order", order);

					orderHref = curURL.pathname + curURL.search;
				}

				Backbone.history.navigate(orderHref, {trigger: true});

			}

			, childViews: _.extend(FacetsBrowseView.prototype.childViews,
				{
					'Facets.FacetedNavigation': function (options) {
						var self = this
						,	facets = this.ea_model.get("facets")
						,	facets_length = this.ea_model.get('facets') ? this.ea_model.get('facets').length : 0
						,	selected_facets_arr = [];

						_.each(facets, function(all_facets) {
							_.each(all_facets.attributeValueList, function(selected) {
								if (selected.selected == true) {
									selected_facets_arr.push(selected.nodeString);
								}
							})
						});

						var exclude = _.map((options.excludeFacets || '').split(','), function (facet_id_to_exclude) {
							return jQuery.trim(facet_id_to_exclude);
						})
							, has_categories = !!(this.category && this.category.categories)
							, has_items = this.ea_model.get('items').length
							, has_facets = has_items && facets_length /*has_items && this.model.get('facets').length*/
							, applied_facets = selected_facets_arr
							, has_applied_facets = applied_facets.length
							, facets = this.getEasyAskAttr();

						return new FacetsFacetedNavigationViewExt({
							categoryItemId: this.category && this.category.itemid
							, clearAllFacetsLink: this.translator.categoryUrl //this.translator.cloneWithoutFacets().getUrl()
							, hasCategories: has_categories
							, hasItems: has_items

							// facets box is removed if don't find items
							, hasFacets: has_facets

							, hasCategoriesAndFacets: has_categories && has_facets

							// Categories are not a real facet, so lets remove those
							, appliedFacets: applied_facets

							, hasFacetsOrAppliedFacets: has_facets || has_applied_facets

							//,	translatorUrl: this.translator.getUrl()
							, translator: this.translator

							//,	translatorConfig: this.options.translatorConfig
							, facets: facets /*_.filter(this.model.get('facets'), function (facet)
					{
						return !_.contains(exclude, facet.id);
					})*/

							, totalProducts: self.ea_model.get('itemDescription').totalItems
							, keywords: this.translator.getOptionValue('keywords')
						});
					}
					//Extra Facet filter View
					, 'Facets.FacetedNavigation.Item': function (options) {
						//console.log("facet browse", options);
						var facet_config = this.translator.getFacetConfig(options.facetId)
							, contructor_options = {
								model: new Backbone.Model(this.ea_model.get('facets'))
								, translator: this.translator
								, stateInfo: this.ea_model.get('stateInfo')
							};

						if (facet_config.template) {
							contructor_options.template = facet_config.template;
						}

						return new FacetsFacetedNavigationItemViewExt(contructor_options);
					}

					, 'Facets.Items': function () {
						var self = this
							, display_option = _.find(this.itemsDisplayOptions, function (option) {
								return option.id === self.options.translator.getOptionValue('display');
							});

						return new BackboneCollectionView({
							childTemplate: display_option.template
							, childView: FacetsItemCellViewExt
							, childViewOptions: {
								application: this.application
							}
							, viewsPerRow: parseInt(display_option.columns, 10)
							, collection: this.ea_model.get('items')
							, cellTemplate: facets_items_collection_view_cell_tpl
							, rowTemplate: facets_items_collection_view_row_tpl
							, template: facets_items_collection_tpl
							, context: {
								keywords: this.translator.getOptionValue('keywords')
							}
						});
					}

					, 'Facets.ItemListShowSelector': function () {
						return new FacetsItemListShowSelectorViewExt({
							options: this.resultsPerPage
							, translator: this.translator
						});
					}

					, 'Facets.ItemListSortSelector': function()
					{
						return new FacetsItemListSortSelectorViewExt({
							options: this.sortOptions
						,	translator: this.translator
						});
					}

					, 'GlobalViews.Pagination': function () {
						var self = this;
						this.products = this.ea_model.get('itemDescription') ? this.ea_model.get('itemDescription') : [];

						return new GlobalViewsPaginationView(_.extend({
							currentPage: self.products.currentPage
							, totalPages: self.products.pageCount
						}));
					}

					, 'Facets.CategorySidebar': function () {
						return new FacetedNavigationItemCategoryViewExt({
							model: this.model.get('category')
							, categoryUrl: this.translator.getCategoryUrl()
						});
					}
					/*,	'Facets.Browse.CategoryHeading': function()
						{
							return new FacetsCategoryHeadingExt({
								model: this.model.get('category')
							,	showDescription: this.translator.cloneWithoutFacetId('category').getAllFacets().length === 0
							,	ea_model: this.ea_model
							,	translator: this.translator
							});
						}*/
				})

			, getContext: function () {
				var self = this;

				return _.extend({}, FacetsBrowseView.prototype.getContext.apply(this, arguments), {
					total: self.ea_model.get('itemDescription').totalItems
				});
			}
		});
	});