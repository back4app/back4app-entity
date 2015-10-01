//
// Created by davimacedo on 30/09/15.
//

'use strict';

var expect = require('chai').expect;
var attributes = require('./attributes');
var methods = require('./methods');

module.exports = EntitySpecification;

/**
 * Class to specify an Entity.
 * @constructor
 * @memberof module:back4app/entity/models
 * @name EntitySpecification
 * @param {module:back4app/entity/models/attributes.AttributeCollection|Object}
 * attributes The new entity specification attributes. It can be given as an
 * instance of
 * {@link module:back4app/entity/models/attributes.AttributeCollection} or an
 * object, as specified in
 * {@link module:back4app/entity/models/attributes.AttributeCollection}.
 * @param {module:back4app/entity/models/methods.MethodCollection|Object}
 * methods The new entity specification methods. It can be given as an instance
 * of
 * {@link module:back4app/entity/models/methods.MethodCollection} or an
 * object, as specified in
 * {@link module:back4app/entity/models/methods.MethodCollection}.
 */
/**
 * Class to specify an Entity.
 * @constructor
 * @memberof module:back4app/entity/models
 * @name EntitySpecification
 * @param {Object} specification The new Entity specification.
 * @param {module:back4app/entity/models/attributes.AttributeCollection|Object}
 * specification.attributes The new entity specification attributes. It can be
 * given as an instance of
 * {@link module:back4app/entity/models/attributes.AttributeCollection} or an
 * object, as specified in
 * {@link module:back4app/entity/models/attributes.AttributeCollection}.
 * @param {module:back4app/entity/models/methods.MethodCollection|Object}
 * specification.methods The new entity specification methods. It can be
 * given as an instance of
 * {@link module:back4app/entity/models/methods.MethodCollection} or an
 * object, as specified in
 * {@link module:back4app/entity/models/methods.MethodCollection}.
 */
function EntitySpecification() {
  expect(arguments).to.have.length.below(3);

  /**
   * Collection of specific attributes of an entity.
   * @memberof module:back4app/entity/models.EntitySpecification
   * @type {AttributeCollection}
   */
  this.attributes = null;

  var _attributes = null;

  Object.defineProperty(this, 'attributes', {
    get: function () {
      return _attributes;
    },
    set: function () {
      throw new Error('Attributes cannot be changed');
    }
  });

  /**
   * Collection of specific methods of an entity.
   * @memberof module:back4app/entity/models.EntitySpecification
   * @type {MethodCollection}
   */
  this.methods = null;

  var _methods = new methods.MethodCollection();

  Object.defineProperty(this, 'methods', {
    get: function () {
      return _methods;
    },
    set: function () {
      throw new Error('Methods cannot be changed');
    }
  });
}
