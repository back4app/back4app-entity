var mocha = require('mocha');
var describe = require('mocha').describe;
var it = require('mocha').it;
var expect = require('chai').expect;
var backIndex = require('../../../src/back');
var entity = require('../../../src/back/entity');

describe('backIndex', function () {
  it('expect to export entity', function () {
    expect(backIndex).to.equal(entity);
  });
});
