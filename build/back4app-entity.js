'use strict';

/* Configure `back4app-entity` path, if possible */

(function () {
  var isBrowser = !!(
    typeof window !== 'undefined' &&
    typeof navigator !== 'undefined' &&
    window.document
  );

  function configPath() {
    if (isBrowser) {
      eachReverse(scripts(), function (script) {
        var src = script.getAttribute('src');
        if (src) {
          var path = extractPath(src);
          requirejs.config({
            baseUrl: path,
            paths: {
              'back4app-entity': 'back4app-entity-bundle'
            }
          });
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

  function extractPath(src) {
    var parts = src.split('/');
    parts.pop();
    return parts.length ? parts.join('/') : '.';
  }

  configPath();
})();
