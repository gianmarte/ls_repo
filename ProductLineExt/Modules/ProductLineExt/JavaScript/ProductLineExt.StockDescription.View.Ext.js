// List View, it will create as child view a collection of Edit Views.

define('Kodella.ProductLineExt.ProductLineExt.StockDescription.View.Ext'
	, [
		'ProductLine.StockDescription.View'

		, 'product_line_stock_description_ext.tpl'

		, 'underscore'
	]
	, function (
		ProductLineStockDescription

		, product_line_stock_description_ext_tpl

		, _
	) {
		'use strict';
		return ProductLineStockDescription.extend({

			template: product_line_stock_description_ext_tpl

			, initialize: function () 
			{
				ProductLineStockDescription.__super__.initialize.apply(this, arguments);
			}

			, getSpecialOrderMsg: function()
			{
				//gets the cart special message
				this.cust_stock_msg = this.model.get('item').get('_specialOrder');

				//finds the word Special Order in the string and returns the index
				this.special_order_idx = this.cust_stock_msg.search("Special Order");

				//finds the word </span> : this is important to get the additional text
				this.special_special_txt_idx = this.cust_stock_msg.search('</span> : ');

				//if the word in stock soon is found on the string return true, else false. This controls if the special order message will be displayed on the cart or just the quantity available
				this.show_special_msg = this.special_order_idx > 0 ? true : false;

				//Parses the string to pull out the Special Order phrase
				this.is_special_order = this.cust_stock_msg.substring(this.special_order_idx, this.special_order_idx + 13);

				if(this.show_special_msg) 
				{
					return this.is_special_order;
				}

				return "";
			}

			, getInStockSoonMsg: function() 
			{
				//gets the cart in stock soon message
				this.cust_instock_msg = this.model.get('item').get('_inStockSoon');

				//finds the world In Stock Soon in the string and returns the index
				this.in_stock_soon_idx = this.cust_instock_msg.search("In Stock Soon");

				//finds the word </span> : this is important to get the additional text
				this.special_special_txt_idx = this.cust_instock_msg.search('</span> : ');

				//if the word in stock soon is found on the string return true, else false. This controls if the special order message will be displayed on the cart or just the quantity available
				this.show_in_stock_msg = this.in_stock_soon_idx > 0 ? true : false;

				//Parses the string to pull out the In Stock Soon phrase
				this.is_in_stock_soon = this.cust_instock_msg.substring(this.in_stock_soon_idx, this.in_stock_soon_idx + 13);

				if(this.show_in_stock_msg) {
					return this.is_in_stock_soon;
				}

				return "";
			}

			, getCustMsg: function()
			{
				this.cust_instock_msg = this.model.get('item').get('_inStockSoon');
				this.cust_stock_msg = this.model.get('item').get('_specialOrder');

				this.special_order_idx = this.cust_stock_msg.search("Special Order");
				this.in_stock_soon_idx = this.cust_instock_msg.search("In Stock Soon");

				//Parses the string to get the additional text
				this.add_idx = this.special_order_idx ? 8 : this.in_stock_soon_idx ? 10 : 0;
				this.is_special_txt = this.cust_stock_msg.substring(this.special_special_txt_idx + this.add_idx, this.cust_stock_msg.length - 12);

				return this.is_special_txt;
			}

			, getContext: function () 
			{
				this.stock_info = this.model.getStockInfo();
				this.is_special_order = this.getSpecialOrderMsg();
				this.is_in_stock_soon = this.getInStockSoonMsg();
				this.is_special_txt = this.getCustMsg();

				this.qty = this.model.get('quantity');
				this.showAvail = this.qty > this.stock_info.stock ? true : false;

				//if the word special order/in stock soon is found on the string return true, else false. This controls if the special order message will be displayed on the cart or just the quantity available
				this.show_cust_msg = this.is_special_order != "" || this.is_in_stock_soon != ""  ? true : false;

				//@class ProductLine.Stock.View.Context
				return {
					//@property {Boolean} showStockDescription
					showStockDescription: !!(this.stock_info.showStockDescription && this.stock_info.stockDescription)
					//@property {Item.Model.StockInfo} stockInfo
					, stockInfo: this.stock_info
					, showStockAvail: this.showAvail
					, qtyAvail: this.stock_info.stock
					, showCustMsg: this.show_cust_msg
					, showSpecialMsg: this.show_special_msg
					, showInStockMsg: this.show_in_stock_msg
					, isSpecialOrder: this.is_special_order
					, isInStockSoon: this.is_in_stock_soon
					, specialOrderTxt: this.is_special_txt
				};
			}
		})
	});