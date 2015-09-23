//
// Created by davimacedo on 22/09/15.
//

'use strict';

var Entity = require('../../../../index').Entity;

module.exports = C1;

function C1(c1A1, c1A2, c1A3) {
  var c1 = this;

  Entity.call(c1);

  c1.c1A1 = c1A1;
  c1.c1A2 = c1A2;
  c1.c1A3 = c1A3;
}

C1.prototype = Object.create(Entity.prototype);

C1.prototype.constructor = C1;

