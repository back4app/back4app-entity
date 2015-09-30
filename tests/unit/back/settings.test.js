//
// Created by davimacedo on 30/09/15.
//

'use strict';

var expect = require('chai').expect;
var settings = require('../../../src/back/settings');

describe('settings', function () {
  it(
    'expect to export ENTITIESPATH in the ENTITIESPATH property and be a' +
    'string',
    function () {
    expect(settings).to.have.property('ENTITIESPATH')
      .that.is.a('string');
  });
});
