//
// Created by davimacedo on 24/09/15.
//

'use strict';

var Entity = require('../../../../').models.Entity;
var ObjectAttribute = require('../../../../')
  .models.attributes.types.ObjectAttribute;

module.exports = Entity.specify(
  'C2',
  [
    new ObjectAttribute(
      'c2A1',
      '1',
      null
    ),
    new ObjectAttribute({
      name: 'c2A2',
      multiplicity: '0..1',
      default: function () { return { default: 'thisIsMyDefault' }; }
    })
  ],
  null
);
