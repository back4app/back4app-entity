define(function (require, exports, module) {//
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

/**
 * Error class to be used when an Entity was references and the platform was not
 * able to find it.
 * @constructor
 * @extends Error
 * @param {?string} message The entity name to be displayed.
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

});
