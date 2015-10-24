//
// Created by davimacedo on 09/10/15.
//

'use strict';

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
 * @example
 * var dateAttribute = new DateAttribute({
 *   name: 'dateAttribute',
 *   multiplicity: '0..1',
 *   default: null
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
 * @example
 * var dateAttribute = new DateAttribute(
 *   'dateAttribute',
 *   '0..1',
 *   null
 * );
 */
function DateAttribute() {
  Attribute.apply(this, Array.prototype.slice.call(arguments));
}

classes.generalize(Attribute, DateAttribute);

DateAttribute.typeName = 'Date';

DateAttribute.prototype.validateValue = validateValue;

function validateValue(value) {
  if (!(value instanceof Date)) {
    throw new ValidationError(
      'this attribute\'s value should be a Date'
    );
  }
}
