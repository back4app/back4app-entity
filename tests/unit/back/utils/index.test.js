//
// Created by davimacedo on 22/09/15.
//

var mocha = require('mocha');
var describe = require('mocha').describe;
var it = require('mocha').it;
var expect = require('chai').expect;
var utilsIndex = require('../../../..//src/back/utils');
var classes = require('../../../../src/back/utils/classes');

describe('utilsIndex', function () {
  it('expect to export classes in the classes property', function () {
    expect(utilsIndex).to.have.property('classes')
      .that.equals(classes);
  });
});
