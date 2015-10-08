//
// Created by davimacedo on 24/09/15.
//

'use strict';

var Entity = require('../../../../').models.Entity;
var ObjectAttribute = require('../../../../')
  .models.attributes.types.ObjectAttribute;

module.exports = Entity.specify(
  [
    new ObjectAttribute('c2A1')
  ],
  null
);
