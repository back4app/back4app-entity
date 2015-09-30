'use strict';

var expect = require('chai').expect;
var backIndex = require('../../../src/back');
var settings = require('../../../src/back/settings');
var models = require('../../../src/back/models');

describe('backIndex', function () {
  it('expect to export settings in the settings property', function () {
    expect(backIndex).to.have.property('settings')
      .that.equals(settings);
  });

  it('expect to export models in the models property', function () {
    expect(backIndex).to.have.property('models')
      .that.equals(models);
  });
});
