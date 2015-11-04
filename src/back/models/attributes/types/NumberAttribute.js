//
// Created by davimacedo on 09/10/15.
//

'use strict';

var classes = require('../../../utils/classes');
var ValidationError = require('../../errors').ValidationError;
var Attribute = require('../Attribute');

module.exports = NumberAttribute;

/**
 * Implementation of an Entity Attribute to store number data.
 * @memberof module:back4app-entity/models/attributes/types
 * @name NumberAttribute
 * @constructor
 * @extends module:back4app-entity/models/attributes.Attribute
 * @param {!Object} attribute This is the attribute to be added. It can be
 * passed as an Object.
 * @param {!string} attribute.name It is the name of the attribute.
 * @param {!string} [attribute.multiplicity='1'] It is the multiplicity of the
 * attribute. It is optional and if not passed it will assume '1' as the default
 * value.
 * @param {?number} [attribute.default] It is
 * the default expression of the attribute.
 * @param {?(string|Object.<!string, !string>)} [attribute.dataName] It is the
 * name to be used to stored the attribute data in the repository. It can be
 * given as a string that will be used by all adapters or as a dictionary
 * specifying the data name for each adapter. If dataName is not given, the
 * attribute's name will be used instead.
 * @example
 * var numberAttribute = new NumberAttribute({
 *   name: 'numberAttribute',
 *   multiplicity: '0..1',
 *   default: null,
 *   dataName: {
 *     mongodb: 'mongodbAttribute'
 *   }
 * });
 */
/**
 * Implementation of an Entity Attribute to store number data.
 * @memberof module:back4app-entity/models/attributes/types
 * @name NumberAttribute
 * @constructor
 * @extends module:back4app-entity/models/attributes.Attribute
 * @param {!string} name It is the name of the attribute.
 * @param {!string} [multiplicity='1'] It is the multiplicity of the attribute.
 * It is optional and if not passed it will assume '1' as the default value.
 * @param {?number} [default] It is the default
 * expression of the attribute.
 * @param {?(string|Object.<!string, !string>)} [dataName] It is the name to be
 * used to stored the attribute data in the repository. It can be given as a
 * string that will be used by all adapters or as a dictionary specifying the
 * data name for each adapter. If dataName is not given, the attribute's name
 * will be used instead.
 * @example
 * var numberAttribute = new NumberAttribute(
 *   'numberAttribute',
 *   '0..1',
 *   null,
 *   {
 *     mongodb: 'mongodbAttribute'
 *   }
 * );
 */
function NumberAttribute() {
  Attribute.apply(this, Array.prototype.slice.call(arguments));
}

classes.generalize(Attribute, NumberAttribute);

NumberAttribute.typeName = 'Number';

NumberAttribute.prototype.validateValue = validateValue;

function validateValue(value) {
  if (typeof value !== 'number' && !(value instanceof Number)) {
    throw new ValidationError(
      'this attribute\'s value should be a number'
    );
  }
}
