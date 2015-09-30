//
// Created by davimacedo on 30/09/15.
//

'use strict';

var attributes = require('./attributes');
var methods = require('./methods');

module.exports = EntitySpecification;

/**
 * Class to specify an Entity.
 * @memberof module:back4app/entity/models
 * @constructor
 * @example
 * var entitySpecification = new EntitySpecification();
 */
function EntitySpecification() {
  /**
   * Collection of specific attributes of an entity.
   * @type {AttributeCollection}
   */
  this.attributes = null;

  var _attributes = new attributes.AttributeCollection();

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
