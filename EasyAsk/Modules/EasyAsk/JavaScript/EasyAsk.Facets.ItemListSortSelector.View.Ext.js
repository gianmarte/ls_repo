define(
	'Kodella.EasyAsk.EasyAsk.Facets.ItemListSortSelector.View.Ext'
,	[		
        'Facets.ItemListSortSelector.View'
    ,	'facets_item_list_sort_selector.tpl'
	,	'Profile.Model'

	,	'Backbone'
	,	'underscore'
	]
,	function(
        FacetsItemListSortSelectorView
	,	facets_item_list_sort_selector_tpl
	,	ProfileModel

	,	Backbone
	,	_
	)
{
	'use strict';

	// @class Facets.ItemListSortSelector.View @extends Backbone.View
	return FacetsItemListSortSelectorView.extend({

		// @property {function} template
        template: facets_item_list_sort_selector_tpl
        
        , setLocalPageSizeURL: function(optionItem)
        {
            //CODE FOR LOCAL
            var curUrl = new URL(window.location.href)
            ,	curUrlHash = window.location.hash != "" ? window.location.hash : window.location.search
            ,	curUrlParam = curUrlHash.substring(curUrlHash.indexOf('?'), curUrlHash.length)
            ,	urlParam = new URLSearchParams(curUrlParam)
            ,	keyword = urlParam.get('keywords')
            ,	showVal = urlParam.get('show');

            if(keyword && showVal)
            {
                if(optionItem.isDefault)
                {
                    curUrl.searchParams.set('keywords', keyword);
                    curUrl.searchParams.set('show', showVal);
                }
                else
                {
                    curUrl.searchParams.set('keywords', keyword);
                    curUrl.searchParams.set('show', showVal);
                    curUrl.searchParams.set('order', optionItem.id);
                }

                var parseSearch = decodeURIComponent(curUrl.search).indexOf('+') >= 0 
                        ? decodeURIComponent(curUrl.search).split('+').join(" ")
                        : decodeURIComponent(curUrl.search);

                console.log("parseSearch", parseSearch);

                curUrl.hash = curUrl.hash.substring(curUrl.hash.indexOf('#')+1, curUrl.hash.indexOf('?')) + parseSearch;
                console.log("curUrl.hash", curUrl.hash);

                return decodeURIComponent(curUrl.hash)
            }
            else if(keyword && showVal == null)
            {
                if(optionItem.isDefault)
                {
                    curUrl.searchParams.set('keywords', keyword);
                }
                else
                {
                    curUrl.searchParams.set('keywords', keyword);
                    curUrl.searchParams.set('order', optionItem.id);
                }

                var parseSearch = decodeURIComponent(curUrl.search).indexOf('+') >= 0 
                        ? decodeURIComponent(curUrl.search).split('+').join(" ")
                        : decodeURIComponent(curUrl.search);

                        console.log("parseSearch", parseSearch);

                curUrl.hash = curUrl.hash.substring(curUrl.hash.indexOf('#')+1, curUrl.hash.indexOf('?')) + parseSearch;
                console.log("curUrl.hash", curUrl.hash);

                return decodeURIComponent(curUrl.hash)
            }
            else if(keyword == null && showVal)
            {
                if(optionItem.isDefault)
                {
                    curUrl.searchParams.set('show', showVal);
                }
                else
                {
                    curUrl.searchParams.set('show', showVal);
                    curUrl.searchParams.set('order', optionItem.id);
                }

                var parseSearch = decodeURIComponent(curUrl.search).indexOf('+') >= 0 
                        ? decodeURIComponent(curUrl.search).split('+').join(" ")
                        : decodeURIComponent(curUrl.search);

                        console.log("parseSearch", parseSearch);

                curUrl.hash = curUrl.hash.substring(curUrl.hash.indexOf('#')+1, curUrl.hash.indexOf('?')) + parseSearch;
                console.log("curUrl.hash", curUrl.hash);

                return decodeURIComponent(curUrl.hash)
            }
            else
            {	
                if(curUrlHash.indexOf('?') >= 0)
                {
                    if(!optionItem.isDefault)
                    {
                        curUrl.searchParams.set('order', optionItem.id);
                    }

                    var parseSearch = decodeURIComponent(curUrl.search).indexOf('+') >= 0 
                        ? decodeURIComponent(curUrl.search).split('+').join(" ")
                        : decodeURIComponent(curUrl.search);

                        console.log("parseSearch", parseSearch);
                        
                    curUrl.hash = curUrl.hash.substring(curUrl.hash.indexOf('#')+1, curUrl.hash.indexOf('?')) + parseSearch;
                    console.log("curUrl.hash", curUrl.hash);
    
                    return decodeURIComponent(curUrl.hash);
                }
                else
                {	
                    return curUrlHash + '?order=' + optionItem.id;
                }
            }
        }

        , setProdPageSizeURL: function(optionItem)
        {
            //CODE FOR PRODUCTION
            var cur_url = new URL(window.location.href)
            ,	keyword = cur_url.searchParams.get('keywords')
            ,	showVal = cur_url.searchParams.get('show');

            keyword ? cur_url.searchParams.set('keywords', keyword) : "";
            showVal ? cur_url.searchParams.set('show', showVal) : "";
            optionItem.isDefault ? "" : cur_url.searchParams.set("order", optionItem.id);

            console.log("cur_url.pathname + decodeURIComponent(cur_url.search)", cur_url.pathname + decodeURIComponent(cur_url.search));

            return cur_url.pathname + cur_url.search;
        }

		// @method getContext @returns {Facets.ItemListSortSelector.View.Context}
	    , getContext: function ()
		{
			var option_items = this.options.options
			,	translator = this.options.translator
            ,	processed_option_items = []
            ,   self = this;

			//if price display is disabled, left aside the filters about price
			if (ProfileModel.getInstance().hidePrices())
			{
				option_items = _.filter(option_items, function (item)
				{
					return item.id.search('price') === -1;
				});
			}

			_.each(option_items, function(option_item) {
                console.log("option_item sort selector", option_item);
                var orderURL = window.location.hash != "" ? self.setLocalPageSizeURL(option_item) : self.setProdPageSizeURL(option_item); 

                console.log("orderURL", orderURL);

				var processed_option_item = {
					configOptionUrl: orderURL //translator.cloneForOptions({order: option_item.id, page: 1}).getUrl()
				,	isSelected: translator.getOptionValue('order') === option_item.id ? 'selected' : ''
				,	name: option_item.name
				,	className: option_item.id.replace(':','-')
				};

				processed_option_items.push(processed_option_item);
			});

			// @class Facets.ItemListSortSelector.View.Context
			return {	
				// @property {Array<Object>} options
				options: processed_option_items
			};
		}
	});
});