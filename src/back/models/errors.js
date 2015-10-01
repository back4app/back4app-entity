//
// Created by davimacedo on 30/09/15.
//

'use strict';

var expect = require('chai').expect;
var classes = require('../utils/classes');

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
  expect(arguments).to.have.length.below(3);

  this.name = 'EntityNotFoundError';

  this.message = 'Cannot find Entity';
  if (entity) {
    expect(entity).to.be.a('string');
    this.message += ' "' + entity + '"';
  }

  this.stack = (new Error(this.message)).stack;
  if (innerError) {
    expect(innerError).to.be.an.instanceof(Error);
    this.stack += '\n\n' + innerError.stack;
  }
}

classes.generalize(Error, EntityNotFoundError);
