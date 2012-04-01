# MooTools - Asset.Extras

Asset.Extras provides additional methods for pulling asset files in bulk for **HTML, JSON, JSONP, XML, CSS, JS and image files** all together.

Asset files can be batch loaded by extension or explicitly by type.

## Requirements

- MooTools 1.3+ (1.2+ works as well)
- MooTools More (Assets)
- MooTools-Asset.css-patch plugin ... https://github.com/matsko/MooTools-Asset.css-patch

## Browser Support

- Works in all browsers
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

  onReady : function(assets,options,total,totalSuccess,totalFailed) {
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

### By Asset Type

In the event that your asset URL doesn't include an extension that can be used to figure out the asset file

```javascript
Asset.loadAssetByType('/path/to/some/asset','css',onload,onerror);

//or figure it out by name

Asset.loadAssetByName('/path/to/some/asset.css',onload,onerror);
```

### Direct Assets

```javascript
var options = {
  onload : function() { ... },
  onerror : function() { ... }
}

//js files
Asset.javascript('/path/to/some/asset',options);

//stylesheets
Asset.css('/path/to/some/asset',options);

//images (jpg, jpeg, png, gif, tiff, bmp, etc...)
Asset.image('/path/to/some/asset',options);

//html, htm, php, etc...
Asset.html('/path/to/some/asset',options);

//xml, rss, atom, svg
Asset.xml('/path/to/some/asset',options);

//same origin json files
Asset.json('/path/to/some/asset',options);

//jsonp files
Asset.jsonp('/path/to/some/asset',options);
```
