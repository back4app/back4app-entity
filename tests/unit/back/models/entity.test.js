'use strict';

var expect = require('chai').expect;
var Entity = require('../../../../src/back/models/Entity');

describe('Entity', function () {
  describe('.specify()', function () {
    it('expect to exist as a static method', function () {
      expect(Entity).itself.to.respondTo('specify');
    });

    var C1;
    var C11;
    var C2;

    it('expect to run without error', function () {
      C1 = require('./C1');
      C11 = require('./C11');
      C2 = require('./C2');
    })
  });
});
