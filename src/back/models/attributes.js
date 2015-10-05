//
// Created by davimacedo on 30/09/15.
//

'use strict';

var expect = require('chai').expect;

/**
 * Contains base classes for Entity Attribute modeling.
 * @module back4app/entity/models/attributes
 */
module.exports = {};

module.exports.Attribute = Attribute;
module.exports.AttributeCollection = AttributeCollection;

/**
 * Holds an Entity Attribute information. An instance of Attribute is not
 * extensible.
 * @memberof module:back4app/entity/models/attributes
 * @name Attribute
 * @constructor
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
 * var attribute = new attributes.Attribute({
 *   name: 'attribute',
 *   type: 'String',
 *   multiplicity: '0..1',
 *   default: null
 * });
 */
/**
 * Holds an Entity Attribute information. An instance of Attribute is not
 * extensible.
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
 * var attribute = new attributes.Attribute(
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
   * var attribute = new attributes.Attribute(
   *   'attribute',
   *   'String',
   *   '0..1',
   *   'default'
   * );
   * console.log(attribute.name); // Logs "attribute"
   */
  this.name = null;
  /**
   * This is the attribute type.
   * @name module:back4app/entity/models/attributes.Attribute#type
   * @type {!string}
   * @readonly
   * @example
   * var attribute = new attributes.Attribute(
   *   'attribute',
   *   'String',
   *   '0..1',
   *   'default'
   * );
   * console.log(attribute.type); // Logs "String"
   */
  this.type = null;
  /**
   * This is the attribute's multiplicity.
   * @name module:back4app/entity/models/attributes.Attribute#multiplicity
   * @type {!string}
   * @readonly
   * @example
   * var attribute = new attributes.Attribute(
   *   'attribute',
   *   'String',
   *   '0..1',
   *   'default'
   * );
   * console.log(attribute.multiplicity); // Logs "0..1"
   */
  this.multiplicity = null;
  /**
   * This is the attribute's default expression.
   * @name module:back4app/entity/models/attributes.Attribute#default
   * @type {?(boolean|number|string|Object|function)}
   * @readonly
   * @example
   * var attribute = new attributes.Attribute(
   *   'attribute',
   *   'String',
   *   '0..1',
   *   'default'
   * );
   * console.log(attribute.default); // Logs "default"
   */
  this.default = null;

  var _name = null;
  Object.defineProperty(this, 'name', {
    get: function () {
      return _name;
    },
    set: function () {
      throw new Error('Name of an Attribute cannot be changed.');
    },
    enumerable: true
  });

  var _type = 'Object';
  Object.defineProperty(this, 'type', {
    get: function () {
      return _type;
    },
    set: function () {
      throw new Error('Type of an Attribute cannot be changed.');
    },
    enumerable: true
  });

  var _multiplicity = '1';
  Object.defineProperty(this, 'multiplicity', {
    get: function () {
      return _multiplicity;
    },
    set: function () {
      throw new Error('Multiplicity of an Attribute cannot be changed.');
    },
    enumerable: true
  });

  Object.defineProperty(this, 'default', {
    get: function () {
      return _default;
    },
    set: function () {
      throw new Error('Default of an Attribute cannot be changed.');
    },
    enumerable: true
  });
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
        'Invalid argument "multiplicity when creating an Attribute called "' +
        _name + '" (it has to be a string)'
      );

      _multiplicity = arguments[2];
    }

    if (arguments.length > 3) {
      _default = arguments[3];
    }
  }

  Object.preventExtensions(this);
  Object.seal(this);
}

/**
 * Collection of Entity Attributes.
 * @constructor
 * @memberof module:back4app/entity/models/attributes
 * @param {?(module:back4app/entity/models/attributes.Attribute[]|
 * Object.<!string, !(module:back4app/entity/models/attributes.Attribute|
 * Object)>)}
 * [attributes] The attributes to be added in the collection. They can be given
 * as an Array or a Dictionary of
 * {@link module:back4app/entity/models/attributes.Attribute}.
 */
function AttributeCollection(attributes) {
  expect(arguments).to.have.length.below(
    2,
    'Invalid arguments length when creating an AttributeCollection'
  );

  if (attributes) {
    expect(attributes).to.be.an(
      'object',
      'Invalid argument type when creating an AttributeCollection'
    );

    if (attributes instanceof Array) {
      for (var i = 0; i < attributes.length; i++) {
        _addAttribute(this, attributes[i]);
      }
    } else {
      for (var attribute in attributes) {
        _addAttribute(this, attributes[attribute], attribute);
      }
    }
  }
}

/**
 * Adds a new attribute to the collection.
 * @name module:back4app/entity/models/attributes~_addAttribute
 * @function
 * @param {!module:back4app/entity/models/attributes.AttributeCollection}
 * attributeCollection It is the attribute collection to which the attribute
 * will be added.
 * @param {!module:back4app/entity/models/attributes.Attribute} attribute This
 * is the attribute to be added. It can be passed as a
 * {@link module:back4app/entity/models/attributes.Attribute} instance.
 * @param {?string} [name] This is the name of the attribute.
 * @private
 * @example
 * var attributeCollection = new AttributeCollection();
 * _addAttribute(attributeCollection, new Attribute('attribute'), 'attribute');
 */
/**
 * Adds a new attribute to the collection.
 * @name module:back4app/entity/models/attributes~_addAttribute
 * @function
 * @param {!module:back4app/entity/models/attributes.AttributeCollection}
 * attributeCollection It is the attribute collection to which the attribute
 * will be added.
 * @param {!Object} attribute This is the attribute to be added. It can be
 * passed as an Object, as specified in
 * {@link module:back4app/entity/models/attributes.Attribute}.
 * @param {!string} [attribute.name] It is the name of the attribute. It is
 * optional if it is passed as an argument in the function.
 * @param {!string} [attribute.type='Object'] It is the type of the attribute.
 * It is optional and if not passed it will assume 'Object' as the default
 * value.
 * @param {!string} [attribute.multiplicity='1'] It is the multiplicity of the
 * attribute. It is optional and if not passed it will assume '1' as the default
 * value.
 * @param {?(boolean|number|string|Object|function)} [attribute.default] It is
 * the default expression of the attribute.
 * @param {?string} [name] This is the name of the attribute.
 * @private
 * @example
 * var attributeCollection = new AttributeCollection();
 * _addAttribute(attributeCollection, {}, 'attribute');
 */
/**
 * Adds a new attribute to the collection.
 * @name module:back4app/entity/models/attributes~_addAttribute
 * @function
 * @param {!module:back4app/entity/models/attributes.AttributeCollection}
 * attributeCollection It is the attribute collection to which the attribute
 * will be added.
 * @param {!string} name It is the name of the attribute.
 * @param {!string} [type='Object'] It is the type of the attribute. It is
 * optional and if not passed it will assume 'Object' as the default value.
 * @param {!string} [multiplicity='1'] It is the multiplicity of the attribute.
 * It is optional and if not passed it will assume '1' as the default value.
 * @param {?(boolean|number|string|Object|function)} [default] It is the default
 * expression of the attribute.
 * @private
 * @example
 * var attributeCollection = new AttributeCollection();
 * _addAttribute(attributeCollection, 'attribute');
 */
function _addAttribute() {
  var attributeCollection = arguments[0];

  var attribute = null;
  var name = null;

  if (arguments.length === 2) {
    attribute = arguments[1];
  } else if (arguments.length === 3) {
    attribute = arguments[1];
    name = arguments[2];
  } else {
    attribute = new (Function.prototype.bind.apply(
      Attribute,
      [null].concat(arguments.slice(1))
    ))();
  }

  expect(attribute).to.be.an(
    'object',
    'Invalid argument type when adding an attribute ' + (name ? 'called "' +
    name + '" ' : '') + 'in an AttributeCollection (it has to be an object)'
  );

  if (name) {
    if (attribute.name) {
      expect(attribute.name).to.equal(
        name,
        'Invalid argument "name" when adding an attribute called "' +
        attribute.name + '" in an AttributeCollection (the name given in ' +
        'argument and the name given in the attribute object should be equal)'
      );
    } else {
      attribute.name = name;
    }
  }

  if (!(attribute instanceof Attribute)) {
    attribute = new Attribute(attribute);
  }

  expect(attributeCollection).to.not.have.ownProperty(
    attribute.name,
    'Duplicated attribute name "' + attribute.name + '"'
  );

  Object.defineProperty(attributeCollection, attribute.name, {
    get: function () {
      return attribute;
    },
    set: function () {
      throw new Error('Attribute "' + attribute.name + '" of an ' +
        'AttributeCollection cannot be changed');
    },
    enumerable: true
  });
}
