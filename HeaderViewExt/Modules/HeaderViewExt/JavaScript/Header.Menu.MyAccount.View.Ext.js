// List View, it will create as child view a collection of Edit Views.

define('Kodella.HeaderViewExt.Header.Menu.MyAccount.View.Ext'
	, [
        'Header.Menu.MyAccount.View'
        
        , 'header_menu_myaccount_view_ext.tpl'

		, 'Backbone'
		, 'underscore'
	]
	, function (
        HeaderMenuMyAccountView
        
        , header_menu_myaccount_view_ext_tpl

		, Backbone
		, _
	) {
        'use strict';
        
        console.log("here");

		_.extend(HeaderMenuMyAccountView.prototype, {

            template: header_menu_myaccount_view_ext_tpl
        });
	});