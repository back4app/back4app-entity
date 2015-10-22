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
module.exports.AttributeTypeNotFoundError = AttributeTypeNotFoundError;
module.exports.ValidationError = ValidationError;
module.exports.AdapterNotFoundError = AdapterNotFoundError;

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
  /**
   * The name of the entity that was not found.
   * @type {?string}
   */
  this.entity = entity;
  /**
   * The inner error that generated the current error.
   * @type {?Error}
   */
  this.innerError = innerError;

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
  /**
   * The attribute type that was not found.
   * @type {?string}
   */
  this.type = type;
  /**
   * The inner error that generated the current error.
   * @type {?Error}
   */
  this.innerError = innerError;

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

/**
 * Error class to be used when an attribute value is not valid for the attribute
 * specification.
 * @constructor
 * @extends Error
 * @param {?string} [validationMessage] The message explaining the validation
 * error.
 * @param {?string} [entity] The entity whose attribute is not valid.
 * @param {?string} [attribute] The attribute that is not valid.
 * @param {?(string|number)} [position] The position in the attribute that is
 * not valid.
 * @param {?Error} [innerError] The inner error.
 * @memberof module:back4app/entity/models/errors
 * @example
 * try
 * {
 *   throw new ValidationError(
 *     'this attribute is required',
 *     'MyEntity',
 *     'myAttribute',
 *     1,
 *     null
 *   );
 * } catch(e) {
 *   console.log(e.message); // Logs "Error when validating an attribute called
 *                           // "myAttribute" of an entity called "MyEntity" in
 *                           // position 1: this attribute is required"
 * }
 */
function ValidationError(
  validationMessage,
  entity,
  attribute,
  position,
  innerError
) {
  /**
   * The validation message to be included in the error.
   * @type {?string}
   */
  this.validationMessage = validationMessage;
  /**
   * The name of the entity that was not validated.
   * @type {?string}
   */
  this.entity = entity;
  /**
   * The name of the attribute that was not validated.
   * @type {?string}
   */
  this.attribute = attribute;
  /**
   * The position of the item in the attribute that was not validated.
   * @type {?(string|number)}
   */
  this.position = position;
  /**
   * The inner error that generated the current error.
   * @type {?Error}
   */
  this.innerError = innerError;

  expect(arguments).to.have.length.below(
    6,
    'Invalid arguments length when creating a new ' +
    'AttributeTypeNotFoundError (it has to be passed less than 6 arguments)'
  );

  this.name = 'ValidationError';

  this.message = 'Error when validating an attribute';
  if (attribute) {
    expect(attribute).to.be.a(
      'string',
      'Invalid argument "attribute" when creating a new ValidationError (it ' +
      'has to be a string)'
    );
    this.message += ' called "' + attribute + '"';
  }

  this.message += ' of an entity';
  if (entity) {
    expect(entity).to.be.a(
      'string',
      'Invalid argument "entity" when creating a new ValidationError (it has ' +
      'to be a string)'
    );
    this.message += ' called "' + entity + '"';
  }

  if (position) {
    expect(['string', 'number']).to.include(
      typeof position,
      'Invalid argument "position" when creating a new ValidationError (it ' +
      'has to be a string or a number)'
    );
    this.message += ' in position ' + position;
  }

  if (validationMessage) {
    expect(validationMessage).to.be.a(
      'string',
      'Invalid argument "validationMessage" when creating a new ' +
      'ValidationError (it has to be a string)'
    );
    this.message += ': ' + validationMessage;
  }

  this.stack = (new Error(this.message)).stack;
  if (innerError) {
    expect(innerError).to.be.an.instanceof(
      Error,
      'Invalid argument "innerError" when creating a new ' +
      'ValidationError (it has to be an Error)'
    );
    this.stack += '\n\n' + innerError.stack;
  }
}

util.inherits(ValidationError, Error);

/**
 * Error class to be used when an Adapter was referenced and the platform
 * was not able to find it.
 * @constructor
 * @extends Error
 * @param {?string} [adapterName] The adapter name to be displayed.
 * @param {?Error} [innerError] The inner error.
 * @memberof module:back4app/entity/models/errors
 * @example
 * if (settings.ADAPTERS.default) {
 *   return settings.ADAPTERS.default;
 * } else {
 *   throw new errors.AdapterNotFoundError('default');
 * }
 */
function AdapterNotFoundError(adapterName, innerError) {
  /**
   * The name of the adapter that was not found.
   * @type {?string}
   */
  this.adapterName = adapterName;
  /**
   * The inner error that generated the current error.
   * @type {?Error}
   */
  this.innerError = innerError;

  expect(arguments).to.have.length.below(
    3,
    'Invalid arguments length when creating a new ' +
    'EntityNotFoundError (it has to be passed less than 3 arguments)'
  );

  this.name = 'AdapterNotFoundError';

  this.message = 'Cannot find Adapter';
  if (adapterName) {
    expect(adapterName).to.be.a(
      'string',
      'Invalid argument "adapterName" when creating a new ' +
      'AdapterNotFoundError (it has to be a string)'
    );
    this.message += ' "' + adapterName + '"';
  }

  this.stack = (new Error(this.message)).stack;
  if (innerError) {
    expect(innerError).to.be.an.instanceof(
      Error,
      'Invalid argument "innerError" when creating a new ' +
      'AdapterNotFoundError (it has to be an Error)'
    );
    this.stack += '\n\n' + innerError.stack;
  }
}

util.inherits(AdapterNotFoundError, Error);

});
