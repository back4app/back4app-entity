//
// Created by davimacedo on 22/09/15.
//

var Entity = require('../../../').Entity;

module.exports = C11;

function C11(c1A1, c1A2, c1A3, c11A1, c11A2, c11A3) {
  var c11 = this;

  C1.call(c11, c1A1, c1A2, c1A3);

  c11.c11A1 = c11A1;
  c11.c11A2 = c11A2;
  c11.c11A3 = c11A3;
}

C11.prototype = Object.create(C1.prototype);
