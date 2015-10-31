'use strict';

var expect = require('chai').expect;
var Promise = require('bluebird');

module.exports = Adapter;

/**
 * Base class for database adapters. It cannot be directly initialized.
 * @constructor
 * @memberof module:back4app-entity/adapters
 * @example
 * var myAdapter = new MyAdapter(myConfig);
 */
function Adapter() {
  expect(this).to.be.an(
    'object',
    'The Adapter\'s constructor can be only invoked from specialized' +
    'classes\' constructors'
  );

  expect(this.constructor).to.be.a(
    'function',
    'The Adapter\'s constructor can be only invoked from specialized' +
    'classes\' constructors'
  );

  expect(this.constructor).to.not.equal(
    Adapter,
    'The Adapter is an abstract class and cannot be directly initialized'
  );

  expect(this).to.be.instanceof(
    Adapter,
    'The Adapter\'s constructor can be only invoked from specialized' +
    'classes\' constructors'
  );
}

Adapter.prototype.loadEntity = loadEntity;
Adapter.prototype.loadEntityAttribute = loadEntityAttribute;
Adapter.prototype.insertObject = insertObject;

/**
 * This method is called always that an Entity is specified. The adapter has to
 * load the new specified Entity. It has to be implemented in the concrete
 * adapters. Otherwise, it will throw Error.
 * @name module:back4app-entity/adapters.Adapter#loadEntity
 * @function
 * @param {!Class} Entity The Entity class to be loaded.
 * @example
 * myAdapter.loadEntity(MyEntity);
 */
function loadEntity() {
  throw new Error('Function "loadEntity" has to be implemented in the ' +
    'Adapter specialization');
}

/**
 * This method is called always that an Entity's attribute is loaded in an
 * EntitySpecification. The adapter has to load the new specified Attribute. It
 * has to be implemented in the concrete adapters. Otherwise, it will throw
 * Error.
 * @name module:back4app-entity/adapters.Adapter#loadEntityAttribute
 * @function
 * @param {!Class} Entity The Entity class whose Attribute has to be loaded.
 * @param {!module:back4app-entity/models/attributes.Attribute} attribute The
 * attribute to be loaded.
 * @example
 * myAdapter.loadEntityAttribute(MyEntity, myEntityAttribute);
 */
function loadEntityAttribute() {
  throw new Error('Function "loadAttribute" has to be implemented in the ' +
    'Adapter specialization');
}

/**
 * This method is called always that an Entity object has to be inserted in the
 * storage. The adapter has to insert the new Entity object. It has to be
 * implemented in the concrete adapters. Otherwise, it will throw Error.
 * @name module:back4app-entity/adapters.Adapter#insertObject
 * @function
 * @param {!module:back4app-entity/models.Entity} entityObject The Entity object
 * to be inserted.
 * @example
 * myAdapter.insertObject(new MyEntity());
 */
function insertObject() {
  return new Promise(function () {
    throw new Error('Function "insertObject" has to be implemented in the ' +
      'Adapter specialization');
  });
}
