//
// Created by davimacedo on 09/10/15.
//

'use strict';

var expect = require('chai').expect;
var classes = require('../../../utils/classes');
var ValidationError = require('../../errors').ValidationError;
var Attribute = require('../Attribute');

module.exports = DateAttribute;

/**
 * Implementation of an Entity Attribute to store Date data.
 * @memberof module:back4app-entity/models/attributes/types
 * @name DateAttribute
 * @constructor
 * @extends module:back4app-entity/models/attributes.Attribute
 * @param {!Object} attribute This is the attribute to be added. It can be
 * passed as an Object.
 * @param {!string} attribute.name It is the name of the attribute.
 * @param {!string} [attribute.multiplicity='1'] It is the multiplicity of the
 * attribute. It is optional and if not passed it will assume '1' as the default
 * value.
 * @param {?Date} [attribute.default] It is
 * the default expression of the attribute.
 * @param {?(string|Object.<!string, !string>)} [attribute.dataName] It is the
 * name to be used to stored the attribute data in the repository. It can be
 * given as a string that will be used by all adapters or as a dictionary
 * specifying the data name for each adapter. If dataName is not given, the
 * attribute's name will be used instead.
 * @example
 * var dateAttribute = new DateAttribute({
 *   name: 'dateAttribute',
 *   multiplicity: '0..1',
 *   default: null,
 *   dataName: {
 *     mongodb: 'mongodbAttribute'
 *   }
 * });
 */
/**
 * Implementation of an Entity Attribute to store Date data.
 * @memberof module:back4app-entity/models/attributes/types
 * @name DateAttribute
 * @constructor
 * @extends module:back4app-entity/models/attributes.Attribute
 * @param {!string} name It is the name of the attribute.
 * @param {!string} [multiplicity='1'] It is the multiplicity of the attribute.
 * It is optional and if not passed it will assume '1' as the default value.
 * @param {?Date} [default] It is the default
 * expression of the attribute.
 * @param {?(string|Object.<!string, !string>)} [dataName] It is the name to be
 * used to stored the attribute data in the repository. It can be given as a
 * string that will be used by all adapters or as a dictionary specifying the
 * data name for each adapter. If dataName is not given, the attribute's name
 * will be used instead.
 * @example
 * var dateAttribute = new DateAttribute(
 *   'dateAttribute',
 *   '0..1',
 *   null,
 *   {
 *     mongodb: 'mongodbAttribute'
 *   }
 * );
 */
function DateAttribute() {
  Attribute.apply(this, Array.prototype.slice.call(arguments));
}

classes.generalize(Attribute, DateAttribute);

DateAttribute.typeName = 'Date';

DateAttribute.prototype.validateValue = validateValue;
DateAttribute.prototype.parseDataValue = parseDataValue;

function validateValue(value) {
  if (!(value instanceof Date) || isNaN(value.getTime())) {
    throw new ValidationError(
      'this attribute\'s value should be a Date'
    );
  }
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
    if (typeof dataValueItem === 'string' && dataValueItem !== null) {
      try {
        var date = new Date(dataValueItem);
        if (isNaN(date.getTime())) {
          return dataValueItem;
        } else {
          return date;
        }
      } catch (error) {
        return dataValueItem;
      }
    } else {
      return dataValueItem;
    }
  }
}
