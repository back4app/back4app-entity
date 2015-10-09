//
// Created by davimacedo on 30/09/15.
//

'use strict';

var util = require('util');
var expect = require('chai').expect;

/**
 * Contains Error Classes used to be thrown when the models API is not used
 * correctly.
 * @module back4app/entity/models/errors
 */
module.exports = {};

module.exports.EntityNotFoundError = EntityNotFoundError;
module.exports.AttributeTypeNotFoundError = AttributeTypeNotFoundError;

/**
 * Error class to be used when an Entity was referenced and the platform was not
 * able to find it.
 * @constructor
 * @extends Error
 * @param {?string} [entity] The entity name to be displayed.
 * @param {?Error} [innerError] The inner error.
 * @memberof module:back4app/entity/models/errors
 * @example
 * try {
 *   var myEntity = require('./MyEntity');
 * }
 * catch (e) {
 *   throw new EntityNotFoundError('MyEntity', e);
 * }
 */
function EntityNotFoundError(entity, innerError) {
  expect(arguments).to.have.length.below(
    3,
    'Invalid arguments length when creating a new EntityNotFoundError (it ' +
    'has to be passed less than 3 arguments)'
  );

  this.name = 'EntityNotFoundError';

  this.message = 'Cannot find Entity';
  if (entity) {
    expect(entity).to.be.a(
      'string',
      'Invalid argument "entity" when creating a new EntityNotFoundError ' +
      '(it has to be a string)'
    );
    this.message += ' "' + entity + '"';
  }

  this.stack = (new Error(this.message)).stack;
  if (innerError) {
    expect(innerError).to.be.an.instanceof(
      Error,
      'Invalid argument "innerError" when creating a new EntityNotFoundError ' +
      '(it has to be an Error)'
    );
    this.stack += '\n\n' + innerError.stack;
  }
}

util.inherits(EntityNotFoundError, Error);

/**
 * Error class to be used when an Attribute type was referenced and the platform
 * was not able to find it.
 * @constructor
 * @extends Error
 * @param {?string} [type] The attribute type name to be displayed.
 * @param {?Error} [innerError] The inner error.
 * @memberof module:back4app/entity/models/errors
 * @example
 * try {
 *   var TypedAttribute = types.get('MyCustomAttribute');
 * }
 * catch (e) {
 *   throw new AttributeTypeNotFoundError('MyCustomAttribute', e);
 * }
 */
function AttributeTypeNotFoundError(type, innerError) {
  expect(arguments).to.have.length.below(
    3,
    'Invalid arguments length when creating a new ' +
    'AttributeTypeNotFoundError (it has to be passed less than 3 arguments)'
  );

  this.name = 'AttributeTypeNotFoundError';

  this.message = 'Cannot find Attribute type';
  if (type) {
    expect(type).to.be.a(
      'string',
      'Invalid argument "type" when creating a new ' +
      'AttributeTypeNotFoundError (it has to be a string)'
    );
    this.message += ' "' + type + '"';
  }

  this.stack = (new Error(this.message)).stack;
  if (innerError) {
    expect(innerError).to.be.an.instanceof(
      Error,
      'Invalid argument "innerError" when creating a new ' +
      'AttributeTypeNotFoundError (it has to be an Error)'
    );
    this.stack += '\n\n' + innerError.stack;
  }
}

util.inherits(AttributeTypeNotFoundError, Error);
