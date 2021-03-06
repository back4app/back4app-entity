(function () {
  'use strict';

  var editor;
  var back4appEntityCode;

  setupEditor();
  setupButton();

  function setupEditor() {
    editor = ace.edit('editor');
    editor.setTheme('ace/theme/monokai');
    editor.getSession().setMode('ace/mode/javascript');
  }

  function setupButton() {
    var button = document.getElementById('run-code-btn');
    button.onclick = function () {
      var code = editor.getSession().getValue();
      execute(code);
    };
  }

  function execute(code) {
    makeNewContext();
    definePlugin(code);
    redefineBack4appEntity(function (entity) {
      // set default adapter
      var Adapter = entity.adapters.Adapter;
      var MockAdapter = makeMockAdapter(Adapter);

      entity.settings.ADAPTERS = {
        default: new MockAdapter()
      };

      // require user entity
      require(['$commonjs!Animal'], function (Animal) {
        // test entity instance
        var animal = new Animal();
        animal.name = 'Bob';
        console.log(animal.getInfo());
      });
    });
  }

  function makeNewContext() {
    var contextName = 'test';

    // delete old context
    delete requirejs.s.contexts[contextName];

    // create new context
    var oldConfig = requirejs.s.contexts._.config;
    var config = {};
    for (var key in oldConfig) {
      if (oldConfig.hasOwnProperty(key)) {
        config[key] = oldConfig[key];
      }
    }
    config.context = contextName;

    window.require = requirejs.config(config);
  }

  function definePlugin(code) {
    define('$commonjs', [], {
      load: function (name, req, onload) {
        // wrap CommonJS code in AMD-friendly format
        var amdCode =
          'define(\'' + name + '\', function(require, exports, module) {\n' +
          code + '\n' +
          'return module.exports;\n' +
          '});\n';
        onload.fromText(amdCode);
      }
    });
  }

  function redefineBack4appEntity(cb) {
    // define plugin to load `back4app-entity` from string cache
    define('$cache', [], {
      load: function (name, req, onload) {
        onload.fromText(back4appEntityCode);
      }
    });

    // check if code is already cached
    if (typeof back4appEntityCode === 'undefined') {
      require(['text!back4app-entity.js'], function (code) {
        back4appEntityCode = code;
        requireFromCache();
      });
    } else {
      requireFromCache();
    }

    function requireFromCache() {
      require(['$cache!back4app-entity'], function (entity) {
        cb(entity);
      });
    }
  }

  function makeMockAdapter(Adapter) {
    // create class
    var MockAdapter = function () {};

    // inherit from base Adapter
    MockAdapter.prototype = Object.create(Adapter.prototype);
    MockAdapter.prototype.constructor = MockAdapter;

    // implement stub methods
    MockAdapter.prototype.loadEntity = function () {};
    MockAdapter.prototype.loadEntityAttribute = function () {};
    MockAdapter.prototype.insertObject = function () {};
    MockAdapter.prototype.updateObject = function () {};

    return MockAdapter;
  }
})();
