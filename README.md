# MooTools - Asset.Extras

Asset.Extras provides additional methods for pulling asset files in bulk for **html, json, jsonp, xml, css, js and image files** all together.

Asset files can be batch loaded by extension or explicitly by type.

## Requirements

- MooTools 1.2+ (1.3+ works as well)
- MooTools More (Assets)
- MooTools-Asset.css-patch plugin ... https://github.com/matsko/MooTools-Asset.css-patch

## Browser Support

- Works in all browsers.
- Minimal issues with Asset.css (outlined in https://github.com/matsko/MooTools-Asset.css-patch)

## Usage

Assets can be loaded as a collection, one by one in serial or parallel:

### Single Assets

```javascript
Asset.load('./asset.js',{ //this will use the extension to figure out what asset to download

  onReady : function(asset,scriptElement) {
    //asset = "./asset.js";
    //scriptElement = the generated <script> element
  }

});

### Multiple Assets

Asset.load(['./asset.js','./asset.css'],{ //this will use the extensions to figure out what assets to download

  onReady : function(assets,options) {
    //once everything is complete
  },

  onLoad : function(asset,options) {
    //once one particular asset has a successful download
  },

  onError : function(asset,options) {
    //once one particular asset has a failed download
  },

  onProgress : function(asset,options) {
    //each time an asset has been downloaded (failed or success)
  }

});

### Serial Assets

Asset.load('./asset.js').then('./asset.css').then(function(assets) {

  //all complete!
  
});

```
