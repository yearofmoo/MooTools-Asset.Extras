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

Assets can be loaded as a collection or one by one.

### Single Assets

```javascript
Asset.load('./asset.js',{ //this will use the extension to figure out what asset to download

  onLoad : function(asset,options) {
    //asset = "./asset.js";
    //options = {
    //  data : element, //scriptElement <script>
    //  type : 'js', //what the asset type was (this one was based off the extension)
    //  result : true //yes the asset got loaded properly
    //};
  }

  //onReady or onProgress can also be called

});
```

### Multiple Assets

```javascript
Asset.load(['./asset.js','./asset.css'],{ //this will use the extensions to figure out what assets to download

  onReady : function(assets,options) {
    //once everything is complete
  },

  onLoad : function(asset,options) {
    //once one particular asset has a successful download (same params in the example before)
  },

  onError : function(asset,options) {
    //once one particular asset has a failed to download
  },

  onProgress : function(asset,options) {
    //each time an asset has been downloaded (failed or success)
  }

});
```
