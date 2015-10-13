//
// Created by davimacedo on 08/10/15.
//

'use strict';

var expect = require('chai').expect;
var AttributeTypeNotFoundError = require('../../errors')
  .AttributeTypeNotFoundError;
var AssociationAttribute = require('./AssociationAttribute');
var BooleanAttribute = require('./BooleanAttribute');
var DateAttribute = require('./DateAttribute');
var NumberAttribute = require('./NumberAttribute');
var ObjectAttribute = require('./ObjectAttribute');
var StringAttribute = require('./StringAttribute');

/**
 * Contains specializations of the Attribute class to be used as types of
 * attributes
 * @module back4app/entity/models/attributes/types
 */
module.exports = {};

module.exports.AssociationAttribute = AssociationAttribute;
module.exports.BooleanAttribute = BooleanAttribute;
module.exports.DateAttribute = DateAttribute;
module.exports.NumberAttribute = NumberAttribute;
module.exports.ObjectAttribute = ObjectAttribute;
module.exports.StringAttribute = StringAttribute;

module.exports.get = null;

Object.defineProperty(module.exports, 'get', {
  value: get,
  enumerable: false,
  writable: false,
  configurable: true
});

/**
 * Gets an Attribute type by a given string representing the type. First, it
 * tries to find the exactly name. If not find, it tries concatenates the given
 * string with "Attribute" in the end and tries again. If it still cannot find,
 * it throws an
 * {@link module:back4app/entity/models/errors.AttributeTypeNotFoundError}.
 * @name module:back4app/entity/models/attributes/types~get
 * @function
 * @param {!string} type The name of type to be get.
 * @returns {Class} The Attribute type class.
 * @throws {module:back4app/entity/models/errors.AttributeTypeNotFoundError}
 * @example
 * var ObjectAttribute = types.get('ObjectAttribute);
 */
function get(type) {
  expect(arguments).to.have.length(
    1,
    'Invalid arguments length when getting an Attribute type (it has to be ' +
    'passed 1 argument)'
  );

  expect(type).to.be.a(
    'string',
    'Invalid argument "type" when getting an Attribute type (it has to be a ' +
    'string'
  );

  if (module.exports.hasOwnProperty(type)) {
    return module.exports[type];
  } else if (module.exports.hasOwnProperty(type + 'Attribute')) {
    return module.exports[type + 'Attribute'];
  } else {
    throw new AttributeTypeNotFoundError(type);
  }
}
