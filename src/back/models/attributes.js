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
 * Holds an Entity Attribute information.
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
 */
/**
 * Holds an Entity Attribute information.
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
 */
function Attribute() {
  expect(arguments).to.have.length.within(1, 4);

  /**
   * This is the attribute' name.
   * @name module:back4app/entity/models/attributes.Attribute#name
   * @type {!string}
   * @readonly
   */
  this.name = null;
  var _name = null;

  /**
   * This is the attribute type.
   * @name module:back4app/entity/models/attributes.Attribute#type
   * @type {!string}
   * @readonly
   */
  this.type = null;
  var _type = 'Object';

  /**
   * This is the attribute's multiplicity.
   * @name module:back4app/entity/models/attributes.Attribute#multiplicity
   * @type {!string}
   * @readonly
   */
  this.multiplicity = null;
  var _multiplicity = '1';

  /**
   * This is the attribute's default expression.
   * @name module:back4app/entity/models/attributes.Attribute#default
   * @type {?(boolean|number|string|Object|function)}
   * @readonly
   */
  this.default = null;
  var _default = null;

  if (arguments.length === 1 && typeof arguments[0] !== 'string') {
    var attribute = arguments[0];

    expect(attribute).to.be.an('object');

    for (var property in attribute) {
      expect(['name', 'type', 'multiplicity', 'default']).to.include(property);
    }

    expect(attribute).to.have.ownProperty('name');

    _name = attribute.name;

    if (attribute.hasOwnProperty('type')) {
      expect(attribute.type).to.be.a('string');

      _type = attribute.type;
    }

    if (attribute.hasOwnProperty('multiplicity')) {
      expect(attribute.multiplicity).to.be.a('string');

      _multiplicity = attribute.multiplicity;
    }

    if (attribute.hasOwnProperty('default')) {
      _default = attribute.default;
    }
  } else {
    expect(arguments[0]).to.be.a('string');

    _name = arguments[0];

    if (arguments.length > 1) {
      expect(arguments[1]).to.be.a('string');

      _type = arguments[1];
    }

    if (arguments.length > 2) {
      expect(arguments[2]).to.be.a('string');

      _multiplicity = arguments[2];
    }

    if (arguments.length > 3) {
      _default = arguments[3];
    }
  }

  Object.defineProperty(this, 'name', {
    get: function () {
      return _name;
    },
    set: function () {
      throw new Error('Name cannot be changed.');
    }
  });

  Object.defineProperty(this, 'type', {
    get: function () {
      return _type;
    },
    set: function () {
      throw new Error('Name cannot be changed.');
    }
  });

  Object.defineProperty(this, 'multiplicity', {
    get: function () {
      return _multiplicity;
    },
    set: function () {
      throw new Error('Name cannot be changed.');
    }
  });

  Object.defineProperty(this, 'default', {
    get: function () {
      return _default;
    },
    set: function () {
      throw new Error('Name cannot be changed.');
    }
  });
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
  expect(arguments).to.have.length.below(2);

  if (attributes) {
    expect(attributes).to.be.an('object');

    if (attributes instanceof Array) {
      for (var i = 0; i < attributes.length; i++) {
        expect(attributes[i]).to.be.an('object');

        this.add(attributes[i]);
      }
    } else {
      for (var attribute in attributes) {
        expect(attributes[attribute]).to.be.an('object');

        this.add(attributes[attribute], attribute);
      }
    }
  }
}

/**
 * Adds a new attribute to the collection.
 * @name module:back4app/entity/models/attributes.AttributeCollection#add
 * @function
 * @param {!module:back4app/entity/models/attributes.Attribute} attribute This
 * is the attribute to be added. It can be passed as a
 * {@link module:back4app/entity/models/attributes.Attribute} instance.
 * @param {?string} [name] This is the name of the attribute.
 */
/**
 * Adds a new attribute to the collection.
 * @name module:back4app/entity/models/attributes.AttributeCollection#add
 * @function
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
 */
/**
 * Adds a new attribute to the collection.
 * @name module:back4app/entity/models/attributes.AttributeCollection#add
 * @function
 * @param {!string} name It is the name of the attribute.
 * @param {!string} [type='Object'] It is the type of the attribute. It is
 * optional and if not passed it will assume 'Object' as the default value.
 * @param {!string} [multiplicity='1'] It is the multiplicity of the attribute.
 * It is optional and if not passed it will assume '1' as the default value.
 * @param {?(boolean|number|string|Object|function)} [default] It is the default
 * expression of the attribute.
 */
AttributeCollection.prototype.add = function () {
  expect(arguments).to.have.length.within(1, 5);

  var attribute = null;
  var name = null;

  if (arguments.length === 1) {
    attribute = arguments[0];
  } else if (arguments.length === 2) {
    attribute = arguments[0];
    name = arguments[1];
  } else {
    attribute = new (Function.prototype.bind.apply(
      Attribute,
      [null].concat(arguments)
    ))();
  }

  expect(attribute).to.be.an('object');

  if (name) {
    expect(name).to.be.a('string');

    if (attribute.name) {
      expect(attribute.name).to.equal(name);
    } else {
      attribute.name = name;
    }
  }

  if (!(attribute instanceof Attribute)) {
    attribute = new Attribute(attribute);
  }

  expect(this).to.not.have.ownProperty(attribute.name);

  Object.defineProperty(this, attribute.name, {
    get: function () {
      return attribute;
    },
    set: function () {
      throw new Error('Attribute cannot be changed');
    }
  });
};
