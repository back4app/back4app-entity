//
// Created by davimacedo on 09/10/15.
//

'use strict';

var classes = require('../../../utils/classes');
var ValidationError = require('../../errors').ValidationError;
var Attribute = require('../Attribute');

module.exports = BooleanAttribute;

/**
 * Implementation of an Entity Attribute to store boolean data.
 * @memberof module:back4app-entity/models/attributes/types
 * @name BooleanAttribute
 * @constructor
 * @extends module:back4app-entity/models/attributes.Attribute
 * @param {!Object} attribute This is the attribute to be added. It can be
 * passed as an Object.
 * @param {!string} attribute.name It is the name of the attribute.
 * @param {!string} [attribute.multiplicity='1'] It is the multiplicity of the
 * attribute. It is optional and if not passed it will assume '1' as the default
 * value.
 * @param {?boolean} [attribute.default] It is
 * the default expression of the attribute.
 * @example
 * var booleanAttribute = new BooleanAttribute({
 *   name: 'booleanAttribute',
 *   multiplicity: '0..1',
 *   default: null
 * });
 */
/**
 * Implementation of an Entity Attribute to store boolean data.
 * @memberof module:back4app-entity/models/attributes/types
 * @name BooleanAttribute
 * @constructor
 * @extends module:back4app-entity/models/attributes.Attribute
 * @param {!string} name It is the name of the attribute.
 * @param {!string} [multiplicity='1'] It is the multiplicity of the attribute.
 * It is optional and if not passed it will assume '1' as the default value.
 * @param {?boolean} [default] It is the default
 * expression of the attribute.
 * @example
 * var booleanAttribute = new BooleanAttribute(
 *   'booleanAttribute',
 *   '0..1',
 *   null
 * );
 */
function BooleanAttribute() {
  Attribute.apply(this, Array.prototype.slice.call(arguments));
}

classes.generalize(Attribute, BooleanAttribute);

BooleanAttribute.prototype.validateValue = validateValue;

function validateValue(value) {
  if (typeof value !== 'boolean') {
    throw new ValidationError(
      'this attribute\'s value should be a boolean'
    );
  }
}
