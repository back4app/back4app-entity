(function () {
  'use strict';

  var editor1;
  var editor2;
  var editor3;
  var back4appEntityCode;

  setupEditors();
  setupButtons();

  function setupEditors() {
    // editor1: Animal
    editor1 = ace.edit('editor1');
    editor1.setTheme('ace/theme/monokai');
    editor1.getSession().setMode('ace/mode/javascript');

    // editor2: Dog
    editor2 = ace.edit('editor2');
    editor2.setTheme('ace/theme/monokai');
    editor2.getSession().setMode('ace/mode/javascript');

    // editor3: Boy
    editor3 = ace.edit('editor3');
    editor3.setTheme('ace/theme/monokai');
    editor3.getSession().setMode('ace/mode/javascript');
  }

  function setupButtons() {
    // button1: Animal
    var button1 = document.getElementById('run-code-btn1');
    button1.onclick = function () {
      var script = {name: 'Animal', code: editor1.getSession().getValue()};
      var otherScripts = [
        {name: 'Dog', code: editor2.getSession().getValue()},
        {name: 'Boy', code: editor3.getSession().getValue()}
      ];
      shuffle(otherScripts); // randomize dependencies order, for testing
      execute(script, otherScripts);
    };

    // button2: Dog
    var button2 = document.getElementById('run-code-btn2');
    button2.onclick = function () {
      var script = {name: 'Dog', code: editor2.getSession().getValue()};
      var otherScripts = [
        {name: 'Animal', code: editor1.getSession().getValue()},
        {name: 'Boy', code: editor3.getSession().getValue()}
      ];
      shuffle(otherScripts); // randomize dependencies order, for testing
      execute(script, otherScripts);
    };

    // button3: Boy
    var button3 = document.getElementById('run-code-btn3');
    button3.onclick = function () {
      var script = {name: 'Boy', code: editor3.getSession().getValue()};
      var otherScripts = [
        {name: 'Animal', code: editor1.getSession().getValue()},
        {name: 'Dog', code: editor2.getSession().getValue()}
      ];
      shuffle(otherScripts); // randomize dependencies order, for testing
      execute(script, otherScripts);
    };
  }

  function shuffle(array) {
    var counter = array.length, temp, index;

    // while there are elements in the array
    while (counter > 0) {
      // pick a random index
      index = Math.floor(Math.random() * counter);

      // decrease counter by 1
      counter--;

      // and swap the last element with it
      temp = array[counter];
      array[counter] = array[index];
      array[index] = temp;
    }

    return array;
  }

  function execute(script, otherScripts) {
    makeNewContext();
    definePlugin(script, otherScripts);
    redefineBack4appEntity(function (entity) {
      // set default adapter
      var Adapter = entity.adapters.Adapter;
      var MockAdapter = makeMockAdapter(Adapter);

      entity.settings.ADAPTERS = {
        default: new MockAdapter()
      };

      // require user entity
      require(['$commonjs!' + script.name], function (CustomEntity) {
        // test entity instance
        var obj = new CustomEntity();
        console.log(obj.getInfo());
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

  function definePlugin(script, otherScripts) {
    define('$commonjs', [], {
      load: function (name, req, onload) {
        // wrap CommonJS code in AMD-friendly format
        var amdCode =
          'define(\'' + name + '\', function(require, exports, module) {\n' +
          script.code + '\n' +
          'return module.exports;\n' +
          '});\n';

        for (var i = 0; i < otherScripts.length; i++) {
          var oName = otherScripts[i].name;
          var oCode = otherScripts[i].code;

          // wrap dependencies in AMD-friendly format
          amdCode +=
            'define(\'' + oName + '\', function(require, exports, module) {\n' +
            oCode + '\n' +
            'return module.exports;\n' +
            '});\n';

          // require dependencies with module,
          // to be accessible at runtime (e.g. `Entity.new('...')`)
          amdCode += 'require([\'' + oName + '\'], function () {});';
        }

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
