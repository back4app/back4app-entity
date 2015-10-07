'use strict';

/* Configure module packages and vendor libraries */

requirejs.config({
  packages: [
    {name: 'back4app-entity', main: 'index'},
    {name: 'back4app-entity/models', main: 'index'},
    {name: 'back4app-entity/utils', main: 'index'}
  ],
  paths: {
    chai: 'vendor/chai',
    path: 'vendor/path',
    util: 'vendor/util'
  }
});

/* Configure baseUrl, if possible */

(function () {
  var isBrowser = !!(
    typeof window !== 'undefined' &&
    typeof navigator !== 'undefined' &&
    window.document
  );

  function configBaseUrl() {
    if (isBrowser) {
      eachReverse(scripts(), function (script) {
        var src = script.getAttribute('src');
        if (src) {
          var baseUrl = extractBaseUrl(src);
          requirejs.config({baseUrl: baseUrl});
          return true;
        }
      });
    }
  }

  function eachReverse(ary, func) {
    if (ary) {
      var i;
      for (i = ary.length - 1; i > -1; i -= 1) {
        if (ary[i] && func(ary[i], i, ary)) {
          break;
        }
      }
    }
  }

  function scripts() {
    return document.getElementsByTagName('script');
  }

  function extractBaseUrl(src) {
    var parts = src.split('/');
    parts.pop();
    return parts.length ? parts.join('/')  + '/lib/' : './lib/';
  }

  configBaseUrl();
})();
