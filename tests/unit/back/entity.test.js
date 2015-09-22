var mocha = require('mocha');
var describe = require('mocha').describe;
var it = require('mocha').it;
var expect = require('chai').expect;
var Entity = require('../../../src/back/Entity');

describe('Entity', function () {
  describe('.extend()', function () {
    it('expect to exist as a static method', function () {
      expect(Entity).itself.to.respondTo('extend');
    });
  });
});
