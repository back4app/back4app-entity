'use strict';

module.exports = require('../../../../').specify({
  attributes: {
    c1A1: {
      type: 'Boolean',
      multiplicity: '1',
      default: false
    },
    c1A2: {
      type: 'Datetime',
      multiplicity: '0..1',
      default: new Date()
    },
    c1A3: {
      type: 'Integer',
      multiplicity: '1..*',
      default: []
    },
    c1A4: {
      type: 'Object',
      multiplicity: '*',
      default: null
    },
    c1A5: {
      type: 'Real',
      multiplicity: '1'
    },
    c1A6: {
      type: 'String',
      default: ''
    },
    c1A7: {
      type: 'C2'
    },
    c1A8: {}
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
