{{#if showStockDescription}}
<p class="product-line-stock-description-msg-description {{stockInfo.stockDescriptionClass}}">
	<i class="product-line-stock-description-icon-description"></i>
	{{stockInfo.stockDescription}}
</p>
{{/if}}
{{#if showCustMsg}}
<div class="lonestar-special-order-content">
	<span class="h3 lonestar-special-msg">{{#if showSpecialMsg}} {{isSpecialOrder}} {{/if}} {{#if showInStockMsg}}
		{{isInStockSoon}} {{/if}}</span>
	{{specialOrderTxt}}
</div>
{{else}}
{{#if showStockAvail}}
<p class="product-line-stock-description-stock-available-msg {{stockInfo.stockDescriptionClass}}">
	<i class="lonestar-icon-24-notice"></i>
	Only {{qtyAvail}} left in stock
</p>
{{/if}}
{{/if}}



{{!----
Use the following context variables when customizing this template: 
	
	showStockDescription (Boolean)
	stockInfo (Object)
	stockInfo.isInStock (Boolean)
	stockInfo.outOfStockMessage (String)
	stockInfo.showOutOfStockMessage (Boolean)
	stockInfo.inStockMessage (String)
	stockInfo.showInStockMessage (Boolean)
	stockInfo.stockDescription (String)
	stockInfo.showStockDescription (Boolean)
	stockInfo.stockDescriptionClass (String)
	stockInfo.isNotAvailableInStore (Boolean)
	stockInfo.stockPerLocation (Array)
	stockInfo.isAvailableForPickup (Boolean)
	stockInfo.showQuantityAvailable (Boolean)

----}}