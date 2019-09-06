<div class="menu-button-container">
	<a class="lonestar-image-menu-button lonestar-icon-24-star-black" data-action="flyoutmenu-toggle">Shop By
		<strong>Department</strong></a>

	<nav class="header-menu-secondary-nav flyout-menu-open" data-type="FlyoutMenu">
		{{!--- <div class="header-menu-search">
			<button class="header-menu-search-link" data-action="show-sitesearch" title="Search">
				<i class="header-menu-search-icon"></i>
			</button>
		</div> --}}


		<ul class="header-menu-level1">

			{{#each categories}}
			{{#if text}}
			<li {{#if categories}}data-toggle="categories-menu" {{/if}}>
				<a class="{{class}}" {{objectToAtrributes this}}>
					{{translate text}}
					{{#with menu_details}}
					<br><span class="{{class}}">
							<div class="menu-details-container">
								{{translate text}}
							</div>
						</span>
					{{/with}}
				</a>
				<ul class="header-menu-level-container">
					<li>
						<ul class="header-menu-level2">
							{{#if column1}}
								<li>
									<ul class="{{id}}-header-menu-level2-column1">
										{{#each column1}}
											<li>
												<a class="{{class}}" {{objectToAtrributes this}}>{{translate text}}</a>
												{{#if categories}}
													<ul class="{{id}}-header-menu-level3 header-menu-level3">
														{{#each categories}}
														<li>
															<a class="{{class}}" {{objectToAtrributes this}}>{{translate text}}</a>
														</li>
														{{/each}}
													</ul>
												{{/if}}
											</li>
										{{/each}}
									</ul>
								</li>
							{{/if}}
							{{#if column2}}
								<li>
									<ul class="{{id}}-header-menu-level2-column2">
										{{#each column2}}
											<li>
												<a class="{{class}}" {{objectToAtrributes this}}>{{translate text}}</a>
												{{#if categories}}
													<ul class="{{id}}-header-menu-level3 header-menu-level3">
														{{#each categories}}
														<li>
															<a class="{{class}}" {{objectToAtrributes this}}>{{translate text}}</a>
															{{#if articleimg}}
																<img class="lonestar-article-img {{id}}-lonestar-article-img" src="{{articleimg}}">
															{{/if}}
														</li>
														{{/each}}
													</ul>
												{{/if}}
											</li>
										{{/each}}
									</ul>
								</li>
							{{/if}}	
							{{#if column3}}
								<li>
									<ul class="{{id}}-header-menu-level2-column3">
										{{#each column3}}
											<li>
												<a class="{{class}}" {{objectToAtrributes this}}>{{translate text}}</a>
												{{#if categories}}
													<ul class="{{id}}-header-menu-level3 header-menu-level3">
														{{#each categories}}
														<li>
															<a class="{{class}}" {{objectToAtrributes this}}>{{translate text}}</a>
														</li>
														{{/each}}
													</ul>
												{{/if}}
											</li>
										{{/each}}
									</ul>
								</li>
							{{/if}}	
							{{#if column4}}
								<li>
									<ul class="{{id}}-header-menu-level2-column4">
										{{#each column4}}
											<li>
												<a class="{{parentId}}-column4-anchor ad-anchor" {{objectToAtrributes this}}>
													<div class="{{parentId}}-content {{parentId}}-ad-content">
														{{#if adtext1}}
															{{translate adtext1}}
														{{/if}}

														{{#if adtext2}}
															<br>
															{{translate adtext2}}
														{{/if}}
													</div>
													<div class="{{parentId}}-price column4-price">
														{{translate adbutton}}
														<span class="ad-unit-details {{parentId}}-ad-unit-details">{{translate adunit}}</span>
													</div>
													<div class="{{classnames}}" style="background-image: url({{imgurl}})"></div>
												</a>
											</li>
										{{/each}}
									</ul>
								</li>
							{{/if}}					
						</ul>
					</li>
				</ul>
			</li>
			{{/if}}
			{{/each}}

		</ul>
	</nav>
</div>




{{!----
Use the following context variables when customizing this template: 
	
	categories (Array)
	showExtendedMenu (Boolean)
	showLanguages (Boolean)
	showCurrencies (Boolean)

----}}