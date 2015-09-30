'use strict';

var Entity = require('../../../../').models.Entity;

module.exports = Entity.specify({
  attributes: {
    c1A1: {
      type: 'Boolean',
      multiplicity: '1',
      default: false
    },
    c1A2: {
      type: 'Datetime',
      multiplicity: '0..1',
      default: Date.now
    },
    c1A3: {
      type: 'Integer',
      multiplicity: '1..*',
      default: function () { return [0]; }
    },
    c1A4: {
      type: 'Object',
      multiplicity: '*',
      default: null
    },
    c1A5: {
      type: 'Real',
      multiplicity: '1',
      default: 0.0
    },
    c1A6: {
      type: 'String',
      multiplicity: '0..1',
      default: ''
    },
    c1A7: {
      type: 'C1',
      multiplicity: '1',
      default: Entity.new('C1')
    },
    c1A8: {
      type: 'C11',
      multiplicity: '0..1',
      default: null
    },
    c1A9: {
      type: 'C2',
      multiplicity: '1..*',
      default: function () { return [new Entity('C2')]; }
    },
    c1A10: {
      type: 'C2',
      multiplicity: '1',
      default: Entity.new('C2')
    }
  },
  methods: {
    c1A6M: c1A6M,
    c1M1: c1M1,
    c1M2: c1M2
  }
});

function c1A6M(c1A6) {
  if (arguments.length > 0) {
    this.c1A6 = c1A6;
  }
  return this.c1A6;
}

function c1M1(c1M1P1, c1M1P2) {
  return c1M1P1 + c1M1P2;
}

function c1M2(c1M2P1, c1M2P2) {
  return c1M2P1 + c1M2P2;
}

