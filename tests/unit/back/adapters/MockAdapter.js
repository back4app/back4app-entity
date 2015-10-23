'use strict';

var classes = require('../../../../src/back').utils.classes;
var Adapter = require('../../../../src/back').adapters.Adapter;

module.exports = MockAdapter;

function MockAdapter() {
  Adapter.apply(this, Array.prototype.slice.call(arguments));
}

classes.generalize(Adapter, MockAdapter);
