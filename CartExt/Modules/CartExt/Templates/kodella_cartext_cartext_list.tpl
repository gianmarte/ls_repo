<section class="cartext-layout">
    <h2>{{translate 'CartExt TODO Example'}}</h2>
    <div class="cartext-button-container">
        {{#if can_edit}}
            <a href="/test_extension/new" class="cartext-button-add" data-toggle="show-in-modal"> {{translate 'Add CartExt'}}</a>
        {{else}}
            <a href="/test_extension" class="cartext-button-add"> {{translate 'Go to the TODO Example'}}</a>
        {{/if}}    
    </div>
    {{#if loading}}
        <h3>{{translate 'Loading'}}...</h3>
    {{else}}
        <div class="cartext-list">
        <div data-view="CartExt.Collection"></div>
    {{/if}}
</section>

<!--
    Available helpers:
    {{ getExtensionAssetsPath ‘img/image.jpg’}} - reference assets in your extension
    
    {{ getExtensionAssetsPathWithDefault context_var ‘img/image.jpg’}} - use context_var value i.e. configuration variable. If it does not exist, fallback to an asset from the extension assets folder
    
    {{ getThemeAssetsPath context_var ‘img/image.jpg’}} - reference assets in the active theme
    
    {{ getThemeAssetsPathWithDefault context_var ‘img/theme-image.jpg’}} - use context_var value i.e. configuration variable. If it does not exist, fallback to an asset from the theme assets folder
-->