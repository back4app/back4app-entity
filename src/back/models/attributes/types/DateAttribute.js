//
// Created by davimacedo on 09/10/15.
//

'use strict';

var expect = require('chai').expect;
var classes = require('../../../utils/classes');
var objects = require('../../../utils/objects');
var Attribute = require('../Attribute');

module.exports = DateAttribute;

/**
 * Implementation of an Entity Attribute to store Date data.
 * @memberof module:back4app/entity/models/attributes/types
 * @name DateAttribute
 * @constructor
 * @extends module:back4app/entity/models/attributes.Attribute
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
 * @memberof module:back4app/entity/models/attributes/types
 * @name DateAttribute
 * @constructor
 * @extends module:back4app/entity/models/attributes.Attribute
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
  var argumentsArray = Array.prototype.slice.call(arguments);

  expect(argumentsArray).to.have.length.within(
    1,
    3,
    'Invalid arguments length when creating an DateAttribute (it has to be ' +
    'passed from 1 to 3 arguments)'
  );

  if (argumentsArray.length === 1 && typeof argumentsArray[0] !== 'string') {
    var dateAttribute = argumentsArray[0];

    expect(dateAttribute).to.be.an(
      'object',
      'Invalid argument type when creating an Attribute (it has to be an ' +
      'object or a string)'
    );

    expect(dateAttribute).to.not.have.ownProperty(
      'type',
      'Property "type" cannot be set in an DateAttribute. Its value will ' +
      'be automatically set to DateAttribute'
    );

    dateAttribute = objects.copy(dateAttribute);

    dateAttribute.type = DateAttribute;
  } else {
    argumentsArray.splice(1, 0, DateAttribute);
  }

  Attribute.apply(this, argumentsArray);
}

classes.generalize(Attribute, DateAttribute);
