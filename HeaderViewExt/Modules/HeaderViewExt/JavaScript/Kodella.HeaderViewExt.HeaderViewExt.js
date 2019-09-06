// Entry point for javascript creates a router to handle new routes and adds a view inside the Product Details Page

define(
	'Kodella.HeaderViewExt.HeaderViewExt'
	, [
		'Kodella.HeaderViewExt.Header.Logo.View.Ext'
		, 'Kodella.HeaderViewExt.Header.Menu.View.Ext'
		, 'Kodella.HeaderViewExt.Header.View.Ext'
		, 'Kodella.HeaderViewExt.Header.Menu.MyAccount.View.Ext'
		, 'Kodella.HeaderViewExt.jQuery.Menu.Aim'

		, 'jQuery'
	]
	, function (
		HeaderLogoViewExt
		, HeaderMenuViewExt
		, HeaderViewExt
		, HeaderMenuMyAccountViewExt
		, MenuAim

		, jQuery
	) {
		'use strict';

		return {
			mountToApp: function mountToApp(container) {
				var layout = container.getComponent("Layout")
					, checkout_url_param = new URLSearchParams(Backbone.history.location.search)
					, url_param = checkout_url_param.get("is")
					, url_hash = Backbone.history.location.hash
					, self = this;
			/*,	header_view_file = url_param == 'checkout' ? 'Header.Simplified.View' : 'Header.View'*/;

				HeaderViewExt;
				this.headerMyAccountExtension(layout);

				if(layout) {
					layout.cancelableOn('afterShowContent', function() {
						self.activateMenuAim();
					});
				}

				if (url_param == 'checkout' || url_param == 'login') {
					if (url_hash != "#login-register") {
						console.log("url_hash != '#login-register'");
						self.checkoutHeaderLogoView(layout);
					}
					else {
						self.shoppingHeaderLogoView(layout);
					}
				}
				else {
					console.log("else is not in checkout.ssp")
					self.shoppingHeaderLogoView(layout);
				}
			}
			, checkoutHeaderLogoView: function (layout) {

				layout.addChildViews(
					'Header.Simplified.View'
					, {
						'Header.Logo':
						{
							'Header.Logo':
							{
								childViewConstructor: function () {
									return new HeaderLogoViewExt(layout.application);
								}
							}
						}
					}
				);
			}
			, shoppingHeaderLogoView: function (layout) {

				layout.addChildViews(
					'Header.View'
					, {
						'Header.Logo':
						{
							'Header.Logo':
							{
								childViewConstructor: function () {
									return new HeaderLogoViewExt(layout.application);
								}
							}
						}
						, 'Header.Menu':
						{
							'Header.Menu':
							{
								childViewConstructor: function () {
									var header_view_options = _.extend(
										{
											application: layout.application
											, layout: layout
										}
										, layout.application.headerProfileViewOptions || {}
									);

									return new HeaderMenuViewExt(header_view_options);
								}
							}
						}
					}
				);
			}
			, headerMyAccountExtension: function (layout) {
				layout.addChildViews(
					'Header.Profile.View'
					, {
						'Header.Menu.MyAccount':
						{
							'Header.Menu.MyAccount.Ext':
							{
								childViewConstructor: function () {
									return HeaderMenuMyAccountViewExt;
								}
							}
						}
					}
				);
			}
			, activateMenuAim: function () {
				jQuery(window).ready(function () {

					jQuery('.header-menu-level1').menuAim({
						activate: function (row) {
							jQuery(row).addClass('open');
						}
						, deactivate: function (row) {
							jQuery(row).removeClass('open');
						}
						, exitMenu: function (menu) {
							jQuery('.header-menu-level1>.open').removeClass('open');
						}
					});
				});
			}
		};
	});
