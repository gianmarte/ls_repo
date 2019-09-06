// List View, it will create as child view a collection of Edit Views.

define('Kodella.PDPModalWidget.PDPModalWidget.View'
	, [
		'ProductDetails.Information.View'
		, 'Kodella.PDPModalWidget.PDPModalWidget.Collection'

		, 'Backbone'
		, 'jQuery'
		, 'underscore'
	]
	, function (
		ProductDetailsInformationView
		, PDPModalWidgetCollection

		, Backbone
		, jQuery
		, _
	) {
		'use strict';

		_.extend(ProductDetailsInformationView.prototype, {

			initialize: function initialize() {

				ProductDetailsInformationView.__super__.initialize.apply(this, arguments);

				_.defer(_.bind(function () {

					var widget_data = new PDPModalWidgetCollection();
					var self = this;
					widget_data.fetch().done(function () {

						self.createContent(widget_data);
					});

				}, this));
			}
			, createContent: function createContent(data) {

				var span_el_arr = this.parseSpanElement();

				_.each(data.models, function (widget_info) {

					_.each(span_el_arr, function (span_data) {

						var img = widget_info.get("img_url") != "" ? '<img src="' + widget_info.get("img_url") + '" height="100" width="100"/>' : '';
						var rec_url = widget_info.get("record_url") != "" ? '<span class="details"><a href="' + widget_info.get("record_url") + '">Learn more</a></span>' : '';

						if (span_data.slug != "" && span_data.def == "") {

							if (span_data.slug == widget_info.get("slug")) {

								span_data.ele.innerHTML += '<dl class="panel">' +
									'<dt class="h3">' + widget_info.get("title") + '</dt>' +
									'<dd>' + img + '' +
									'' + widget_info.get('definition') + '' +
									'' + rec_url + '' +
									'</dd></dl>';
							}
						}
						else if (span_data.slug == "" && span_data.def != "") {

							if (span_data.def == widget_info.get("title").toLowerCase()) {

								span_data.ele.innerHTML += '<dl class="panel">' +
									'<dt class="h3">' + widget_info.get("title") + '</dt>' +
									'<dd>' + img + '' +
									'' + widget_info.get('definition') + '' +
									'' + rec_url + '' +
									'</dd></dl>';
							}
						}
					});
				});
			}
			, parseSpanElement: function parseSpanElements() {

				var elements = document.getElementsByTagName('span');
				var def_arr = [];

				_.each(elements, function (ele) {

					if (ele.hasAttribute("data-definitions-slug")) {

						def_arr.push({
							ele: ele
							, slug: ele.getAttribute("data-definitions-slug")
							, def: ""
						});
					}
					else if (ele.hasAttribute("data-def") && !ele.hasAttribute("data-definitions-slug")) {

						def_arr.push({
							ele: ele
							, slug: ""
							, def: ele.innerHTML.toLowerCase()
						});
					}
				});

				return def_arr;
			}
		});
	});