//
// Created by davimacedo on 08/10/15.
//

'use strict';

var expect = require('chai').expect;
var objects = require('../../utils/objects')
var Attribute = require('./Attribute');
var attributeTypes = require('./types');
var ObjectAttribute = attributeTypes.ObjectAttribute;

module.exports = AttributeCollection;

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
 * @example
 * var attributeCollection = new AttributeCollection();
 * @example
 * var attributeCollection = new AttributeCollection(null);
 * @example
 * var attributeCollection = new AttributeCollection({});
 * @example
 * var attributeCollection = new AttributeCollection({
 *   attribute1: new StringAttribute('attribute1'),
 *   attribute2: new StringAttribute('attribute2')
 * });
 */
function AttributeCollection(attributes) {
  expect(arguments).to.have.length.below(
    2,
    'Invalid arguments length when creating an AttributeCollection (it has ' +
    'to be passed less than 2 arguments)'
  );

  if (attributes) {
    expect(typeof attributes).to.equal(
      'object',
      'Invalid argument type when creating an AttributeCollection (it has to ' +
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

AttributeCollection.concat = concat;

/**
 * Adds a new attribute to the collection.
 * @name
 * module:back4app/entity/models/attributes.AttributeCollection~_addAttribute
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
 * _addAttribute(
 *   attributeCollection,
 *   new StringAttribute('attribute'),
 *   'attribute'
 * );
 */
/**
 * Adds a new attribute to the collection.
 * @name
 * module:back4app/entity/models/attributes.AttributeCollection~_addAttribute
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
 * @name
 * module:back4app/entity/models/attributes.AttributeCollection~_addAttribute
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
      [null].concat(Array.prototype.slice.call(arguments, 1))
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
    if (attribute.type) {
      var TypedAttribute = attributeTypes.get(attribute.type);

      attribute = objects.copy(attribute);
      delete attribute.type;

      attribute = new TypedAttribute(attribute);
    } else {
      attribute = new ObjectAttribute(attribute);
    }
  }

  expect(attribute.constructor).to.not.equal(
    Attribute,
    'Invalid attribute "' + attribute.name + '". Attribute is an abstract ' +
    'class and cannot be directly instantiated and added in an ' +
    'AttributeCollection'
  );

  expect(attributeCollection).to.not.have.ownProperty(
    attribute.name,
    'Duplicated attribute name "' + attribute.name + '"'
  );

  Object.defineProperty(attributeCollection, attribute.name, {
    value: attribute,
    enumerable: true,
    writable: false,
    configurable: false
  });
}

/**
 * Concatenates an AttributeCollection instance with an Attribute instance and
 * returns a new AttributeCollection.
 * @name module:back4app/entity/models/attributes.AttributeCollection.concat
 * @function
 * @param {!module:back4app/entity/models/attributes.AttributeCollection}
 * attributeCollection The AttributeCollection to be concatenated.
 * @param {!module:back4app/entity/models/attributes.Attribute} attribute
 * The Attribute to be concatenated.
 * @returns {module:back4app/entity/models/attributes.AttributeCollection} The
 * new concatenated AttributeCollection.
 * @example
 * var concatenatedAttributeCollection = AttributeCollection.concat(
 *   attributeCollection,
 *   attribute
 * );
 */
function concat(attributeCollection, attribute) {
  expect(arguments).to.have.length(
    2,
    'Invalid arguments length when concatenating an AttributeCollection (it ' +
    'has to be passed 2 arguments)'
  );

  expect(attributeCollection).to.be.instanceof(
    AttributeCollection,
    'Invalid argument "attributeCollection" when concatenating an ' +
    'AttributeCollection (it has to be an AttributeCollection)'
  );

  expect(attribute).to.be.instanceof(
    Attribute,
    'Invalid argument "attribute" when concatenating an AttributeCollection ' +
    '(it has to be an Attribute)'
  );

  var currentAttributes = [];

  for (var currentAttribute in attributeCollection) {
    currentAttributes.push(attributeCollection[currentAttribute]);
  }

  currentAttributes.push(attribute);

  return new AttributeCollection(currentAttributes);
}
