'use strict';

module.exports = Adapter;

/**
 * Base class for database adapters.
 * @constructor
 * @memberof module:back4app/entity/adapters
 * @example
 * var entity = new Entity();
 */
function Adapter() {
  this.registerEntity = registerEntity;

  /**
   * Interface-like method, that should be implemented.
   * @name module:back4app/entity/adapters.DBAdapter~registerEntity
   * @function
   * @param entity The entity that will be registered as an schema,
   * model or table.
   * @example
   * adapter.register(Person);
   */
  function registerEntity() {
    throw 'registerEntity must be implemented.';
  }
}
