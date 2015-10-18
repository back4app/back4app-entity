'use strict';

//var util = require('util');
//var expect = require('chai').expect;

module.exports = new Adapters();

function Adapters() {
  var adapters = {};
  adapters.Adapters = null;

  adapters.defaultAdapter = null;
  adapters.adapters = [];

  adapters.init = init;
  adapters.config = config;
  adapters.registerAdapters = registerAdapters;
  adapters.registerEntity = registerEntity;
  //this.save;
  //this.update;
  //this.delete;

  function init(adapters) {
    if (adapters) {
      var config = {};
      if (adapters instanceof Object) {
        config.adapters = [adapters];
      } else if (adapters instanceof Array) {
        config.adapters = adapters;
      }
      adapters.config(config);
    }
  }

  function config(configObj) {
    if (configObj instanceof Object) {
      registerAdapters(configObj.adapters);
    }
  }

  function registerAdapters(adapters) {
    for (var adapter in adapters) {
      adapters.adapters.push(adapter);
    }
  }

  function registerEntity(entity) {
    for (var adapter in this.adapters) {
      adapter.registerEntity(entity);
    }
  }

  /*function doSomething(entity, optionalArray) {
    if (optionalArray) {
      optionalArray.useAdaptersListedOnThisArray();
    } else {
      this.defaultAdapter.doSomething(entity);
    }
  }*/

  return adapters;
}
