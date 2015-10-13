//
// Created by davimacedo on 22/09/15.
//

'use strict';

module.exports = require('./C1').specify({
  name: 'C11',
  attributes: {
    c11A1: {
      type: 'Object',
      multiplicity: '1'
    }
  },
  methods: {
    c1M1: c1M1,
    c11M: c11M
  }
});

function c1M1(c1M1P1, c1M1P2, c11M1P) {
  return this.General.methods.c1M1.call(this, c1M1P1, c1M1P2) + c11M1P;
}

function c11M() {
  var toReturn = '';
  var attribute = null;

  for (attribute in this.General.attributes) {
    toReturn += this[attribute];
  }

  for (attribute in this.Entity.attributes) {
    toReturn += this[attribute];
  }

  return toReturn;
}
