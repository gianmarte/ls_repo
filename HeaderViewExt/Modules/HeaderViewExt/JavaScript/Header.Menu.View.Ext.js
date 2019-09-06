// List View, it will create as child view a collection of Edit Views.

define(
    'Kodella.HeaderViewExt.Header.Menu.View.Ext'
    , [
        'Header.Menu.View'
        , 'SC.Configuration'
        , 'Profile.Model'
        , 'Utils'

        , 'header_menu_ext.tpl'

        , 'Backbone'
        , 'jQuery'
        , 'underscore'
    ]
    , function (
        HeaderMenuView
        , Configuration
        , ProfileModel
        , Utils

        , header_menu_ext_tpl

        , Backbone
        , jQuery
        , _
    ) {
        'use strict';

        return HeaderMenuView.extend({

            template: header_menu_ext_tpl

            , events: {
                'click [data-action="flyoutmenu-toggle"]': 'flyOutMenuToggle'
            }

            , initialize: function (layout_component) {
                HeaderMenuView.__super__.initialize.apply(this, arguments);
                var self = this;

                //this.flyOutMenuToggle(layout_component.layout);

                Backbone.history.on('all', this.openMenuHomePage, this);

                //this.openMenuHomePage();
            }

            , flyOutOpen: function () {
                var nav_menu = this.$('[data-type="FlyoutMenu"]');

                nav_menu.removeClass('flyout-menu-closed');
                nav_menu.addClass('flyout-menu-open');
            }

            , flyOutClose: function () {
                var nav_menu = this.$('[data-type="FlyoutMenu"]');

                nav_menu.removeClass('flyout-menu-open');
                nav_menu.addClass('flyout-menu-closed');
            }

            , flyOutMenuToggle: function flyOutMenuToggle(layout_comp) {
                var self = this;

                /*layout_comp.addToViewEventsDefinition(
                    'Header.Menu.View'
                ,	'click [data-action="flyoutmenu-toggle"]'
                ,	function(event) 
                    {*/
                var hash = Backbone.history.getFragment() || '';
                hash = hash.indexOf('?') === -1 ? hash : hash.substring(0, hash.indexOf('?'));
                var is_not_home = hash != '' || hash != '/';

                var nav_menu = self.$('[data-type="FlyoutMenu"]');

                if (is_not_home && hash != '') {
                    if (nav_menu.hasClass('flyout-menu-closed')) {
                        nav_menu.removeClass('flyout-menu-closed');
                        nav_menu.addClass('flyout-menu-open');
                    }
                    else if (nav_menu.hasClass('flyout-menu-open')) {
                        nav_menu.removeClass('flyout-menu-open');
                        nav_menu.addClass('flyout-menu-closed');
                    }
                }
                /*}
            );*/
            }
            , openMenuHomePage: function () {
                var hash = Backbone.history.getFragment() || '';
                hash = hash.indexOf('?') === -1 ? hash : hash.substring(0, hash.indexOf('?'));
                var is_home = hash === '' || hash === '/';

                if (is_home) {
                    this.$('[data-type="FlyoutMenu"]').removeClass('flyout-menu-closed');
                    this.$('[data-type="FlyoutMenu"]').addClass('flyout-menu-open');
                }
                else {
                    this.$('[data-type="FlyoutMenu"]').removeClass('flyout-menu-open');
                    this.$('[data-type="FlyoutMenu"]').addClass('flyout-menu-closed');
                }
            }

            , getMenuDetails: function () {
                //Configuration.navigationData;
                var menu_nav = this.combineLevel2Menu();

                for (var i = 0; i < menu_nav.length; i++) {
                    if (menu_nav[i].id == 'concert') {
                        menu_nav[i].menu_details = {
                            text: 'Timpani, Toms, Triangles'
                            , class: 'menu-details'
                        };
                    }
                    else if (menu_nav[i].id == 'practice-classroom') {
                        menu_nav[i].menu_details = {
                            text: 'Pads, Metronomes, Kits, Orff'
                            , class: 'menu-details'
                        };
                    }
                    else if (menu_nav[i].id == 'stands-hardware') {
                        menu_nav[i].menu_details = {
                            text: 'Pedals, Thrones, Parts'
                            , class: 'menu-details'
                        };
                    }
                    else if (menu_nav[i].id == "apparel-accessories") {
                        menu_nav[i].menu_details = {
                            text: 'Drum Keys, Stick Tape, Ear Plugs'
                            , class: 'menu-details'
                        };
                    }
                }

                return menu_nav;
            }

            , storeLevel2Menu: function () {
                var nav_ext = Configuration.get("header.menu.navigationLinks", []);
                var lvl2_menu = [];

                for (var idx = 0; idx < nav_ext.length; idx++) {
                    if (nav_ext[idx].level == "2") {
                        lvl2_menu.push(nav_ext[idx]);
                    }
                }

                return lvl2_menu;
            }

            , storeLevel1Menu: function() {
                var nav_ext = Configuration.get("header.menu.navigationLinks", []);
                var level1_menu = [];

                for(var idx = 0; idx < nav_ext.length; idx++) {
                    if(nav_ext[idx].level == '1') {
                        level1_menu.push(nav_ext[idx]);
                    }
                }

                return level1_menu;
            }

            , combineLevel3Menu: function () {
                var nav_ext = Configuration.get("header.menu.navigationLinks", []);
                var lvl2_menu = this.storeLevel2Menu();

                for (var idx = 0; idx < lvl2_menu.length; idx++) {

                    var lvl3_arr = [];
                    for (var idy = 0; idy < nav_ext.length; idy++) {

                        if (nav_ext[idy].level == "3" && nav_ext[idy].parentId == lvl2_menu[idx].id) {
                            nav_ext[idy].class = 'header-menu-level3-anchor';
                            lvl3_arr.push(nav_ext[idy]);
                            lvl2_menu[idx].categories = lvl3_arr;
                            lvl2_menu[idx].class = 'header-menu-level2-anchor';
                        }

                        if(nav_ext[idy].level == "3" && nav_ext[idy].text == "Articles & Videos") {
                            nav_ext[idy].articleimg = Utils.getAbsoluteUrl(getExtensionAssetsPath('img/if_10_2284572c.png'));
                        }
                    }
                }
                
                return lvl2_menu;
            }

            , combineLevel2Menu: function () {
                var menu_lvl2 = this.combineLevel3Menu();
                var menu_lvl1 = this.storeLevel1Menu();

                for (var idx = 0; idx < menu_lvl1.length; idx++) {

                    var lvl2_nav_data = [];
                    var col1 = [],
                        col2 = [],
                        col3 = [],
                        col4 = [];

                    for (var idy = 0; idy < menu_lvl2.length; idy++) {

                        if (menu_lvl2[idy].level == "2" && menu_lvl2[idy].parentId == menu_lvl1[idx].id) {
                            
                            if(menu_lvl2[idy].menucolumn == '1') {
                                col1.push(menu_lvl2[idy]);
                                menu_lvl1[idx].column1 = col1;
                            }
                            else if(menu_lvl2[idy].menucolumn == '2') {
                                col2.push(menu_lvl2[idy]);
                                lvl2_nav_data.push(col2);
                                menu_lvl1[idx].column2 = col2;
                            }
                            else if(menu_lvl2[idy].menucolumn == '3') {
                                col3.push(menu_lvl2[idy]);
                                menu_lvl1[idx].column3 = col3;
                            }
                            else {
                                col4.push(menu_lvl2[idy]);
                                menu_lvl1[idx].column4 = col4;
                            }

                            menu_lvl1[idx].class = 'header-menu-level1-anchor'

                        }
                    }

                    lvl2_nav_data.push(col1);
                    lvl2_nav_data.push(col2);
                    lvl2_nav_data.push(col3);
                    lvl2_nav_data.push(col4);
                }

                return menu_lvl1;
            }

            ,	render: function()
            {
                Backbone.View.prototype.render.apply(this, arguments);
            }

            , getContext: function () {

                var profile = ProfileModel.getInstance()
                    , is_loading = !Configuration.get('performance.waitForUserProfile', true) && ProfileModel.getPromise().state() !== 'resolved'
                    , is_loged_in = profile.get('isLoggedIn') === 'T' && profile.get('isGuest') === 'F'
                    , environment = SC.ENVIRONMENT
                    , show_languages = environment.availableHosts && environment.availableHosts.length > 1
                    , show_currencies = environment.availableCurrencies && environment.availableCurrencies.length > 1 && !Configuration.get('header.notShowCurrencySelector')
                    , menu_details = this.getMenuDetails();

                    console.log("menu_details", menu_details);

                // @class Header.Sidebar.View.Context
                return {
                    // @property {Array<NavigationData>} navigationItems
                    categories: menu_details || []
                    // @property {Boolean} showExtendedMenu
                    , showExtendedMenu: !is_loading && is_loged_in
                    // @property {Boolean} showLanguages
                    , showLanguages: show_languages
                    // @property {Boolean} showCurrencies
                    , showCurrencies: show_currencies
                };
            }
        });
    });