// List View, it will create as child view a collection of Edit Views.

define('Kodella.HeaderViewExt.Header.Logo.View.Ext'
	, [
		'Header.Logo.View'
		, 'SC.Configuration'
		, 'headerviewlogo_ext.tpl'
		, 'Backbone'
		, 'Utils'
		, 'underscore'
	]
	, function (
		HeaderLogoView
		, Configuration
		, headerviewlogo_ext_tpl
		, Backbone
		, Utils
		, _
	) {
		'use strict';

		return Backbone.View.extend({
			// @property {Function} template
			template: headerviewlogo_ext_tpl

			, getContext: function () {
				var checkout_url_param = new URLSearchParams(Backbone.history.location.search);
				var url_param = checkout_url_param.get("is")
					, url_hash = Backbone.history.location.hash;

				var is_in_checkout = '';

				if(url_param == 'checkout' || url_param == 'login'){
					if(url_hash != "#login-register"){
						is_in_checkout = true;
					}
					else {
						is_in_checkout = false;
					}
				}

				console.log("is_in_checkout", is_in_checkout);
				console.log("url_hash != '#login-register'", url_hash != '#login-register');
				console.log("url_param == 'checkout'", url_param == 'checkout');
				// @class Header.Logo.View.Context
				return {
					// @property {String} logoUrl
					logoUrl: Utils.getAbsoluteUrlOfNonManagedResources(Configuration.get('header.logoUrl'))
					// @property {String} headerLinkHref
					, headerLinkHref: this.options.headerLinkHref || '/'
					// @property {String} headerLinkTouchPoint
					, headerLinkTouchPoint: this.options.headerLinkTouchPoint || 'home'
					// @property {String} headerLinkHashtag
					, headerLinkHashtag: this.options.headerLinkHashtag || '#'
					// @property {String} headerLinkTitle
					, headerLinkTitle: this.options.headerLinkTitle || SC.ENVIRONMENT.siteSettings.displayname
					, isCheckout: is_in_checkout
				};
			}
		});
	});