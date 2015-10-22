//
// Created by davimacedo on 24/09/15.
//

'use strict';

var Entity = require('../../../../').models.Entity;
var ObjectAttribute = require('../../../../')
  .models.attributes.types.ObjectAttribute;

require('../../settings');

var C2 = module.exports = Entity.specify(
  'C2',
  [
    new ObjectAttribute(
      'Entity',
      '1',
      function () { return C2; }
    ),
    new ObjectAttribute({
      name: 'c2A2',
      multiplicity: '0..1',
      default: function () { return { default: 'thisIsMyDefault' }; }
    })
  ],
  {
    constructor: function () { return 'constructor'; }
  }
);
