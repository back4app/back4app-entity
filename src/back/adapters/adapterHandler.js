'use strict';

var settings = require('../').settings;

module.exports = new AdapterHandler();

/**
 * Handler for multiple adapters.
 * @constructor
 * @memberof module:back4app/entity/adapters
 * @example
 * module.exports = new Adapters();
 */
function AdapterHandler() {
  var handler = this;

  this.defaultAdapter = null;
  //this.adapters = [];

  this.init = init;
  this.config = config;
  this.registerAdapters = registerAdapters;
  this.registerEntity = registerEntity;

  /**
   * Inserts the basic configuration for the handler.
   * @name module:back4app/entity/adapters.Adapters~init
   * @function
   * @param adapters Array of adapters to be registered.
   * @example
   * adapters.init([mongoAdapter, anotherAdapter]);
   */
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

  /**
   * Defines the handler configuration, using the passed config object.
   * @name module:back4app/entity/adapters.Adapters~config
   * @function
   * @param configObj Object that holds the config definitions for
   * the handler, such as the adapters list.
   * @example
   * adapters.config({
   *   adapters: [mongoAdapter, anotherAdapter]
   * });
   */
  function config(configObj) {
    if (configObj instanceof Object) {
      registerAdapters(configObj.adapters);
    }
  }

  /**
   * Defines the adapters configuration, which shall be used by default.
   * @name module:back4app/entity/adapters.Adapters~registerAdapters
   * @function
   * @param adapters Array of adapters to be registered, used by default.
   * @example
   * adapters.registerAdapters([mongoAdapter, anotherAdapter]);
   */
  function registerAdapters(adapters) {
    settings.ADAPTERS = adapters;
  }

  /**
   * Runs "registerEntity" method on every registered adapter .
   * @name module:back4app/entity/adapters.Adapters~registerEntity
   * @function
   * @param entity Entity that shall be registered in all adapters.
   * @example
   * adapters.registerEntity(Person);
   */
  function registerEntity(entity) {
    for (var index in handler.adapters) {
      var adapter = handler.adapters[index];
      adapter.registerEntity(entity);
    }
  }
}
