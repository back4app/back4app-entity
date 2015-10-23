//
// Created by davimacedo on 21/09/15.
//

'use strict';

var expect = require('chai').expect;
var index = require('../../');
var backIndex = require('../../src/back');

require('./settings');

describe('index', function () {
  it('expect to export back index', function () {
    expect(index).to.equal(backIndex);
  });
});
