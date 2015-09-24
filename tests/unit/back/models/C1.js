'use strict';

module.exports = require('../../../../').specify({
  attributes: {
    c1A1: {
      type: 'Boolean',
      multiplicity: '0..1',
      default: false
    },
    c1A2: {
      type: 'Datetime',
      multiplicity: '0..1',
      default: new Date()
    }
  },
  methods: {
    c1M1: c1M1,
    c1M2: c1M2
  }
});

function c1M1(c1M1P1, c1M1P2) {
  console.log(c1M1P1);
  console.log(c1M1P2);
}

function c1M2(c1M2P1, c1M2P2) {
  console.log(c1M2P1);
  console.log(c1M2P2);
}
