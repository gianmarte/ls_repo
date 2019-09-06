define(
	'Kodella.EasyAsk.EasyAsk.Facets.ItemListShowSelector.View.Ext'
	, [
		'Facets.ItemListShowSelector.View'
		, 'kodella_facets_item_list_show_selector_ext.tpl'

		, 'Backbone'
		, 'underscore'
	]
	, function (
		FacetsItemListShowSelectorView
		, kodella_facets_item_list_show_selector_ext_tpl

		, Backbone
		, _
	) {
		'use strict';

		// @class Facets.ItemListShowSelector.View @extends Backbone.View
		return FacetsItemListShowSelectorView.extend({

			template: kodella_facets_item_list_show_selector_ext_tpl

			// @method getContext @returns {Facets.ItemListShowSelector.View.Context}
			, setLocalPageSizeURL: function(optionItem)
			{
				//CODE FOR LOCAL
				var curUrl = new URL(window.location.href)
				,	curUrlHash = window.location.hash != "" ? window.location.hash : window.location.search
				,	curUrlParam = curUrlHash.substring(curUrlHash.indexOf('?'), curUrlHash.length)
				,	urlParam = new URLSearchParams(curUrlParam)
				,	keyword = urlParam.get('keywords')
				,	sortVal = urlParam.get('order');

				console.log("optionItem", optionItem);

				if(keyword && sortVal)
				{
					console.log("FIRST");
					return curUrlHash.substring(0, curUrlHash.indexOf('?')) + '?keywords=' + keyword + '&show=' + optionItem.items + '&order=' + sortVal;
				}
				else if(keyword && sortVal == null)
				{
					console.log("SECOND");
					return curUrlHash.substring(0, curUrlHash.indexOf('?')) + '?keywords=' + keyword + '&show=' + optionItem.items;
				}
				else if(keyword == null && sortVal)
				{
					console.log("THIRD");
					return curUrlHash.substring(0, curUrlHash.indexOf('?')) + '?show=' + optionItem.items + '&order=' + sortVal;
				}
				else
				{	
					if(curUrlHash.indexOf('?') >= 0)
					{
						console.log("ELSE FIRST");
						return curUrlHash.substring(0, curUrlHash.indexOf('?')) + '&show=' + optionItem.items;
					}
					else
					{	
						console.log("ELSE SECOND");
						return curUrlHash + '?show=' + optionItem.items;
					}
				}
			}

			, setProdPageSizeURL: function(optionItem)
			{
				//CODE FOR PRODUCTION
				var cur_url = new URL(window.location.href)
				,	urlParams = new URLSearchParams(window.location.search)
				,	keyword = urlParams.get('keywords')
				,	sortVal = urlParams.get('order');

				if(keyword && sortVal)
				{
					return window.location.pathname + '?keywords=' + keyword + '&show=' + optionItem.items + sortVal;
				}
				else if(keyword && sortVal == null)
				{
					return window.location.pathname + '?keywords=' + keyword + '&show=' + optionItem.items;
				}
				else if(keyword == null && sortVal)
				{
					return window.location.pathname + '?show=' + optionItem.items + '&order=' + sortVal;
				}
				else
				{
					return window.location.pathname + '?show=' + optionItem.items;
				}
			}
			, getContext: function () {
				var option_items = this.options.options
					, processed_option_items = []
					, translator = this.options.translator
					, self = this;

				_.each(option_items, function (option_item) {
					var pageSizeUrl = window.location.hash != "" ? self.setLocalPageSizeURL(option_item) : self.setProdPageSizeURL(option_item);
					
					var processed_option_item = {
						configOptionUrl: pageSizeUrl
						, isSelected: parseInt(translator.getOptionValue('show'), 10) === option_item.items
						, name: option_item.items
						, className: option_item.items
						, pageSize: option_item.items
					};

					processed_option_items.push(processed_option_item);
				});

				// @class Facets.ItemListShowSelector.View.Context
				return {
					// @property {Array} options
					options: processed_option_items
				};
			}
		});
	});