(function() {

typeOf = typeOf || $type;

Asset._javascript = Asset.javascript;

(Object.append || $extend).apply(this,[Asset,{

  isAssetFromOrigin : function(path) {
    var isFromOrigin = !path.contains('//');
    if(!isFromOrigin) {
      var matches = path.match(/^(.+?:)\/\/(.+?)(:\d+)?(?:\/|\Z)/);
      var protocol = matches[1].toLowerCase();
      var hostname = matches[2].toLowerCase();
      var port = matches[3] || '';
      isFromOrigin = protocol == window.location.protocol && hostname == window.location.hostname.toLowerCase() && (window.location.port || '') == port;
    }
    return isFromOrigin;
  },

  javascript : function(asset,options) {
    var id = (new Date().getTime())+'-asset-js';
    var onload = options.onload;
    options.onload = function() {
      var elm = document.id(arguments.callee._id);
      arguments.callee._onload.call(elm);
      delete arguments.callee._onload;
      delete arguments.callee.id;
    };
    options.onload._onload = onload;
    options.onload._id = id;
    var script = this._javascript(asset,options);
    script.id = id;
    script.addEvent('error',options.onerror);
  },

  json : function(path,options) {
    options = options || {};
    options = {
      method : 'GET',
      url : path,
      onSuccess : options.onload,
      onFailure : options.onerror
    };
    var jsonp = options.jsonp || this.isAssetFromOrigin(path);
    new Request[(jsonp ? 'JSONP' : 'JSON')](options).send();
  },

  jsonp : function(path,options) {
    options = options || {};
    options.jsonp = true;
    this.json(path,options);
  },

  html : function(path,options) {
    options = options || {};
    new Request({
      src : path,
      method : 'GET',
      onSuccess : options.onload,
      onFailure : options.onerror
    }).send();
  },

  xml : function(path,options) {
    options = options || {};
    this.html(path,{
      onload : function(html,xml) {
        options.onload(xml);
      },
      onerror : options.onerror
    });
  },

  loadAssetByType : function(asset,type,onload,onerror) {
    onload = onload || function() {};
    onerror = onerror || function() {};
    type = type || '';
    asset = asset || '';

    if(asset.length == 0 || type.length == 0) {
      onerror(asset,type);
      return;
    }

    var method = 'html';
    switch(type) {
      case 'jsonp':
        method = 'jsonp';
      case 'json':
        method = 'json';
      case 'js':
      case 'javascript':
        method = 'javascript';
      break;
      case 'css':
      case 'stylesheet':
        method = 'css';
      break;
      case 'jpg':
      case 'jpeg':
      case 'tiff':
      case 'png':
      case 'gif':
      case 'bmp':
      case 'image':
        method = 'image';
      break;
      case 'xml':
      case 'rss':
      case 'atom':
      case 'svg':
        method = 'xml';
      break;
    }

    var L = function(data) {
      data = data || this;
      onload(arguments.callee.asset,data,arguments.callee.type);
      delete arguments.callee.asset;
      delete arguments.callee.type;
    };
    L.asset = asset;
    L.type = type;

    var E = function() {
      onerror(arguments.callee.asset,arguments.callee.type);
      delete arguments.callee.asset;
      delete arguments.callee.type;
    };
    E.asset = asset;
    E.type = type;

    Asset[method](asset,{
      onload : L,
      onerror : E
    });

  },

  getAssetType : function(asset) {
    var matches = asset.match(/\.([-\w+]+)[^\.\s]*$/);
    var ext = matches && matches.length > 1 ? matches[1] : null;
    if(ext) {
      return ext.toLowerCase();
    }
  },

  loadAssetByName : function(asset,onload,onerror) {
    var type = this.getAssetType(asset);
    this.loadAssetByType(asset,type,onload,onerror);
  },

  load : function(assets,options) {

    if((typeOf || $type)(options) == 'function') {
      options = {
        onReady : options
      }
    }
    else {
      options = options || {};
    }

    var onError     = options.onError     || function() { };
    var onProgress  = options.onProgress  || function() { };
    var onLoad      = options.onLoad      || function() { };
    var onReady     = options.onReady     || function() { };
    var className   = options.className   || null;

    var total = assets.length;
    var counter = 0;
    var totalFailed = 0;
    var results = {};

    if(!assets || assets.length == 0) {
      onReady(results,0,0,0);
      return;
    }

    if(typeOf(assets) == 'string') {
      assets = [assets];
    }

    var onAssetLoaded = function(asset,data,type,result) {
      var options = {
        result : result,
        type : type,
        data : data
      };

      results[asset]=options;
      counter++;
      onProgress(asset,options);

      if(result) {
        onLoad(asset,options);
      }
      else {
        onError(asset,options);
        totalFailed++;
      }

      if(counter >= total) {
        onReady(results,total,total-totalFailed,totalFailed);
      }

    };

    assets.each(function(asset) {
      this.loadAssetByName(asset,
        function(asset,data,type) {
          onAssetLoaded(asset,data,type,true);
        },
        function(asset,type) {
          onAssetLoaded(asset,null,type,false);
        }
      );
    },this);

    return this;
  }

}]);

})();
