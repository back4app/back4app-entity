'use strict';

var expect = require('chai').expect;
var Entity = require('../../../../src/back/models/Entity');
var C1 = require('./C1');
var C11 = require('./C11');
var C2 = require('./C2');

describe('Entity', function () {
  describe('.specify()', function () {
    it('expect to exist as a static method', function () {
      expect(Entity).itself.to.respondTo('specify');
    });
  });
});
