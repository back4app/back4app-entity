'use strict';

var Adapter = require('../../../../src/back').adapters.Adapter;

module.exports = MockAdapter;

function MockAdapter() {
  var mock = new Adapter();

  return mock;
}
