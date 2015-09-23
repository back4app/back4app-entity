'use strict';

var expect = require('chai').expect;
var backIndex = require('../../../src/back');
var Entity = require('../../../src/back/models/Entity');

describe('backIndex', function () {
  it('expect to export Entity', function () {
    expect(backIndex).to.equal(Entity);
  });
});
