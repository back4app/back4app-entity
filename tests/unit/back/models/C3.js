//
// Created by davimacedo on 31/10/15.
//

'use strict';

var entity = require('../../../../');
var Entity = entity.models.Entity;
var types = entity.models.attributes.types;
var ObjectAttribute = types.ObjectAttribute;
var AssociationAttribute = types.AssociationAttribute;

require('../../settings');

module.exports = Entity.specify(
  'C3',
  [
    new ObjectAttribute({
      name: 'c3A1',
      multiplicity: '1',
      default: function () { return {}; }
    }),
    new AssociationAttribute({
      name: 'c3A2',
      entity: 'C3',
      multiplicity: '0..1'
    })
  ]
);
