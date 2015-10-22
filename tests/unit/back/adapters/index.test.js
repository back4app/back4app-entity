'use strict';

var expect = require('chai').expect;
var adaptersIndex = require('../../../../src/back/adapters');
var Adapter = require('../../../../src/back/adapters/Adapter');

describe('adaptersIndex', function () {
  it('expect to export Adapter in the Adapter property', function () {
    expect(adaptersIndex).to.have.property('Adapter')
      .that.equals(Adapter);
  });
});
