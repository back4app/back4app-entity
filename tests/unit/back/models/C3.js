//
// Created by davimacedo on 31/10/15.
//

'use strict';

var Entity = require('../../../../').models.Entity;
var ObjectAttribute = require('../../../../')
  .models.attributes.types.ObjectAttribute;

require('../../settings');

module.exports = Entity.specify(
  'C3',
  [
    new ObjectAttribute({
      name: 'c3A1',
      multiplicity: '1',
      default: function () { return {}; }
    })
  ]
);
