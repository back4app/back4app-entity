var mocha = require('mocha');
var describe = require('mocha').describe;
var it = require('mocha').it;
var expect = require('chai').expect;
var backIndex = require('../../../src/back');
var Entity = require('../../../src/back/Entity');

describe('backIndex', function () {
  it('expect to export entity in the Entity property', function () {
    expect(backIndex).to.have.property('Entity')
      .that.equals(Entity);
  });
});
