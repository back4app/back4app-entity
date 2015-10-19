'use strict';

//var util = require('util');
//var expect = require('chai').expect;

module.exports = new Adapters();

function Adapters() {
  //var adapters = {};
  //adapters.Adapters = null;
  var handler = this;

  this.defaultAdapter = null;
  this.adapters = [];

  this.init = init;
  this.config = config;
  this.registerAdapters = registerAdapters;
  this.registerEntity = registerEntity;
  //this.save;
  //this.update;
  //this.delete;

  function init(adapters) {
    if (adapters) {
      var conf = {};
      if (adapters instanceof Object) {
        conf.adapters = [adapters];
      } else if (adapters instanceof Array) {
        conf.adapters = adapters;
      }
      this.config(conf);
    }
  }

  function config(configObj) {
    if (configObj instanceof Object) {
      registerAdapters(configObj.adapters);
    }
  }

  function registerAdapters(adapters) {
    handler.adapters = adapters;
  }

  function registerEntity(entity) {
    for (var index in handler.adapters) {
      var adapter = handler.adapters[index];
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

  //return adapters;
}
