//
// Created by davimacedo on 22/10/15.
//

'use strict';

var expect = require('chai').expect;
var settings = require('../../../src/back/settings');

require('../settings');

describe('settings', function () {
  it(
    'expect to export ADAPTERS in the ADAPTERS property and be an' +
    'object',
    function () {
      expect(settings).to.have.property('ADAPTERS')
        .that.is.an('object');
    });
});
