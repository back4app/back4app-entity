//
// Created by davimacedo on 21/09/15.
//

var mocha = require('mocha');
var describe = require('mocha').describe;
var it = require('mocha').it;
var expect = require('chai').expect;
var index = require('../../');
var backIndex = require('../../src/back');

describe('index', function () {
  it('expect to export back index', function () {
    expect(index).to.equal(backIndex);
  });
});