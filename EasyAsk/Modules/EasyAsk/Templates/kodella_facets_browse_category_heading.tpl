<section class="facets-browse-category-heading-list-header">
	<div class="facets-browse-category-heading-main-description">
        {{#if isSearch}}
            <h1>{{translate '"{{keyword}}" in all products'}}</h1>
        {{else}}
            <h1>{{pageheading}}</h1>
        {{/if}}
        {{#if showItems}}
            <h1 class="facets-facet-browse-title" data-quantity="{{totalProducts}}">
                {{#if isTotalProductsOne}}
                    {{translate '1 Item'}} {{translate '1 pages'}}
                {{else}}
                    {{translate '$(0) Items' totalProducts}}&nbsp;{{translate '($(0) pages)' pageCount}}
                {{/if}}
            </h1>
        {{/if}}
		{{#if showDescription}}	
			<p>{{{description}}}</p>
		{{/if}}
	</div>
	{{#if hasBanner}}
		<div class="facets-browse-category-heading-main-image">
			<img src="{{resizeImage banner 'categorybanner'}}" alt="{{pageheading}}" />
		</div>
	{{/if}}
</section>




{{!----
Use the following context variables when customizing this template: 
	
	name (String)
	banner (String)
	description (String)
	pageheading (String)
	hasBanner (Boolean)
	showDescription (Boolean)

----}}
