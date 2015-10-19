define(function (require, exports, module) {//
// Created by davimacedo on 09/10/15.
//

'use strict';

var classes = require('../../../utils/classes');
var ValidationError = require('../../errors').ValidationError;
var Attribute = require('../Attribute');

module.exports = StringAttribute;

/**
 * Implementation of an Entity Attribute to store string data.
 * @memberof module:back4app/entity/models/attributes/types
 * @name StringAttribute
 * @constructor
 * @extends module:back4app/entity/models/attributes.Attribute
 * @param {!Object} attribute This is the attribute to be added. It can be
 * passed as an Object.
 * @param {!string} attribute.name It is the name of the attribute.
 * @param {!string} [attribute.multiplicity='1'] It is the multiplicity of the
 * attribute. It is optional and if not passed it will assume '1' as the default
 * value.
 * @param {?string} [attribute.default] It is
 * the default expression of the attribute.
 * @example
 * var stringAttribute = new StringAttribute({
 *   name: 'stringAttribute',
 *   multiplicity: '0..1',
 *   default: null
 * });
 */
/**
 * Implementation of an Entity Attribute to store string data.
 * @memberof module:back4app/entity/models/attributes/types
 * @name StringAttribute
 * @constructor
 * @extends module:back4app/entity/models/attributes.Attribute
 * @param {!string} name It is the name of the attribute.
 * @param {!string} [multiplicity='1'] It is the multiplicity of the attribute.
 * It is optional and if not passed it will assume '1' as the default value.
 * @param {?string} [default] It is the default
 * expression of the attribute.
 * @example
 * var stringAttribute = new StringAttribute(
 *   'stringAttribute',
 *   '0..1',
 *   null
 * );
 */
function StringAttribute() {
  Attribute.apply(this, Array.prototype.slice.call(arguments));
}

classes.generalize(Attribute, StringAttribute);

StringAttribute.prototype.validateValue = validateValue;

function validateValue(value) {
  if (typeof value !== 'string' && !(value instanceof String)) {
    throw new ValidationError(
      'this attribute\'s value should be a string'
    );
  }
}

});
