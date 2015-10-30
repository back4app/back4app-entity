//
// Created by davimacedo on 30/10/15.
//

'use strict';

var entity = require('../../../../');
var classes = entity.utils.classes;
var Entity = entity.models.Entity;

module.exports = EntityProxy;

function EntityProxy() {
  Entity.apply(this, Array.prototype.slice.call(arguments));
}

classes.generalize(Entity, EntityProxy);
