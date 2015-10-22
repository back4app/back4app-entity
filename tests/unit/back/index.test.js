'use strict';

var expect = require('chai').expect;
var backIndex = require('../../../src/back');
var utils = require('../../../src/back/utils');
var settings = require('../../../src/back/settings');
var adapters = require('../../../src/back/adapters');
var models = require('../../../src/back/models');

require('../settings');

describe('backIndex', function () {
  it('expect to export utils in the utils property', function () {
    expect(backIndex).to.have.property('utils')
      .that.equals(utils);
  });

  it('expect to export settings in the settings property', function () {
    expect(backIndex).to.have.property('settings')
      .that.equals(settings);
  });

  it('expect to export adapters in the adapters property', function () {
    expect(backIndex).to.have.property('adapters')
      .that.equals(adapters);
  });

  it('expect to export models in the models property', function () {
    expect(backIndex).to.have.property('models')
      .that.equals(models);
  });
});
