//
// Created by davimacedo on 08/10/15.
//

'use strict';

var expect = require('chai').expect;
var objects = require('../../utils/objects');
var errors = require('../errors');
var attributes = require('./');

module.exports = Attribute;

/**
 * Holds an Entity Attribute information. An instance of Attribute is not
 * extensible. The Attribute is an abstract class and cannot be directly
 * initialized.
 * @memberof module:back4app/entity/models/attributes
 * @name Attribute
 * @constructor
 * @abstract
 * @param {!Object} attribute This is the attribute to be added. It can be
 * passed as an Object.
 * @param {!string} attribute.name It is the name of the attribute.
 * @param {!string} [attribute.type='Object'] It is the type of the attribute.
 * It is optional and if not passed it will assume 'Object' as the default
 * value.
 * @param {!string} [attribute.multiplicity='1'] It is the multiplicity of the
 * attribute. It is optional and if not passed it will assume '1' as the default
 * value.
 * @param {?(boolean|number|string|Object|function)} [attribute.default] It is
 * the default expression of the attribute.
 * @example
 * Attribute.call(this, {
 *   name: 'attribute',
 *   type: 'String',
 *   multiplicity: '0..1',
 *   default: null
 * });
 */
/**
 * Holds an Entity Attribute information. An instance of Attribute is not
 * extensible. The Attribute is an abstract class and cannot be directly
 * initialized.
 * @memberof module:back4app/entity/models/attributes
 * @name Attribute
 * @constructor
 * @param {!string} name It is the name of the attribute.
 * @param {!string} [type='Object'] It is the type of the attribute. It is
 * optional and if not passed it will assume 'Object' as the default value.
 * @param {!string} [multiplicity='1'] It is the multiplicity of the attribute.
 * It is optional and if not passed it will assume '1' as the default value.
 * @param {?(boolean|number|string|Object|function)} [default] It is the default
 * expression of the attribute.
 * @example
 * Attribute.call(
 *   this,
 *   'attribute',
 *   'String',
 *   '0..1',
 *   null
 * );
 */
function Attribute() {
  /**
   * This is the attribute' name.
   * @name module:back4app/entity/models/attributes.Attribute#name
   * @type {!string}
   * @readonly
   * @example
   * Attribute.call(
   *   this,
   *   'attribute',
   *   'String',
   *   '0..1',
   *   'default'
   * );
   * console.log(this.name); // Logs "attribute"
   */
  this.name = null;
  /**
   * This is the attribute type.
   * @name module:back4app/entity/models/attributes.Attribute#type
   * @type {!string}
   * @readonly
   * @example
   * Attribute.call(
   *   this,
   *   'attribute',
   *   'String',
   *   '0..1',
   *   'default'
   * );
   * console.log(this.type); // Logs "String"
   */
  this.type = null;
  /**
   * This is the attribute's multiplicity.
   * @name module:back4app/entity/models/attributes.Attribute#multiplicity
   * @type {!string}
   * @readonly
   * @example
   * Attribute.call(
   *   this,
   *   'attribute',
   *   'String',
   *   '0..1',
   *   'default'
   * );
   * console.log(this.multiplicity); // Logs "0..1"
   */
  this.multiplicity = null;
  /**
   * This is the attribute's default expression.
   * @name module:back4app/entity/models/attributes.Attribute#default
   * @type {?(boolean|number|string|Object|function)}
   * @readonly
   * @example
   * Attribute.call(
   *   this,
   *   'attribute',
   *   'String',
   *   '0..1',
   *   'default'
   * );
   * console.log(this.default); // Logs "default"
   */
  this.default = null;

  if (this) {
    expect(this.constructor).to.not.equal(
      Attribute,
      'The Attribute is an abstract class and cannot be directly initialized'
    );

    expect(this).to.be.instanceof(
      Attribute,
      'The Attribute\'s constructor can be only invoked from specialized' +
      'classes'
    );
  }

  var _name = null;
  var _type = 'Object';
  var _multiplicity = '1';
  var _default = null;

  expect(arguments).to.have.length.within(
    1,
    4,
    'Invalid arguments length when creating an Attribute (it has to be ' +
    'passed from 1 to 4 arguments)'
  );

  if (arguments.length === 1 && typeof arguments[0] !== 'string') {
    var attribute = arguments[0];

    expect(attribute).to.be.an(
      'object',
      'Invalid argument type when creating an Attribute (it has to be an ' +
      'object or a string)'
    );

    expect(attribute).to.have.ownProperty(
      'name',
      'Property "name" is required when creating an Attribute'
    );
    expect(attribute.name).to.be.a(
      'string',
      'Invalid property "name" when creating an Attribute (it has to be a ' +
      'string)'
    );

    _name = attribute.name;

    for (var property in attribute) {
      expect(['name', 'type', 'multiplicity', 'default']).to.include(
        property,
        'Invalid property "' + property + '" when creating an Attribute ' +
        'called "' + _name + '" (valid properties are "name", ' +
        '"type", "multiplicity" and "default")'
      );
    }

    if (attribute.hasOwnProperty('type')) {
      expect(attribute.type).to.be.a(
        'string',
        'Invalid property "type" when creating an Attribute called "' +
        _name + '" (it has to be a string)'
      );

      _type = attribute.type;
    }

    if (attribute.hasOwnProperty('multiplicity')) {
      expect(attribute.multiplicity).to.be.a(
        'string',
        'Invalid property "multiplicity" when creating an Attribute called "' +
        _name + '" (it has to be a string'
      );

      expect(['1', '0..1', '1..*', '*']).to.contain(
        attribute.multiplicity,
        'Invalid property "multiplicity" when creating an Attribtue called "' +
        _name + '" (valid values are "1", "0..1", "1..*", "*")'
      );

      _multiplicity = attribute.multiplicity;
    }

    if (attribute.hasOwnProperty('default')) {
      _default = attribute.default;
    }
  } else {
    expect(arguments[0]).to.be.a(
      'string',
      'Invalid argument "name" when creating an Attribute (it has to be a ' +
      'string)'
    );

    _name = arguments[0];

    if (arguments.length > 1) {
      expect(arguments[1]).to.be.a(
        'string',
        'Invalid argument "type" when creating an Attribute called "' + _name +
        '" (it has to be a string)'
      );

      _type = arguments[1];
    }

    if (arguments.length > 2) {
      expect(arguments[2]).to.be.a(
        'string',
        'Invalid argument "multiplicity" when creating an Attribute called "' +
        _name + '" (it has to be a string)'
      );

      expect(['1', '0..1', '1..*', '*']).to.contain(
        arguments[2],
        'Invalid argument "multiplicity" when creating an Attribtue called "' +
          _name + '" (valid values are "1", "0..1", "1..*", "*")'
      );

      _multiplicity = arguments[2];
    }

    if (arguments.length > 3) {
      _default = arguments[3];
    }
  }

  Object.defineProperty(this, 'name', {
    value: _name,
    enumerable: true,
    writable: false,
    configurable: false
  });

  Object.defineProperty(this, 'type', {
    value: _type,
    enumerable: true,
    writable: false,
    configurable: false
  });

  Object.defineProperty(this, 'multiplicity', {
    value: _multiplicity,
    enumerable: true,
    writable: false,
    configurable: false
  });

  Object.defineProperty(this, 'default', {
    value: _default,
    enumerable: true,
    writable: false,
    configurable: false
  });

  Object.preventExtensions(this);
  Object.seal(this);
}

Attribute.resolve = resolve;

/**
 * Resolves the arguments and create a new instance of Attribute.
 * @memberof module:back4app/entity/models/attributes.Attribute
 * @name resolve
 * @param {!Object} attribute This is the attribute to be resolved. It can be
 * passed as an Object.
 * @param {!string} attribute.name It is the name of the attribute.
 * @param {!string} [attribute.type='Object'] It is the type of the attribute.
 * It is optional and if not passed it will assume 'Object' as the default
 * value.
 * @param {!string} [attribute.multiplicity='1'] It is the multiplicity of the
 * attribute. It is optional and if not passed it will assume '1' as the default
 * value.
 * @param {?(boolean|number|string|Object|function)} [attribute.default] It is
 * the default expression of the attribute.
 * @returns {module:back4app/entity/models/attributes.Attribute} The new
 * Attribute instance.
 * @throws {module:back4app/entity/models/errors.AttributeTypeNotFoundError}
 * @example
 * Attribute.resolve({
 *   name: 'attribute',
 *   type: 'String',
 *   multiplicity: '0..1',
 *   default: null
 * });
 */
/**
 * Resolves the arguments and create a new instance of Attribute. It tries to
 * find the Attribute type. It it is not possible, it assumes that it is an
 * AssociationAttribute.
 * @memberof module:back4app/entity/models/attributes.Attribute
 * @name resolve
 * @param {!string} name It is the name of the attribute.
 * @param {!string} [type='Object'] It is the type of the attribute. It is
 * optional and if not passed it will assume 'Object' as the default value.
 * @param {!string} [multiplicity='1'] It is the multiplicity of the attribute.
 * It is optional and if not passed it will assume '1' as the default value.
 * @param {?(boolean|number|string|Object|function)} [default] It is the default
 * expression of the attribute.
 * @returns {module:back4app/entity/models/attributes.Attribute} The new
 * Attribute instance.
 * @throws {module:back4app/entity/models/errors.AttributeTypeNotFoundError}
 * @example
 * Attribute.call(
 *   this,
 *   'attribute',
 *   'String',
 *   '0..1',
 *   null
 * );
 */
function resolve() {
  expect(arguments).to.have.length.within(
    1,
    4,
    'Invalid arguments length when resolving an Attribute (it has to be ' +
    'passed from 1 to 4 arguments)'
  );

  var argumentArray = Array.prototype.slice.call(arguments);
  var TypedAttribute = attributes.types.ObjectAttribute;

  if (arguments.length === 1 && typeof arguments[0] !== 'string') {
    var attribute = objects.copy(arguments[0]);
    argumentArray[0] = attribute;

    expect(attribute).to.be.an(
      'object',
      'Invalid argument type when resolving an Attribute (it has to be an ' +
      'object)'
    );

    if (attribute.type) {
      expect(attribute.type).to.be.a(
        'string',
        'Invalid argument "type" when resolving an Attribute' +
        (attribute.name ? ' called' + attribute.name : '') +
        ' (it has to be a string)'
      );

      try {
        TypedAttribute = attributes.types.get(attribute.type);
      } catch (e) {
        if (e instanceof errors.AttributeTypeNotFoundError) {
          TypedAttribute = attributes.types.AssociationAttribute;
          attribute.entity = attribute.type;
        } else {
          throw e;
        }
      }

      delete attribute.type;
    }
  } else {
    if (arguments.length > 1) {
      expect(arguments[1]).to.be.a(
        'string',
        'Invalid argument "type" when resolving an Attribute' +
        (arguments[0] ? ' called' + arguments[0] : '') +
        ' (it has to be a string)'
      );

      try {
        TypedAttribute = attributes.types.get(arguments[1]);
      } catch (e) {
        if (e instanceof errors.AttributeTypeNotFoundError) {
          TypedAttribute = attributes.types.AssociationAttribute;
          argumentArray.splice(2, 0, arguments[1]);
        } else {
          throw e;
        }
      }

      argumentArray.splice(1,1);
    }
  }

  return new (Function.prototype.bind.apply(
    TypedAttribute,
    [null].concat(argumentArray)
  ))();
}
