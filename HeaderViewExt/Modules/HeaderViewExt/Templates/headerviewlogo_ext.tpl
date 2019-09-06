<div id="site-logo" class="content-banner"></div>
<a class="header-logo lonestar-image-logo" href="{{headerLinkHref}}" data-touchpoint="{{headerLinkTouchPoint}}"
	data-hashtag="{{headerLinkHashtag}}" title="{{headerLinkTitle}}">
	<!-- 
{{#if logoUrl}}
	<img class="header-logo-image" src="{{getThemeAssetsPathWithDefault logoUrl 'img/SC_Logo.png'}}" alt="{{siteName}}">
{{else}}
	<span class="header-logo-sitename">
		{{siteName}}
	</span>
{{/if}}
-->
</a>

{{#if isCheckout}}
<span class="lonestar-established"> Established <span class="lonestar-icon-24-star-yellow">1978</span></span>
<span class="lonestar-tagline">We Speak Drum <span class="lonestar-icon-24-phone-yellow">1-866-792-0143</span></span>
{{/if}}



{{!----
Use the following context variables when customizing this template:

	logoUrl (String)
	headerLinkHref (String)
	headerLinkTouchPoint (String)
	headerLinkHashtag (String)
	headerLinkTitle (String)

----}}