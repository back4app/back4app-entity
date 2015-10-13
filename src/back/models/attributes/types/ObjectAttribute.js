//
// Created by davimacedo on 08/10/15.
//

'use strict';

var classes = require('../../../utils/classes');
var Attribute = require('../Attribute');

module.exports = ObjectAttribute;

/**
 * Implementation of an Entity Attribute to store Object data.
 * @memberof module:back4app/entity/models/attributes/types
 * @name ObjectAttribute
 * @constructor
 * @extends module:back4app/entity/models/attributes.Attribute
 * @param {!Object} attribute This is the attribute to be added. It can be
 * passed as an Object.
 * @param {!string} attribute.name It is the name of the attribute.
 * @param {!string} [attribute.multiplicity='1'] It is the multiplicity of the
 * attribute. It is optional and if not passed it will assume '1' as the default
 * value.
 * @param {?Object} [attribute.default] It is
 * the default expression of the attribute.
 * @example
 * var objectAttribute = new ObjectAttribute({
 *   name: 'objectAttribute',
 *   multiplicity: '0..1',
 *   default: null
 * });
 */
/**
 * Implementation of an Entity Attribute to store Object data.
 * @memberof module:back4app/entity/models/attributes/types
 * @name ObjectAttribute
 * @constructor
 * @extends module:back4app/entity/models/attributes.Attribute
 * @param {!string} name It is the name of the attribute.
 * @param {!string} [multiplicity='1'] It is the multiplicity of the attribute.
 * It is optional and if not passed it will assume '1' as the default value.
 * @param {?Object} [default] It is the default
 * expression of the attribute.
 * @example
 * var objectAttribute = new ObjectAttribute(
 *   'objectAttribute',
 *   '0..1',
 *   null
 * );
 */
function ObjectAttribute() {
  Attribute.apply(this, Array.prototype.slice.call(arguments));
}

classes.generalize(Attribute, ObjectAttribute);
