//
// Created by davimacedo on 08/10/15.
//

'use strict';

var expect = require('chai').expect;
var Attribute = require('./Attribute');

module.exports = AttributeDictionary;

/**
 * Dictionary of Entity Attributes.
 * @constructor
 * @memberof module:back4app-entity/models/attributes
 * @param {?(module:back4app-entity/models/attributes.Attribute[]|
 * Object.<!string, !(module:back4app-entity/models/attributes.Attribute|
 * Object)>)}
 * [attributes] The attributes to be added in the dictionary. They can be given
 * as an Array or a Dictionary of
 * {@link module:back4app-entity/models/attributes.Attribute}.
 * @example
 * var attributeDictionary = new AttributeDictionary();
 * @example
 * var attributeDictionary = new AttributeDictionary(null);
 * @example
 * var attributeDictionary = new AttributeDictionary({});
 * @example
 * var attributeDictionary = new AttributeDictionary({
 *   attribute1: new StringAttribute('attribute1'),
 *   attribute2: new StringAttribute('attribute2')
 * });
 */
function AttributeDictionary(attributes) {
  expect(arguments).to.have.length.below(
    2,
    'Invalid arguments length when creating an AttributeDictionary (it has ' +
    'to be passed less than 2 arguments)'
  );

  if (attributes) {
    expect(typeof attributes).to.equal(
      'object',
      'Invalid argument type when creating an AttributeDictionary (it has to ' +
      'be an object)'
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

  Object.preventExtensions(this);
  Object.seal(this);
}

AttributeDictionary.concat = concat;

/**
 * Adds a new attribute to the dictionary.
 * @name
 * module:back4app-entity/models/attributes.AttributeDictionary~_addAttribute
 * @function
 * @param {!module:back4app-entity/models/attributes.AttributeDictionary}
 * attributeDictionary It is the attribute dictionary to which the attribute
 * will be added.
 * @param {!module:back4app-entity/models/attributes.Attribute} attribute This
 * is the attribute to be added. It can be passed as a
 * {@link module:back4app-entity/models/attributes.Attribute} instance.
 * @param {?string} [name] This is the name of the attribute.
 * @private
 * @example
 * var attributeDictionary = new AttributeDictionary();
 * _addAttribute(
 *   attributeDictionary,
 *   new StringAttribute('attribute'),
 *   'attribute'
 * );
 */
/**
 * Adds a new attribute to the dictionary.
 * @name
 * module:back4app-entity/models/attributes.AttributeDictionary~_addAttribute
 * @function
 * @param {!module:back4app-entity/models/attributes.AttributeDictionary}
 * attributeDictionary It is the attribute dictionary to which the attribute
 * will be added.
 * @param {!Object} attribute This is the attribute to be added. It can be
 * passed as an Object, as specified in
 * {@link module:back4app-entity/models/attributes.Attribute}.
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
 * var attributeDictionary = new AttributeDictionary();
 * _addAttribute(attributeDictionary, {}, 'attribute');
 */
function _addAttribute() {
  var attributeDictionary = arguments[0];

  var attribute = null;
  var name = null;

  if (arguments.length === 2) {
    attribute = arguments[1];
  } else {
    attribute = arguments[1];
    name = arguments[2];
  }

  expect(attribute).to.be.an(
    'object',
    'Invalid argument type when adding an attribute ' + (name ? 'called "' +
    name + '" ' : '') + 'in an AttributeDictionary (it has to be an object)'
  );

  if (name) {
    if (attribute.name) {
      expect(attribute.name).to.equal(
        name,
        'Invalid argument "name" when adding an attribute called "' +
        attribute.name + '" in an AttributeDictionary (the name given in ' +
        'argument and the name given in the attribute object should be equal)'
      );
    } else {
      attribute.name = name;
    }
  }

  if (!(attribute instanceof Attribute)) {
    attribute = Attribute.resolve(attribute);
  }

  expect(attribute.constructor).to.not.equal(
    Attribute,
    'Invalid attribute "' + attribute.name + '". Attribute is an abstract ' +
    'class and cannot be directly instantiated and added in an ' +
    'AttributeDictionary'
  );

  expect(attributeDictionary).to.not.have.ownProperty(
    attribute.name,
    'Duplicated attribute name "' + attribute.name + '"'
  );

  Object.defineProperty(attributeDictionary, attribute.name, {
    value: attribute,
    enumerable: true,
    writable: false,
    configurable: false
  });
}

/**
 * Concatenates an AttributeDictionary instance with an Attribute instance and
 * returns a new AttributeDictionary.
 * @name module:back4app-entity/models/attributes.AttributeDictionary.concat
 * @function
 * @param {!module:back4app-entity/models/attributes.AttributeDictionary}
 * attributeDictionary The AttributeDictionary to be concatenated.
 * @param {!module:back4app-entity/models/attributes.Attribute} attribute
 * The Attribute to be concatenated.
 * @returns {module:back4app-entity/models/attributes.AttributeDictionary} The
 * new concatenated AttributeDictionary.
 * @example
 * var concatenatedAttributeDictionary = AttributeDictionary.concat(
 *   attributeDictionary,
 *   attribute
 * );
 */
function concat(attributeDictionary, attribute) {
  expect(arguments).to.have.length(
    2,
    'Invalid arguments length when concatenating an AttributeDictionary (it ' +
    'has to be passed 2 arguments)'
  );

  expect(attributeDictionary).to.be.instanceof(
    AttributeDictionary,
    'Invalid argument "attributeDictionary" when concatenating an ' +
    'AttributeDictionary (it has to be an AttributeDictionary)'
  );

  expect(attribute).to.be.instanceof(
    Attribute,
    'Invalid argument "attribute" when concatenating an AttributeDictionary ' +
    '(it has to be an Attribute)'
  );

  var currentAttributes = [];

  for (var currentAttribute in attributeDictionary) {
    currentAttributes.push(attributeDictionary[currentAttribute]);
  }

  currentAttributes.push(attribute);

  return new AttributeDictionary(currentAttributes);
}
