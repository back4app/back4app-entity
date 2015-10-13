'use strict';

var expect = require('chai').expect;
var backIndex = require('../../../src/back');
var models = require('../../../src/back/models');

describe('backIndex', function () {
  it('expect to export models in the models property', function () {
    expect(backIndex).to.have.property('models')
      .that.equals(models);
  });
});
