//
// Created by davimacedo on 10/10/15.
//

'use strict';

var expect = require('chai').expect;
var classes = require('../../../utils/classes');
var objects = require('../../../utils/objects');
var models = require('../../index');
var ValidationError = require('../../errors').ValidationError;
var Attribute = require('../Attribute');

module.exports = AssociationAttribute;

/**
 * Implementation of an Entity Attribute to store association data.
 * @memberof module:back4app-entity/models/attributes/types
 * @name AssociationAttribute
 * @constructor
 * @extends module:back4app-entity/models/attributes.Attribute
 * @param {!Object} attribute This is the attribute to be added. It can be
 * passed as an Object.
 * @param {!string} attribute.name It is the name of the attribute.
 * @param {!(string|Class)} attribute.entity It is the
 * Entity that is associated with the current AssociationAttribute.
 * @param {!string} [attribute.multiplicity='1'] It is the multiplicity of the
 * attribute. It is optional and if not passed it will assume '1' as the default
 * value.
 * @param {?Object} [attribute.default] It is
 * the default expression of the attribute.
 * @param {?(string|Object.<!string, !string>)} [attribute.dataName] It is the
 * name to be used to stored the attribute data in the repository. It can be
 * given as a string that will be used by all adapters or as a dictionary
 * specifying the data name for each adapter. If dataName is not given, the
 * attribute's name will be used instead.
 * @example
 * var associationAttribute = new AssociationAttribute({
 *   name: 'associationAttribute',
 *   entity: 'MyEntity',
 *   multiplicity: '0..1',
 *   default: null,
 *   dataName: {
 *     mongodb: 'mongodbAttribute'
 *   }
 * });
 */
/**
 * Implementation of an Entity Attribute to store association data.
 * @memberof module:back4app-entity/models/attributes/types
 * @name AssociationAttribute
 * @constructor
 * @extends module:back4app-entity/models/attributes.Attribute
 * @param {!string} name It is the name of the attribute.
 * @param {!(string|Class)} entity It is the Entity that
 * is associated with the current AssociationAttribute.
 * @param {!string} [multiplicity='1'] It is the multiplicity of the attribute.
 * It is optional and if not passed it will assume '1' as the default value.
 * @param {?Object} [default] It is the default
 * expression of the attribute.
 * @param {?(string|Object.<!string, !string>)} [dataName] It is the name to be
 * used to stored the attribute data in the repository. It can be given as a
 * string that will be used by all adapters or as a dictionary specifying the
 * data name for each adapter. If dataName is not given, the attribute's name
 * will be used instead.
 * @example
 * var associationAttribute = new AssociationAttribute(
 *   'associationAttribute',
 *   'MyEntity',
 *   '0..1',
 *   null,
 *   {
 *     mongodb: 'mongodbAttribute'
 *   }
 * );
 */
function AssociationAttribute() {
  /**
   * It is a readonly property with the Entity that is associated with the
   * current AssociationAttribute.
   * @name
   * module:back4app-entity/models/attributes/types.AssociationAttribute#Entity
   * @type {!Class}
   * @readonly
   * @throws {module:back4app-entity/models/errors.EntityNotFoundError}
   * @example
   * var associationAttribute = new AssociationAttribute(
   *   'associationAttribute',
   *   MyEntity
   * );
   * console.log(associationAttribute.Entity == MyEntity) // Logs "true"
   */
  this.Entity = null;

  var _Entity = null;
  Object.defineProperty(this, 'Entity', {
    get: function () {
      if (typeof _Entity === 'string') {
        _Entity = models.Entity.getSpecialization(_Entity);
      }

      return _Entity;
    },
    set: function () {
      throw new Error(
        'Entity property of an AssociationAttribute instance cannot be changed'
      );
    },
    enumerable: true,
    configurable: false
  });

  var argumentsArray = Array.prototype.slice.call(arguments);

  expect(argumentsArray).to.have.length.within(
    1,
    5,
    'Invalid arguments length when creating an AssociationAttribute (it has ' +
    'to be passed from 1 to 5 arguments)'
  );

  if (argumentsArray.length === 1) {
    var associationAttribute = argumentsArray[0];

    expect(associationAttribute).to.be.an(
      'object',
      'Invalid argument type when creating an Attribute (it has to be an ' +
      'object)'
    );

    associationAttribute = objects.copy(associationAttribute);

    _Entity = associationAttribute.entity;
    if (_Entity) {
      delete associationAttribute.entity;
    } else {
      expect(associationAttribute).to.have.ownProperty(
        'Entity',
        'Property "entity" or "Entity" is required when creating an ' +
        'AssociationAttribute'
      );

      _Entity = associationAttribute.Entity;
      delete associationAttribute.Entity;
    }

    argumentsArray[0] = associationAttribute;
  } else {
    _Entity = argumentsArray.splice(1, 1)[0];
  }

  if (typeof _Entity !== 'string') {
    expect(_Entity).to.be.a(
      'function',
      'Invalid argument "entity" when creating an AssociationAttribute (it ' +
      'has to be a Class)'
    );

    expect(classes.isGeneral(models.Entity, _Entity)).to.equal(
      true,
      'Invalid argument "entity" when creating an AssociationAttribute (it ' +
      'has to be a subclass of Entity)'
    );
  }

  Attribute.apply(this, argumentsArray);
}

classes.generalize(Attribute, AssociationAttribute);

AssociationAttribute.typeName = 'Association';

AssociationAttribute.prototype.validateValue = validateValue;
AssociationAttribute.prototype.getDataValue = getDataValue;
AssociationAttribute.prototype.parseDataValue = parseDataValue;

function validateValue(value) {
  if (value instanceof this.Entity) {
    value.validate();
  } else {
    throw new ValidationError(
      'this attribute\'s value should be a "' +
      this.Entity.specification.name +
      '"'
    );
  }
}

function getDataValue(attributeValue) {
  expect(arguments).to.have.length(
    1,
    'Invalid arguments length when getting the data value of an Attribute ' +
    '(it has to be passed 1 argument)');

  var dataValue = attributeValue;

  if (attributeValue instanceof models.Entity) {
    dataValue = {
      Entity: attributeValue.Entity.specification.name,
      id: attributeValue.id
    };
  } else if (attributeValue instanceof Array) {
    dataValue = [];

    for (var i = 0; i < attributeValue.length; i++) {
      if (attributeValue[i] instanceof models.Entity) {
        dataValue.push({
          Entity: attributeValue[i].Entity.specification.name,
          id: attributeValue[i].id
        });
      } else {
        dataValue.push(attributeValue[i]);
      }
    }
  }

  return dataValue;
}

function parseDataValue(dataValue) {
  expect(arguments).to.have.length(
    1,
    'Invalid arguments length when parsing the data value of an Attribute ' +
    '(it has to be passed 1 argument)');

  var attributeValue = dataValue;

  if (dataValue instanceof Array) {
    attributeValue = [];
    for (var i = 0; i < dataValue.length; i++) {
      attributeValue.push(_parseDataValueItem(dataValue[i]));
    }
  } else {
    attributeValue = _parseDataValueItem(dataValue);
  }

  return attributeValue;

  function _parseDataValueItem(dataValueItem) {
    if (typeof dataValueItem === 'object' && dataValueItem !== null) {
      try {
        var dataValueItemCopy = objects.copy(dataValueItem);
        var newFunction = models.Entity.new(dataValueItemCopy.Entity);
        delete dataValueItemCopy.Entity;
        return newFunction(dataValueItemCopy);
      } catch (error) {
        return dataValueItem;
      }
    } else {
      return dataValueItem;
    }
  }
}
