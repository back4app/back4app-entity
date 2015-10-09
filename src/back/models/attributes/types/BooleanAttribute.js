//
// Created by davimacedo on 09/10/15.
//

'use strict';

var expect = require('chai').expect;
var classes = require('../../../utils/classes');
var objects = require('../../../utils/objects');
var Attribute = require('../Attribute');

module.exports = BooleanAttribute;

/**
 * Implementation of an Entity Attribute to store boolean data.
 * @memberof module:back4app/entity/models/attributes/types
 * @name BooleanAttribute
 * @constructor
 * @extends module:back4app/entity/models/attributes.Attribute
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
 * @memberof module:back4app/entity/models/attributes/types
 * @name BooleanAttribute
 * @constructor
 * @extends module:back4app/entity/models/attributes.Attribute
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
  var argumentsArray = Array.prototype.slice.call(arguments);

  expect(argumentsArray).to.have.length.within(
    1,
    3,
    'Invalid arguments length when creating an BooleanAttribute (it has to be ' +
    'passed from 1 to 3 arguments)'
  );

  if (argumentsArray.length === 1 && typeof argumentsArray[0] !== 'string') {
    var booleanAttribute = argumentsArray[0];

    expect(booleanAttribute).to.be.an(
      'object',
      'Invalid argument type when creating an Attribute (it has to be an ' +
      'object or a string)'
    );

    expect(booleanAttribute).to.not.have.ownProperty(
      'type',
      'Property "type" cannot be set in an BooleanAttribute. Its value will ' +
      'be automatically set to Boolean'
    );

    booleanAttribute = objects.copy(booleanAttribute);

    booleanAttribute.type = 'Boolean';
  } else {
    argumentsArray.splice(1, 0, 'Boolean');
  }

  Attribute.apply(this, argumentsArray);
}

classes.generalize(Attribute, BooleanAttribute);
